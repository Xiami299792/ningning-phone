(function() {
    const KEY_BILI_STATE = "win10_bili_view_state";
    const KEY_BILI_FOLLOWED = "win10_bili_followed_v2";
    const BILI_BASE_FANS = 4319;
    const BILI_NORMAL_SIZE = {
        width: 1150,
        height: 750
    };
    const BILI_404_SIZE = {
        width: 650,
        height: 450
    };
    const BILI_RABBIT_SIZE = {
        width: 900,
        height: 620
    };
    const _isZ2 = localStorage.getItem("win10_zhoumu2") === "true";
    const _isZ3 = localStorage.getItem("win10_zhoumu3") === "true";
    function getBiliViews() {
        return {
            normal: document.getElementById("bilibili-view-normal"),
            v404: document.getElementById("bilibili-view-404"),
            web1: document.getElementById("bilibili-view-web1"),
            title: document.getElementById("bilibili-title-text")
        };
    }
    function setBiliWindowSize(state) {
        const win = document.getElementById("win-bilibili");
        if (!win) return;
        const size = state === "404" ? BILI_404_SIZE : state === "web1" ? BILI_RABBIT_SIZE : BILI_NORMAL_SIZE;
        const width = `${size.width}px`;
        const height = `${size.height}px`;
        const sizeChanged = win.style.width !== width || win.style.height !== height;
        win.style.width = width;
        win.style.height = height;
        if (sizeChanged && win.style.display !== "none" && !win.classList.contains("maximized")) {
            win.style.left = `${Math.max(0, (window.innerWidth - size.width) / 2)}px`;
            win.style.top = `${Math.max(0, (window.innerHeight - size.height - 40) / 2)}px`;
        }
    }
    function maximizeBiliWindow() {
        const win = document.getElementById("win-bilibili");
        if (!win) return;
        win.classList.add("maximized");
        const maxButton = win.querySelector(".btn-max");
        if (maxButton) maxButton.innerText = "❐";
        if (typeof window.win10BringToFront === "function") {
            window.win10BringToFront("bilibili");
        }
    }
    function showBiliView(state) {
        const v = getBiliViews();
        if (!v.normal || !v.v404 || !v.web1) return;
        setBiliWindowSize(state);
        v.normal.style.display = "none";
        v.v404.style.display = "none";
        v.web1.style.display = "none";
        if (state === "404") {
            v.v404.style.display = "flex";
            if (v.title) v.title.innerHTML = "404 Not Found";
        } else if (state === "web1") {
            v.web1.style.display = "block";
            if (v.title) v.title.innerHTML = "兔子先生の日记 - 个人主页";
            if (localStorage.getItem("win10_creepy_audio_played") !== "true") {
                localStorage.setItem("win10_creepy_audio_played", "true");
                const scareAudio = new Audio("audio/windows-10-foreground-earrape.mp3");
                scareAudio.volume = 0.3;
                scareAudio.play().catch(e => console.log("音效播放被浏览器拦截:", e));
            }
        } else {
            v.normal.style.display = "block";
            if (v.title) {
                v.title.innerHTML = '<img src="image/zilizili.png" alt="icon" style="width:14px;height:14px;margin-right:5px;vertical-align:text-bottom;">个人空间 - ZiliZili';
            }
        }
    }
    function restoreBiliState() {
        const savedState = localStorage.getItem(KEY_BILI_STATE);
        if (_isZ2 || _isZ3) {
            if (savedState === "web1") {
                showBiliView("web1");
            } else {
                if (savedState !== "404") {
                    localStorage.setItem(KEY_BILI_STATE, "404");
                }
                showBiliView("404");
            }
        } else {
            if (savedState === "404" || savedState === "web1") {
                localStorage.removeItem(KEY_BILI_STATE);
            }
            showBiliView("normal");
        }
    }
    const _originalOpenApp = window.openApp;
    window.openApp = function(appId) {
        _originalOpenApp(appId);
        if (appId === "bilibili") {
            const savedState = localStorage.getItem(KEY_BILI_STATE);
            if (_isZ2 || _isZ3) {
                if (savedState === "web1") {
                    showBiliView("web1");
                } else {
                    localStorage.setItem(KEY_BILI_STATE, "404");
                    showBiliView("404");
                }
            } else {
                showBiliView("normal");
            }
        }
    };
    function updateFollowButton() {
        const btn = document.querySelector("#bilibili-view-normal button");
        if (!btn) return;
        const followed = localStorage.getItem(KEY_BILI_FOLLOWED) !== "false";
        btn.dataset.followed = String(followed);
        const textNode = Array.from(btn.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
        if (textNode) textNode.textContent = followed ? "已关注" : "关注";
        const icon = btn.querySelector("svg");
        if (icon) {
            icon.innerHTML = followed ? '<line x1="5" y1="6" x2="19" y2="6"></line><line x1="5" y1="12" x2="19" y2="12"></line><line x1="5" y1="18" x2="19" y2="18"></line>' : '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>';
        }
        btn.style.background = followed ? "rgba(255,255,255,0.15)" : "#00AEEC";
        btn.style.border = followed ? "1px solid rgba(255,255,255,0.4)" : "none";
        btn.style.backdropFilter = followed ? "blur(4px)" : "";
        btn.style.webkitBackdropFilter = followed ? "blur(4px)" : "";
        const fanCount = document.querySelectorAll("#bilibili-view-normal .num")[1];
        if (fanCount) fanCount.textContent = String(BILI_BASE_FANS + (followed ? 1 : 0));
    }
    function initFollowButton() {
        const btn = document.querySelector("#bilibili-view-normal button");
        if (!btn) return;
        updateFollowButton();
        btn.onmouseover = function() {
            this.style.background = this.dataset.followed === "true" ? "rgba(255,255,255,0.25)" : "#00bdfc";
        };
        btn.onmouseout = function() {
            this.style.background = this.dataset.followed === "true" ? "rgba(255,255,255,0.15)" : "#00AEEC";
        };
        btn.onclick = function() {
            const followed = localStorage.getItem(KEY_BILI_FOLLOWED) !== "false";
            localStorage.setItem(KEY_BILI_FOLLOWED, String(!followed));
            updateFollowButton();
        };
    }
    function initBiliEvents() {
        const v = getBiliViews();
        if (!v.normal && !v.v404 && !v.web1) {
            setTimeout(initBiliEvents, 200);
            return;
        }
        const linkBtn = document.getElementById("btn-open-web1");
        if (linkBtn) {
            linkBtn.onclick = function(e) {
                e.preventDefault();
                localStorage.setItem(KEY_BILI_STATE, "web1");
                showBiliView("web1");
                maximizeBiliWindow();
            };
        }
        restoreBiliState();
        initFollowButton();
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initBiliEvents);
    } else {
        initBiliEvents();
    }
})();
