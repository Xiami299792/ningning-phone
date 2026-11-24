(function() {
    "use strict";
    var root = document.documentElement;
    function applyMode() {
        root.classList.add("mobile-mode");
        root.classList.add("mm-narrow");
        root.classList.remove("mm-landscape");
        window.NINGNING_IS_MOBILE = true;
        return true;
    }
    applyMode();

    (function readHostParams() {
        var q;
        try {
            q = new URLSearchParams(window.location.search);
        } catch (e) {
            return;
        }
        if (q.get("host") !== "qdmp") return;
        root.classList.add("qdmp-host");
        window.NINGNING_HOST = "qdmp";
        var safeBottom = parseInt(q.get("safeBottom") || "0", 10);
        if (safeBottom > 0) {
            root.style.setProperty("--qdmp-safe-bottom", safeBottom + "px");
        }
        var code = q.get("code");
        if (code) {
            try { sessionStorage.setItem("qdmp_login_code", code); } catch (e) {}
            window.NINGNING_QDMP_CODE = code;
        }
        document.addEventListener("DOMContentLoaded", function() {
            var tip = document.getElementById("oobe-reload-tip");
            var alt = document.getElementById("oobe-reload-tip-alt");
            if (tip) tip.style.display = "none";
            if (alt) alt.style.display = "inline";
        });
        (function reportEnding() {
            var sent = false;
            function post() {
                if (sent) return;
                try {
                    if (localStorage.getItem("win10_ending_reached") !== "true") return;
                } catch (e) { return; }
                var mp = window.wx && window.wx.miniProgram;
                if (!mp || typeof mp.postMessage !== "function") return;
                var type = parseInt(localStorage.getItem("win10_ending_type"), 10);
                if (!type) return;
                sent = true;
                try {
                    mp.postMessage({ data: { type: "ending", endingType: type, at: Date.now() } });
                } catch (e) { sent = false; }
            }
            post();
            setInterval(post, 4000);
            window.addEventListener("pagehide", post);
        })();
    })();

    function syncViewportUnit() {
        var h = window.innerHeight;
        if (!h) return;
        root.style.setProperty("--app-vh", h + "px");
    }
    syncViewportUnit();
    document.addEventListener("DOMContentLoaded", syncViewportUnit);
    window.addEventListener("load", syncViewportUnit);
    window.addEventListener("resize", syncViewportUnit);
    window.addEventListener("orientationchange", syncViewportUnit);

    function whenReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function() { setTimeout(fn, 0); });
        } else {
            setTimeout(fn, 0);
        }
    }

    var suppressClickUntil = 0;
    window.ningningSuppressGhostClick = function() {
        suppressClickUntil = Date.now() + 300;
    };

    var lastOpenAt = 0;
    function delegateSingleTap() {
        document.addEventListener("click", function(e) {
            var t0 = e.target;
            var isSystemCtrl = t0 && t0.closest && (t0.closest('.btn-min, .btn-close, #phone-navbar, .phone-app-back, #phone-control-center, #phone-switcher, #sb-right-trigger'));
            if (!isSystemCtrl && Date.now() < suppressClickUntil) {
                e.stopPropagation();
                e.preventDefault();
                return;
            }
            var target = e.target;
            if (!target || !target.closest) return;

            var sticky = target.closest("#sn-ico");
            if (sticky) {
                if (Date.now() - lastOpenAt < 350) return;
                lastOpenAt = Date.now();
                window.ningningSuppressGhostClick();
                sticky.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
                return;
            }

            var deskIcon = target.closest(".desktop-icon");
            if (deskIcon) {
                if (Date.now() - lastOpenAt < 350) return;
                lastOpenAt = Date.now();
                window.ningningSuppressGhostClick();
                if (typeof deskIcon.ondblclick === "function") {
                    deskIcon.ondblclick(e);
                } else {
                    deskIcon.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
                }
                return;
            }

            var expItem = target.closest(".explorer-drive-item, .explorer-item");
            if (expItem && !target.closest(".file-item")) {
                if (Date.now() - lastOpenAt < 350) return;
                lastOpenAt = Date.now();
                window.ningningSuppressGhostClick();
                if (typeof expItem.ondblclick === "function") expItem.ondblclick(e);
                else expItem.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
                return;
            }
            var item = target.closest(".file-item");
            if (!item || typeof item.ondblclick !== "function") return;
            if (Date.now() - lastOpenAt < 350) return;
            lastOpenAt = Date.now();
            window.ningningSuppressGhostClick();
            item.ondblclick();
        }, true);
    }

    function setupWeChatNav() {
        var view = document.getElementById("wechat-chat-view");
        var chatPanel = document.getElementById("wechat-chat-panel");
        var profilePanel = document.getElementById("wechat-profile-panel");
        var contactList = document.getElementById("wechat-contact-list");
        if (!view || !chatPanel || !contactList) return;
        function backBtn(onTap) {
            var b = document.createElement("div");
            b.className = "mm-back-btn";
            b.setAttribute("role", "button");
            b.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
            b.addEventListener("click", function(e) {
                e.stopPropagation();
                onTap();
            });
            return b;
        }
        function toList() { view.classList.remove("wc-detail"); }
        function toDetail() { view.classList.add("wc-detail"); }
        window.ningningWeChatToList = toList;
        chatPanel.appendChild(backBtn(toList));
        if (profilePanel) profilePanel.appendChild(backBtn(toList));
        contactList.addEventListener("click", function() { toDetail(); }, true);
        var dropdown = document.getElementById("wechat-search-dropdown");
        if (dropdown) {
            dropdown.addEventListener("click", function() { toDetail(); }, true);
        }
        var winWechat = document.getElementById("win-wechat");
        if (winWechat) {
            var closeBtn = winWechat.querySelector(".btn-close");
            if (closeBtn) closeBtn.addEventListener("click", toList);
        }
    }

    var AUDIO_POOL_SRCS = [
        "audio/message.mp3", "audio/morse.wav", "audio/windowsError.mp3",
        "audio/windows10_sound.mp3", "audio/zilizili-error.mp3",
        "audio/windows-10-bsod-sound.mp3", "audio/windows-10-foreground-earrape.mp3",
        "audio/windows-10-notify-system-sound.mp3"
    ];

    function setupAudioUnlock() {
        var pool = Object.create(null);
        var NativeAudio = window.Audio;
        window.NINGNING_AUDIO_POOL = pool;
        function poolKey(src) {
            return String(src || "").replace(/^.*\/(?=[^/]+$)/, "");
        }
        AUDIO_POOL_SRCS.forEach(function(src) {
            var el = new NativeAudio();
            el.src = window.ningningAssetUrl ? window.ningningAssetUrl(src) : src;
            el.preload = "none";
            pool[poolKey(src)] = el;
        });
        function PatchedAudio(src) {
            if (src) {
                var hit = pool[poolKey(src)];
                if (hit) {
                    try { hit.pause(); hit.currentTime = 0; } catch (e) {}
                    hit.loop = false;
                    hit.volume = window.NINGNING_MUTED ? 0 : 1;
                    return hit;
                }
            }
            var a = src ? new NativeAudio(src) : new NativeAudio();
            if (window.NINGNING_MUTED) a.muted = true;
            return a;
        }
        PatchedAudio.prototype = NativeAudio.prototype;
        window.Audio = PatchedAudio;

        var unlocked = false;
        function unlock() {
            if (unlocked) return;
            unlocked = true;
            var all = [];
            Object.keys(pool).forEach(function(k) { all.push(pool[k]); });
            Array.prototype.forEach.call(document.querySelectorAll("audio"), function(el) { all.push(el); });
            all.forEach(function(el) {
                try {
                    var was = el.muted;
                    el.muted = true;
                    var p = el.play();
                    if (p && typeof p.then === "function") {
                        p.then(function() {
                            el.pause();
                            try { el.currentTime = 0; } catch (e) {}
                            el.muted = window.NINGNING_MUTED ? true : was;
                        }).catch(function() { el.muted = window.NINGNING_MUTED ? true : was; });
                    } else {
                        el.pause();
                        el.muted = window.NINGNING_MUTED ? true : was;
                    }
                } catch (e) {}
            });
            document.removeEventListener("touchend", unlock, true);
            document.removeEventListener("click", unlock, true);
        }
        document.addEventListener("touchend", unlock, true);
        document.addEventListener("click", unlock, true);
    }

    function neutralizeMaximize() {
        document.addEventListener("click", function(e) {
            var btn = e.target && e.target.closest && e.target.closest(".btn-max");
            if (!btn) return;
            e.stopPropagation();
            e.preventDefault();
        }, true);
    }

    function tameDecorativeInputs() {
        var el = document.querySelector("#win-pc .explorer-search input");
        if (!el) return;
        el.readOnly = true;
        el.classList.add("mm-decorative");
    }
    window.ningningTameDecorativeInputs = tameDecorativeInputs;

    function setupNewsAvatar() {
        var bar = document.querySelector("#win-news .window-content > div:first-child");
        if (!bar || document.getElementById("mm-news-avatar")) return;
        var img = document.createElement("img");
        img.id = "mm-news-avatar";
        img.src = "image/ningning.webp";
        img.alt = "宁宁";
        bar.appendChild(img);
    }

    function setupSettingsBack() {
        document.querySelectorAll("#settings-system [data-settings-back], #settings-recovery [data-settings-back]").forEach(function(el) {
            var head = el.parentElement;
            if (!head || head.dataset.mmBackHead) return;
            head.dataset.mmBackHead = "1";
            head.addEventListener("click", function(e) {
                if (el.contains(e.target)) return;
                el.click();
            });
        });
    }

    whenReady(function() {
        delegateSingleTap();
        tameDecorativeInputs();
        setupNewsAvatar();
        setupSettingsBack();
        setupWeChatNav();
        setupAudioUnlock();
        neutralizeMaximize();
    });
})();
