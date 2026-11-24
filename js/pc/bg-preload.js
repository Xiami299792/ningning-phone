(function() {
    "use strict";
    if (location.protocol === "file:") return;
    var list = window.LOCK_ASSETS_BACKGROUND;
    if (!Array.isArray(list) || !list.length) return;
    var CONCURRENCY = 3;
    var TIMEOUT_MS = 20000;
    var state = window.NINGNING_DESKTOP_PRELOAD_STATE = {
        phase: "idle",
        total: list.length,
        skipped: 0,
        completed: 0,
        failed: 0
    };
    function filterUncached(urls) {
        if (!("caches" in window) || !window.NINGNING_CACHE_VERSION) {
            return Promise.resolve(urls.slice());
        }
        return caches.open(window.NINGNING_CACHE_VERSION).then(function(cache) {
            return Promise.all(urls.map(function(u) {
                return cache.match(new URL(u, location.href).toString()).then(function(hit) {
                    return hit ? null : u;
                }).catch(function() {
                    return u;
                });
            }));
        }).then(function(res) {
            return res.filter(Boolean);
        }).catch(function() {
            return urls.slice();
        });
    }
    function fetchOne(url) {
        var controller = typeof AbortController === "function" ? new AbortController : null;
        var timer = setTimeout(function() {
            if (controller) controller.abort();
        }, TIMEOUT_MS);
        return fetch(url, {
            cache: "force-cache",
            signal: controller ? controller.signal : undefined
        }).then(function(res) {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.body && res.body.getReader ? drain(res.body.getReader()) : res.blob();
        }).then(function() {
            state.completed++;
        }).catch(function() {
            state.failed++;
        }).then(function() {
            clearTimeout(timer);
        });
    }
    function drain(reader) {
        return reader.read().then(function step(r) {
            return r.done ? undefined : reader.read().then(step);
        });
    }
    function runQueue(urls) {
        var i = 0;
        function next() {
            if (i >= urls.length) return Promise.resolve();
            return fetchOne(urls[i++]).then(next);
        }
        var workers = [];
        for (var w = 0; w < Math.min(CONCURRENCY, urls.length); w++) workers.push(next());
        return Promise.all(workers);
    }
    function start() {
        if (state.phase !== "idle") return;
        state.phase = "checking";
        filterUncached(list).then(function(pending) {
            state.skipped = list.length - pending.length;
            if (!pending.length) {
                state.phase = "ready";
                return;
            }
            state.phase = "downloading";
            return runQueue(pending).then(function() {
                state.phase = state.failed ? "partial" : "ready";
            });
        }).catch(function() {
            state.phase = "error";
        });
    }
    function schedule() {
        if (typeof requestIdleCallback === "function") {
            requestIdleCallback(start, {
                timeout: 5000
            });
        } else {
            setTimeout(start, 2500);
        }
    }
    if (document.readyState === "complete") schedule(); else window.addEventListener("load", schedule, {
        once: true
    });
})();
