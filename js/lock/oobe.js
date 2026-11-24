document.addEventListener("DOMContentLoaded", () => {
    const oobeScreen = document.getElementById("win10-oobe-screen");
    const bootScreen = document.getElementById("win10-boot-screen");
    const acceptBtn = document.getElementById("oobe-accept-btn");
    const preloadStatus = document.getElementById("asset-preload-status");
    const retryBtn = document.getElementById("asset-preload-retry");
    const skipBtn = document.getElementById("asset-preload-skip");
    const lockscreen = document.getElementById("lockscreen");
    const loginScreen = document.querySelector(".login-screen");
    const isZ2 = localStorage.getItem("win10_zhoumu2") === "true";
    const isZ3 = localStorage.getItem("win10_zhoumu3") === "true";
    const isFirstBootDone = localStorage.getItem("win10_first_boot_done") === "true";
    const isFirstBoot = !isZ2 && !isZ3 && !isFirstBootDone;
    const allAssets = Array.from(new Set(window.LOCK_ASSETS_BLOCKING || window.LOCK_ASSETS_TO_LOAD || []));
    const bgAssets = Array.from(new Set(window.LOCK_ASSETS_BACKGROUND || []));
    const IMAGE_ASSET_RE = /\.(?:webp|png|jpe?g|gif)(?:[?#].*)?$/i;
    const MEDIA_ASSET_RE = /\.(?:mp3|wav|mp4)(?:[?#].*)?$/i;
    const RESOURCE_TIMEOUT_MS = 12000;
    const MAX_ATTEMPTS = 3;
    const CONCURRENCY = 8;
    const BG_CONCURRENCY = 4;
    const BG_TIMEOUT_MS = 20000;
    let preloadRunning = false;
    let preloadDone = false;
    let failedAssets = [];
    let firstBootStarted = false;
    const preloadState = window.NINGNING_PRELOAD_STATE = {
        phase: "initializing",
        completed: 0,
        total: allAssets.length,
        lastAsset: "",
        startedAt: performance.now()
    };
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    function setAcceptLoading(text) {
        if (!acceptBtn) return;
        acceptBtn.disabled = true;
        acceptBtn.style.opacity = "0.5";
        acceptBtn.style.cursor = "not-allowed";
        acceptBtn.innerText = text;
    }
    function setAcceptReady(text) {
        if (!acceptBtn) return;
        acceptBtn.disabled = false;
        acceptBtn.style.opacity = "1";
        acceptBtn.style.cursor = "pointer";
        acceptBtn.innerText = text;
    }
    function loadImage(src, timeoutMs) {
        return new Promise((resolve, reject) => {
            const image = new Image;
            let settled = false;
            const timer = setTimeout(() => finish(new Error("timeout")), timeoutMs || RESOURCE_TIMEOUT_MS);
            function finish(error) {
                if (settled) return;
                settled = true;
                clearTimeout(timer);
                image.onload = null;
                image.onerror = null;
                if (error) reject(error); else resolve();
            }
            image.decoding = "async";
            image.onload = async () => {
                try {
                    if (typeof image.decode === "function") await image.decode();
                    if (!image.naturalWidth || !image.naturalHeight) throw new Error("invalid image dimensions");
                    finish();
                } catch (error) {
                    finish(error);
                }
            };
            image.onerror = () => finish(new Error("image load failed"));
            image.src = src;
        });
    }
    function loadLocalMedia(src, timeoutMs) {
        return new Promise((resolve, reject) => {
            const element = document.createElement(/\.mp4(?:[?#].*)?$/i.test(src) ? "video" : "audio");
            let settled = false;
            const timer = setTimeout(() => finish(new Error("timeout")), timeoutMs || RESOURCE_TIMEOUT_MS);
            function finish(error) {
                if (settled) return;
                settled = true;
                clearTimeout(timer);
                element.onloadeddata = null;
                element.oncanplaythrough = null;
                element.onerror = null;
                try {
                    element.removeAttribute("src");
                    element.load();
                } catch (e) {}
                if (error) reject(error); else resolve();
            }
            element.preload = "auto";
            element.onloadeddata = () => finish();
            element.oncanplaythrough = () => finish();
            element.onerror = () => finish(new Error("media load failed"));
            element.src = src;
            try {
                element.load();
            } catch (error) {
                finish(error);
            }
        });
    }
    async function fetchCompleteFile(src, timeoutMs) {
        const controller = typeof AbortController === "function" ? new AbortController : null;
        const timer = setTimeout(() => {
            if (controller) controller.abort();
        }, timeoutMs || RESOURCE_TIMEOUT_MS);
        try {
            const response = await fetch(src, {
                cache: "force-cache",
                signal: controller ? controller.signal : undefined
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            let received = 0;
            if (response.body && typeof response.body.getReader === "function") {
                const reader = response.body.getReader();
                for (;;) {
                    const {done, value} = await reader.read();
                    if (done) break;
                    received += value ? value.length : 0;
                }
            } else {
                received = (await response.arrayBuffer()).byteLength;
            }
            if (!received) throw new Error("empty response");
        } finally {
            clearTimeout(timer);
        }
    }
    function loadOne(src, timeoutMs) {
        if (IMAGE_ASSET_RE.test(src)) return loadImage(src, timeoutMs);
        if (window.location.protocol === "file:") {
            if (MEDIA_ASSET_RE.test(src)) return loadLocalMedia(src, timeoutMs);
            return Promise.resolve();
        }
        return fetchCompleteFile(src, timeoutMs);
    }
    async function loadWithRetry(src, opts) {
        const maxAttempts = opts && opts.maxAttempts || MAX_ATTEMPTS;
        const timeoutMs = opts && opts.timeoutMs;
        let lastError = null;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                await loadOne(src, timeoutMs);
                return null;
            } catch (error) {
                lastError = error;
                if (attempt < maxAttempts) await delay(350 * attempt);
            }
        }
        return {
            src,
            error: lastError ? lastError.message : "unknown error"
        };
    }
    async function loadQueue(list, onEach, opts) {
        const concurrency = opts && opts.concurrency || CONCURRENCY;
        let cursor = 0;
        const failures = [];
        const worker = async () => {
            while (cursor < list.length) {
                const src = list[cursor++];
                const failure = await loadWithRetry(src, opts);
                if (failure) failures.push(failure);
                if (onEach) onEach(src, !failure);
            }
        };
        const workers = Array.from({
            length: Math.min(concurrency, list.length)
        }, worker);
        await Promise.all(workers);
        return failures;
    }
    let bgStarted = false;
    function startBackgroundPreload() {
        if (bgStarted || !bgAssets.length) return;
        bgStarted = true;
        const bgState = window.NINGNING_BG_PRELOAD_STATE = {
            phase: "downloading",
            completed: 0,
            total: bgAssets.length,
            startedAt: performance.now()
        };
        const run = () => {
            loadQueue(bgAssets, () => {
                bgState.completed++;
            }, {
                concurrency: BG_CONCURRENCY,
                timeoutMs: BG_TIMEOUT_MS,
                maxAttempts: 2
            }).then(failures => {
                bgState.phase = failures.length ? "partial" : "ready";
                bgState.failures = failures;
                bgState.finishedAt = performance.now();
                if (failures.length) console.info("后台预载有 " + failures.length + " 个资源未完成，将在用到时按需加载。");
            }).catch(() => {
                bgState.phase = "error";
            });
        };
        if (typeof requestIdleCallback === "function") requestIdleCallback(run, {
            timeout: 3000
        }); else setTimeout(run, 1200);
    }
    window.NINGNING_START_BACKGROUND_PRELOAD = startBackgroundPreload;
    function updateProgress(completed, total, retrying) {
        const percent = total ? Math.min(100, Math.floor(completed / total * 100)) : 100;
        const label = retrying ? "正在重试游戏资源" : "正在下载游戏资源";
        const text = `${label} (${percent}%)`;
        if (isFirstBoot) setAcceptLoading(text);
        if (preloadStatus) {
            preloadStatus.style.display = "none";
            preloadStatus.innerText = text;
        }
    }
    let failureRounds = 0;
    function showPreloadFailure(failures) {
        failedAssets = failures.map(item => item.src);
        failureRounds++;
        const text = `${failedAssets.length} 个资源加载失败，请重试`;
        if (preloadStatus) {
            preloadStatus.innerText = text;
            preloadStatus.style.display = "block";
        }
        if (isFirstBoot) {
            setAcceptReady(`下载失败 (${failedAssets.length})，点击重试`);
        } else if (retryBtn) {
            retryBtn.style.display = "inline-block";
        }
        if (failureRounds >= 2 && skipBtn) {
            skipBtn.style.display = "inline-block";
            if (preloadStatus) {
                preloadStatus.innerText = `${failedAssets.length} 个资源反复加载失败（网络问题）`;
            }
        }
        console.warn("Game asset preload failed:", failures);
    }
    function releaseReturningPlayer() {
        if (preloadStatus) {
            preloadStatus.innerText = "游戏资源准备完成";
            preloadStatus.style.display = "none";
        }
        if (retryBtn) retryBtn.style.display = "none";
        if (lockscreen) lockscreen.style.visibility = "";
        if (loginScreen) loginScreen.style.visibility = "";
        const preloadStyle = document.getElementById("asset-preload-style");
        if (preloadStyle) preloadStyle.remove();
        if (!bootScreen) return;
        setTimeout(() => {
            bootScreen.style.opacity = "0";
            setTimeout(() => {
                bootScreen.style.display = "none";
                bootScreen.style.opacity = "1";
            }, 300);
        }, 120);
    }
    function finishPreload() {
        preloadDone = true;
        failedAssets = [];
        if (preloadStatus) {
            preloadStatus.innerText = "游戏资源准备完成";
            preloadStatus.style.display = "none";
        }
        startBackgroundPreload();
        if (isFirstBoot) {
            setAcceptReady("接 受");
        } else {
            releaseReturningPlayer();
        }
    }
    async function beginPreload(list, retrying) {
        if (preloadRunning || preloadDone) return;
        preloadRunning = true;
        preloadState.phase = retrying ? "retrying" : "preloading";
        preloadState.completed = 0;
        preloadState.total = list.length;
        if (preloadStatus) preloadStatus.style.display = "none";
        if (retryBtn) retryBtn.style.display = "none";
        const targets = Array.from(new Set(list));
        let completed = 0;
        updateProgress(0, targets.length, retrying);
        try {
            const failures = await loadQueue(targets, src => {
                completed++;
                preloadState.completed = completed;
                preloadState.lastAsset = src;
                updateProgress(completed, targets.length, retrying);
            });
            if (failures.length) {
                preloadState.phase = "failed";
                preloadState.failures = failures;
                showPreloadFailure(failures);
            } else {
                preloadState.phase = "ready";
                preloadState.finishedAt = performance.now();
                finishPreload();
            }
        } finally {
            preloadRunning = false;
        }
    }
    function queryServiceWorkerVersion() {
        return new Promise(resolve => {
            const controller = navigator.serviceWorker && navigator.serviceWorker.controller;
            if (!controller || typeof MessageChannel !== "function") {
                resolve(null);
                return;
            }
            const channel = new MessageChannel;
            let settled = false;
            const finish = version => {
                if (settled) return;
                settled = true;
                clearTimeout(timer);
                resolve(version || null);
            };
            const timer = setTimeout(() => finish(null), 600);
            channel.port1.onmessage = event => finish(event.data && event.data.cacheVersion);
            try {
                controller.postMessage({
                    type: "NINGNING_GET_CACHE_VERSION"
                }, [ channel.port2 ]);
            } catch (e) {
                finish(null);
            }
        });
    }
    async function waitForCurrentServiceWorker() {
        if (!("serviceWorker" in navigator) || !window.NINGNING_SW_READY) return;
        const expectedVersion = window.LOCK_SW_CACHE_VERSION;
        let registrationSettled = false;
        let registrationAvailable = true;
        Promise.resolve(window.NINGNING_SW_READY).then(registration => {
            registrationAvailable = !!registration;
            registrationSettled = true;
        });
        const deadline = Date.now() + 10000;
        while (Date.now() < deadline) {
            const currentVersion = await queryServiceWorkerVersion();
            if (!expectedVersion || currentVersion === expectedVersion) return;
            if (registrationSettled && !registrationAvailable && !navigator.serviceWorker.controller) return;
            await delay(150);
        }
    }
    function startFirstBoot() {
        if (firstBootStarted || !preloadDone) return;
        firstBootStarted = true;
        if (preloadStatus) {
            preloadStatus.innerText = "正在启动...";
            preloadStatus.style.display = "none";
        }
        const startupSound = new Audio("audio/windows10_sound.mp3");
        startupSound.volume = 0.6;
        startupSound.muted = true;
        startupSound.play().then(() => {
            startupSound.pause();
            startupSound.currentTime = 0;
            startupSound.muted = false;
        }).catch(() => {});
        if (bootScreen) {
            bootScreen.style.display = "flex";
            bootScreen.style.opacity = "1";
        }
        if (oobeScreen) oobeScreen.style.opacity = "0";
        setTimeout(() => {
            if (oobeScreen) oobeScreen.style.display = "none";
            setTimeout(() => {
                const firstBootStyle = document.getElementById("first-boot-style");
                if (lockscreen) lockscreen.style.display = "";
                if (loginScreen) loginScreen.style.display = "";
                if (firstBootStyle) firstBootStyle.remove();
                startupSound.play().catch(() => {});
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        if (!bootScreen) return;
                        bootScreen.style.opacity = "0";
                        setTimeout(() => {
                            bootScreen.style.display = "none";
                            bootScreen.style.opacity = "1";
                            localStorage.setItem("win10_first_boot_done", "true");
                        }, 800);
                    });
                });
            }, 3500);
        }, 500);
    }
    if (isFirstBoot) {
        if (oobeScreen) oobeScreen.style.display = "flex";
        if (bootScreen) bootScreen.style.display = "none";
        setAcceptLoading(allAssets.length ? "正在检查游戏资源..." : "接 受");
    } else {
        if (oobeScreen) oobeScreen.style.display = "none";
        if (bootScreen) {
            bootScreen.style.display = "flex";
            bootScreen.style.opacity = "1";
        }
        if (lockscreen) lockscreen.style.visibility = "hidden";
        if (loginScreen) loginScreen.style.visibility = "hidden";
    }
    if (acceptBtn) {
        acceptBtn.onclick = () => {
            if (failedAssets.length) {
                beginPreload(failedAssets, true);
                return;
            }
            startFirstBoot();
        };
    }
    if (retryBtn) {
        retryBtn.onclick = () => {
            if (failedAssets.length) beginPreload(failedAssets, true);
        };
    }
    if (skipBtn) {
        skipBtn.onclick = () => {
            preloadState.phase = "skipped";
            preloadState.skippedAssets = failedAssets.slice();
            failedAssets.forEach(src => {
                if (bgAssets.indexOf(src) === -1) bgAssets.push(src);
            });
            skipBtn.style.display = "none";
            finishPreload();
        };
    }
    (async () => {
        preloadState.phase = "waiting-for-service-worker";
        await waitForCurrentServiceWorker();
        preloadState.serviceWorkerReadyAt = performance.now();
        if (!allAssets.length) finishPreload(); else beginPreload(allAssets, false);
    })();
});
