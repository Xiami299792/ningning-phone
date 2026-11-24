(function initStartMenu() {
    "use strict";
    var menu = document.getElementById("start-menu");
    var startBtn = document.getElementById("start-btn");
    var powerMenu = document.getElementById("sm-power-menu");
    var appListEl = document.getElementById("sm-applist");
    var tileGrid = document.getElementById("sm-tile-grid");
    if (!menu || !startBtn) return;
    var isZ2 = localStorage.getItem("win10_zhoumu2") === "true";
    var isZ3 = localStorage.getItem("win10_zhoumu3") === "true";
    var userName = isZ3 ? "若宁" : "江若宁";
    var nameEls = [ document.getElementById("sm-user-name"), document.getElementById("settings-user-name") ];
    nameEls.forEach(function(el) {
        if (el) el.textContent = userName;
    });
    var TILE_COLOR = {
        wechat: "#07b34c",
        xhs: "#ff2442",
        bilibili: "#fb7299",
        google: "#4285f4",
        news: "#c8102e",
        pics: "#0078d7",
        docs: "#f2a900",
        pc: "#0067b8",
        bin: "#5a5a5a",
        secret: "#8764b8",
        settings: "#4a4a4a",
        videoplayer: "#00b7c3",
        hospitalpdf: "#d13438",
        cmd: "#1f1f1f",
        search: "#0067b8"
    };
    var TILE_ORDER = [ "wechat", "xhs", "bilibili", "news", "google", "pics", "docs", "pc" ];
    var TILE_COUNT = 6;
    var LATE_UNLOCK = [ "cmd", "search", "hospitalpdf", "google", "videoplayer" ];
    function biliUnlocked() {
        if (isZ2 || isZ3) return false;
        return localStorage.getItem("win10_bili_view_state") !== null;
    }
    function visibleApps() {
        var out = [];
        var seen = {};
        document.querySelectorAll(".desktop-icon").forEach(function(icon) {
            if (icon.style.display === "none") return;
            var appId = icon.getAttribute("data-app");
            if (!appId || seen[appId]) return;
            seen[appId] = true;
            var info = window.appInfo && window.appInfo[appId] || null;
            var textEl = icon.querySelector(".icon-text");
            var label = textEl && textEl.textContent.trim() || (info ? info.name : appId);
            var iconImg = icon.querySelector(".icon-img img");
            out.push({
                id: appId,
                name: (label || appId).trim(),
                icon: iconImg ? iconImg.getAttribute("src") : info ? info.icon : "",
                svg: iconImg ? null : (icon.querySelector(".icon-img svg") || {}).outerHTML
            });
        });
        if (biliUnlocked() && !seen.bilibili) {
            var bi = window.appInfo && window.appInfo.bilibili || {
                icon: "image/zilizili.png",
                name: "ZiliZili"
            };
            out.push({
                id: "bilibili",
                name: bi.name,
                icon: bi.icon,
                svg: null
            });
        }
        return out;
    }
    function nameGroup(name) {
        var c = (name || "").charAt(0);
        if (/[0-9]/.test(c)) return 0;
        if (/[a-zA-Z]/.test(c)) return 1;
        return 2;
    }
    function sortLikeWindows(a, b) {
        var ga = nameGroup(a.name), gb = nameGroup(b.name);
        if (ga !== gb) return ga - gb;
        if (ga === 2) {
            try {
                return a.name.localeCompare(b.name, "zh-Hans-CN-u-co-pinyin");
            } catch (e) {
                return a.name.localeCompare(b.name);
            }
        }
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0;
    }
    function appNode(app, cls) {
        var d = document.createElement("div");
        d.className = cls || "sm-app";
        var art = app.icon ? '<img src="' + app.icon + '" alt="">' : app.svg || '<svg viewBox="0 0 16 16"><rect width="16" height="16" fill="#666"/></svg>';
        d.innerHTML = art + "<span>" + app.name + "</span>";
        d.onclick = function() {
            launch(app.id);
        };
        return d;
    }
    function launch(appId) {
        closeMenu();
        if (appId === "settings") {
            openSettings();
            return;
        }
        if (typeof window.requestOpenApp === "function") window.requestOpenApp(appId); else if (typeof window.openApp === "function") window.openApp(appId);
    }
    function render() {
        var apps = visibleApps();
        appListEl.innerHTML = "";
        var recentApps = apps.filter(function(a) {
            return LATE_UNLOCK.indexOf(a.id) !== -1 || a.id === "bilibili";
        }).slice(0, 3);
        if (recentApps.length) {
            var recent = document.createElement("div");
            recent.className = "sm-section";
            recent.textContent = "最近添加";
            appListEl.appendChild(recent);
            recentApps.forEach(function(a) {
                appListEl.appendChild(appNode(a));
            });
        }
        var allSec = document.createElement("div");
        allSec.className = "sm-section";
        allSec.textContent = "所有应用";
        appListEl.appendChild(allSec);
        apps.slice().sort(sortLikeWindows).forEach(function(a) {
            appListEl.appendChild(appNode(a));
        });
        appListEl.appendChild(appNode({
            id: "settings",
            name: "设置",
            icon: window.appInfo && window.appInfo.settings && window.appInfo.settings.icon || "image/settings.webp"
        }));
        tileGrid.innerHTML = "";
        var byId = {};
        apps.forEach(function(a) {
            byId[a.id] = a;
        });
        var picked = TILE_ORDER.filter(function(id) {
            return byId[id];
        });
        apps.forEach(function(a) {
            if (picked.length >= TILE_COUNT) return;
            if (picked.indexOf(a.id) === -1) picked.push(a.id);
        });
        picked = picked.slice(0, TILE_COUNT);
        picked.forEach(function(id) {
            var a = byId[id];
            if (!a) return;
            var t = document.createElement("div");
            t.className = "sm-tile";
            t.style.background = TILE_COLOR[id] || "#0067b8";
            t.innerHTML = (a.icon ? '<img src="' + a.icon + '" alt="">' : a.svg || "") + '<div class="sm-tile-name">' + a.name + "</div>";
            t.onclick = function() {
                launch(id);
            };
            tileGrid.appendChild(t);
        });
    }
    function openMenu() {
        render();
        menu.classList.add("open");
        startBtn.classList.add("active");
    }
    function closeMenu() {
        menu.classList.remove("open", "rail-open");
        startBtn.classList.remove("active");
        powerMenu.classList.remove("open");
    }
    function toggleMenu() {
        if (menu.classList.contains("open")) closeMenu(); else openMenu();
    }
    startBtn.onclick = function(e) {
        e.stopPropagation();
        toggleMenu();
    };
    function positionPowerMenu() {
        powerMenu.style.bottom = "136px";
    }
    menu.addEventListener("click", function(e) {
        e.stopPropagation();
    });
    powerMenu.addEventListener("click", function(e) {
        e.stopPropagation();
    });
    document.addEventListener("click", function() {
        if (menu.classList.contains("open")) closeMenu();
    });
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && menu.classList.contains("open")) {
            closeMenu();
            return;
        }
        if (e.key === "Meta" || e.key === "OS") {
            var t = e.target && e.target.tagName;
            if (t === "INPUT" || t === "TEXTAREA" || e.target && e.target.isContentEditable) return;
            e.preventDefault();
            toggleMenu();
        }
    });
    menu.querySelectorAll(".sm-rail-btn").forEach(function(el) {
        var label = el.querySelector(".sm-rail-label");
        if (label && !el.title) el.title = label.textContent.trim();
    });
    menu.querySelector("[data-sm-expand]").onclick = function(e) {
        e.stopPropagation();
        menu.classList.toggle("rail-open");
        if (!menu.classList.contains("rail-open")) powerMenu.classList.remove("open");
    };
    menu.addEventListener("click", function(e) {
        if (!menu.classList.contains("rail-open")) return;
        if (e.target.closest && e.target.closest(".sm-rail")) return;
        menu.classList.remove("rail-open");
        powerMenu.classList.remove("open");
    });
    menu.querySelectorAll("[data-sm-app]").forEach(function(el) {
        el.onclick = function() {
            launch(el.getAttribute("data-sm-app"));
        };
    });
    menu.querySelector('[data-sm-action="settings"]').onclick = function() {
        launch("settings");
    };
    menu.querySelector('[data-sm-action="user"]').onclick = function() {
        launch("settings");
    };
    menu.querySelector('[data-sm-action="power"]').onclick = function(e) {
        e.stopPropagation();
        positionPowerMenu();
        powerMenu.classList.toggle("open");
    };
    powerMenu.querySelectorAll("[data-sm-power]").forEach(function(el) {
        el.onclick = function() {
            var act = el.getAttribute("data-sm-power");
            closeMenu();
            if (act === "restart") location.reload(); else if (act === "shutdown") location.href = "index.html"; else fakeSleep();
        };
    });
    function fakeSleep() {
        var v = document.createElement("div");
        v.style.cssText = "position:fixed;inset:0;background:#000;z-index:1000000;opacity:0;transition:opacity .6s;cursor:pointer;";
        document.body.appendChild(v);
        requestAnimationFrame(function() {
            v.style.opacity = "1";
        });
        var wake = function() {
            v.style.opacity = "0";
            setTimeout(function() {
                v.remove();
            }, 700);
            document.removeEventListener("keydown", wake);
        };
        v.onclick = wake;
        document.addEventListener("keydown", wake);
    }
    var settingsWin = document.getElementById("win-settings");
    var pages = {
        home: document.getElementById("settings-home"),
        recovery: document.getElementById("settings-recovery"),
        system: document.getElementById("settings-system")
    };
    function showPage(name) {
        Object.keys(pages).forEach(function(k) {
            if (pages[k]) pages[k].style.display = k === name ? k === "home" ? "block" : "flex" : "none";
        });
        var title = document.getElementById("title-settings");
        if (title) {
            title.textContent = name === "home" ? "设置" : name === "recovery" ? "传输或还原 iPhone" : "关于本机";
        }
    }
    function openSettings() {
        showPage("home");
        var boot = document.getElementById("settings-lastboot");
        if (boot) {
            var d = new Date;
            boot.textContent = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
        }
        var build = document.getElementById("settings-osbuild");
        if (build) build.textContent = isZ3 ? "19041.____" : isZ2 ? "19041.985" : "19041.985";
        if (typeof window.openApp === "function") window.openApp("settings"); else if (settingsWin) settingsWin.style.display = "flex";
    }
    window.openSettingsApp = openSettings;
    if (settingsWin) {
        settingsWin.querySelectorAll("[data-settings-cat]").forEach(function(el) {
            el.onclick = function() {
                var cat = el.getAttribute("data-settings-cat");
                if (cat === "none") {
                    flashUnavailable(el);
                    return;
                }
                showPage(cat);
            };
        });
        var unavailableTimer = null;
        function flashUnavailable(el) {
            var box = document.getElementById("settings-unavailable");
            if (!box) {
                box = document.createElement("div");
                box.id = "settings-unavailable";
                box.style.cssText = "position:absolute; left:50%; bottom:22px; transform:translateX(-50%);" + "background:#323130; color:#fff; font-size:12.5px; padding:9px 18px;" + "box-shadow:0 2px 10px rgba(0,0,0,.28); opacity:0; transition:opacity .18s;" + "pointer-events:none; z-index:5; white-space:nowrap;";
                var home = document.getElementById("settings-home");
                if (home) {
                    home.style.position = "relative";
                    home.appendChild(box);
                } else return;
            }
            var name = (el.querySelector("b") || {}).textContent || "该设置";
            box.textContent = "「" + name + "」在此设备上不可用";
            box.style.opacity = "1";
            clearTimeout(unavailableTimer);
            unavailableTimer = setTimeout(function() {
                box.style.opacity = "0";
            }, 1800);
        }
        settingsWin.querySelectorAll("[data-settings-back]").forEach(function(el) {
            el.onclick = function() {
                showPage("home");
            };
        });
    }
    var resetModal = document.getElementById("reset-modal");
    var btnResetPc = document.getElementById("btn-reset-pc");
    var resetConfirmBtn = document.getElementById("reset-confirm");
    var resetHint = document.getElementById("reset-hint");
    var resetOpts = resetModal ? resetModal.querySelectorAll("[data-reset-mode]") : [];
    var resetMode = null;
    var KEEP_ON_PARTIAL = [ "win10_zhoumu2", "win10_zhoumu3", "win10_first_boot_done" ];
    function clearSelection() {
        resetMode = null;
        Array.prototype.forEach.call(resetOpts, function(el) {
            el.classList.remove("selected");
        });
        if (resetConfirmBtn) resetConfirmBtn.style.display = "none";
        if (resetHint) {
            resetHint.textContent = "选择一种重置方式，然后点击右下角「确认」。";
            resetHint.style.color = "#666";
        }
    }
    function openResetModal() {
        clearSelection();
        if (resetModal) resetModal.style.display = "flex";
    }
    function closeResetModal() {
        if (resetModal) resetModal.style.display = "none";
        clearSelection();
    }
    if (btnResetPc) btnResetPc.onclick = openResetModal;
    var rc = document.getElementById("reset-cancel");
    var rx = document.getElementById("reset-modal-x");
    if (rc) rc.onclick = closeResetModal;
    if (rx) rx.onclick = closeResetModal;
    if (resetModal) resetModal.onclick = function(e) {
        if (e.target === resetModal) closeResetModal();
    };
    Array.prototype.forEach.call(resetOpts, function(el) {
        el.onclick = function() {
            resetMode = el.getAttribute("data-reset-mode");
            Array.prototype.forEach.call(resetOpts, function(o) {
                o.classList.remove("selected");
            });
            el.classList.add("selected");
            if (resetConfirmBtn) resetConfirmBtn.style.display = "inline-block";
            if (resetHint) {
                resetHint.textContent = resetMode === "all" ? "将删除全部进度，此操作无法撤销。" : "将保留你已解锁到的周目。";
                resetHint.style.color = resetMode === "all" ? "#c42b1c" : "#666";
            }
        };
    });
    if (resetConfirmBtn) resetConfirmBtn.onclick = function() {
        if (!resetMode) return;
        wipe(resetMode === "all" ? [] : KEEP_ON_PARTIAL);
        finishReset();
    };
    function wipe(keepKeys) {
        var keep = {};
        keepKeys.forEach(function(k) {
            var v = localStorage.getItem(k);
            if (v !== null) keep[k] = v;
        });
        var doomed = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key && key.indexOf("win10_") === 0) doomed.push(key);
        }
        doomed.forEach(function(k) {
            localStorage.removeItem(k);
        });
        Object.keys(keep).forEach(function(k) {
            localStorage.setItem(k, keep[k]);
        });
    }
    function finishReset() {
        closeResetModal();
        var done = function() {
            location.href = "index.html";
        };
        showResetScreen();
        if (window.caches && caches.keys) {
            caches.keys().then(function(keys) {
                return Promise.all(keys.map(function(k) {
                    return caches.delete(k);
                }));
            }).then(function() {
                setTimeout(done, 2200);
            }).catch(function() {
                setTimeout(done, 2200);
            });
        } else {
            setTimeout(done, 2200);
        }
    }
    function showResetScreen() {
        var v = document.createElement("div");
        v.style.cssText = "position:fixed;inset:0;background:#0067b8;z-index:1000002;display:flex;" + "flex-direction:column;align-items:center;justify-content:center;color:#fff;" + "font-family:'Segoe UI','Microsoft YaHei',sans-serif;";
        v.innerHTML = '<div style="width:44px;height:44px;border:3px solid rgba(255,255,255,.3);' + 'border-top-color:#fff;border-radius:50%;animation:sm-spin 1s linear infinite;"></div>' + '<div style="margin-top:28px;font-size:19px;font-weight:300;">正在还原 iPhone</div>' + '<div style="margin-top:10px;font-size:13px;opacity:.8;">请不要关闭电脑</div>' + "<style>@keyframes sm-spin{to{transform:rotate(360deg)}}</style>";
        document.body.appendChild(v);
    }
})();
