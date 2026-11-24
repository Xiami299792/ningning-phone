/* ==========================================================================
   NingOS Smartphone Shell Controller (phone-os.js)
   Manages Status Bar, Dynamic Island, SpringBoard Grid, Dock, Control Center,
   Multitasking Switcher, Push Notifications, and Smart Back Navigation.
   ========================================================================== */
(function () {
  "use strict";

  var isZ2 = false;
  var isZ3 = false;
  try {
    isZ2 = localStorage.getItem("win10_zhoumu2") === "true";
    isZ3 = localStorage.getItem("win10_zhoumu3") === "true";
  } catch (e) {}


  var IOS_SVG_ICONS = {
    "icon-pc": '<svg viewBox="0 0 60 60" width="42" height="42"><path d="M8 18a6 6 0 0 1 6-6h11l5 5h16a6 6 0 0 1 6 6v21a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V18z" fill="#1E88E5"/><rect x="8" y="21" width="44" height="27" rx="5" fill="#42A5F5"/><rect x="8" y="21" width="44" height="4" fill="#90CAF9" opacity="0.7"/></svg>',
    "icon-pics": '<svg viewBox="0 0 60 60" width="44" height="44"><rect x="25" y="6" width="10" height="20" rx="5" fill="#FF9500" opacity="0.92"/><rect x="25" y="6" width="10" height="20" rx="5" fill="#FFCC00" opacity="0.9" transform="rotate(45 30 30)"/><rect x="25" y="6" width="10" height="20" rx="5" fill="#34C759" opacity="0.9" transform="rotate(90 30 30)"/><rect x="25" y="6" width="10" height="20" rx="5" fill="#00C7BE" opacity="0.9" transform="rotate(135 30 30)"/><rect x="25" y="6" width="10" height="20" rx="5" fill="#007AFF" opacity="0.9" transform="rotate(180 30 30)"/><rect x="25" y="6" width="10" height="20" rx="5" fill="#5856D6" opacity="0.9" transform="rotate(225 30 30)"/><rect x="25" y="6" width="10" height="20" rx="5" fill="#AF52DE" opacity="0.9" transform="rotate(270 30 30)"/><rect x="25" y="6" width="10" height="20" rx="5" fill="#FF2D55" opacity="0.9" transform="rotate(315 30 30)"/></svg>',
    "icon-docs": '<svg viewBox="0 0 60 60" width="38" height="38" fill="none"><path d="M16 10h20l10 10v30a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" fill="#fff"/><path d="M36 10v10h10" fill="#FFE0B2"/><line x1="20" y1="28" x2="38" y2="28" stroke="#FF9500" stroke-width="3" stroke-linecap="round"/><line x1="20" y1="36" x2="38" y2="36" stroke="#FF9500" stroke-width="3" stroke-linecap="round"/><line x1="20" y1="44" x2="31" y2="44" stroke="#FF9500" stroke-width="3" stroke-linecap="round"/></svg>',
    "icon-secret": '<svg viewBox="0 0 60 60" width="56" height="56"><rect width="60" height="60" fill="#fff"/><rect width="60" height="17" fill="#FFCC00"/><line x1="0" y1="17" x2="60" y2="17" stroke="#E5E5EA" stroke-width="1.5" stroke-dasharray="3 3"/><line x1="8" y1="28" x2="52" y2="28" stroke="#E5E5EA" stroke-width="1.5"/><line x1="8" y1="38" x2="52" y2="38" stroke="#E5E5EA" stroke-width="1.5"/><line x1="8" y1="48" x2="38" y2="48" stroke="#E5E5EA" stroke-width="1.5"/></svg>',
    "icon-bin": '<svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="12 18 48 18"/><path d="M22 18v-4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4"/><path d="M16 18l2.5 28a4 4 0 0 0 4 3.5h15a4 4 0 0 0 4-3.5L44 18"/><line x1="25" y1="26" x2="25" y2="40"/><line x1="35" y1="26" x2="35" y2="40"/></svg>',
    "icon-settings-home": '<svg viewBox="0 0 60 60" width="40" height="40"><circle cx="30" cy="30" r="10" stroke="#f2f2f7" stroke-width="4.5" fill="none"/><circle cx="30" cy="30" r="4" fill="#d1d5db"/><g stroke="#f2f2f7" stroke-width="4.5" stroke-linecap="round"><line x1="30" y1="9" x2="30" y2="15"/><line x1="30" y1="45" x2="30" y2="51"/><line x1="9" y1="30" x2="15" y2="30"/><line x1="45" y1="30" x2="51" y2="30"/><line x1="15.2" y1="15.2" x2="19.5" y2="19.5"/><line x1="40.5" y1="40.5" x2="44.8" y2="44.8"/><line x1="44.8" y1="15.2" x2="40.5" y2="19.5"/><line x1="19.5" y1="40.5" x2="15.2" y2="44.8"/></g></svg>',
    "icon-search": '<svg viewBox="0 0 60 60" width="34" height="34" fill="none" stroke="#fff" stroke-width="4.2" stroke-linecap="round"><circle cx="27" cy="27" r="13"/><line x1="46" y1="46" x2="36.5" y2="36.5"/></svg>'
  };

  var IOS_BLUE_FOLDER_SVG = '<svg viewBox="0 0 48 48" width="42" height="42"><path d="M5 14a5 5 0 0 1 5-5h9l4 4h15a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V14z" fill="#1E88E5"/><rect x="5" y="16" width="38" height="23" rx="4" fill="#42A5F5"/></svg>';


  var IOS_BG_MAP = {
    "icon-pc": "#ffffff",
    "icon-pics": "#ffffff",
    "icon-docs": "linear-gradient(145deg,#ff9f0a,#ff6b00)",
    "icon-secret": "#ffffff",
    "icon-bin": "linear-gradient(145deg,#636366,#3a3a3c)",
    "icon-settings-home": "linear-gradient(145deg,#8e8e93,#58585c)",
    "icon-search": "linear-gradient(145deg,#5ac8fa,#007aff)",
    "icon-wechat": "linear-gradient(145deg,#22d669,#07b34c)",
    "icon-xhs": "linear-gradient(145deg,#ff3a55,#e61c38)",
    "icon-news": "linear-gradient(145deg,#d92638,#9e1020)",
    "icon-google": "#ffffff",
    "icon-bilibili-home": "linear-gradient(145deg,#ff85ad,#fb7299)",
    "icon-cmd": "linear-gradient(145deg,#242830,#0c0e12)",
    "icon-hospitalpdf": "linear-gradient(145deg,#ef4444,#b91c1c)",
    "icon-videoplayer": "linear-gradient(145deg,#2dd4bf,#0f766e)"
  };

  function getMiniIconHtml(iconId, appId, imgSrc, size) {
    var sz = size || 40;
    var key = iconId || (appId === "settings" ? "icon-settings-home" : "icon-" + appId);
    var bg = IOS_BG_MAP[key] || "rgba(255,255,255,0.92)";
    var pad = key === "icon-secret" ? "0" : "5px";
    if (IOS_SVG_ICONS[key]) {
      return '<div class="ios-mini-badge" style="width:' + sz + 'px;height:' + sz + 'px;background:' + bg + ';padding:' + pad + ';">' + IOS_SVG_ICONS[key] + '</div>';
    }
    var src = appId === "xhs" ? "image/小红书.png" : (imgSrc || "image/app.webp");
    return '<div class="ios-mini-badge" style="width:' + sz + 'px;height:' + sz + 'px;background:' + bg + ';padding:6px;"><img src="' + src + '" alt=""></div>';
  }

  function applyIosIcons() {
    Object.keys(IOS_SVG_ICONS).forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || el.dataset.iosIconApplied) return;
      var box = el.querySelector(".icon-img");
      if (box) {
        box.innerHTML = IOS_SVG_ICONS[id];
        el.dataset.iosIconApplied = "1";
      }
    });
    // Replace yellow Windows folder icons inside #win-pc folder grid with iOS blue folders
    document.querySelectorAll("#win-pc .explorer-folder-grid .explorer-item img").forEach(function (img) {
      var wrap = document.createElement("div");
      wrap.innerHTML = IOS_BLUE_FOLDER_SVG;
      if (img.parentNode) img.parentNode.replaceChild(wrap.firstChild, img);
    });
  }

  var MOBILE_LABELS = {
    "icon-pc": "文件",
    "icon-bin": "最近删除",
    "icon-pics": "照片",
    "icon-docs": "文档",
    "icon-google": "浏览器",
    "icon-search": "全局搜索",
    "icon-videoplayer": "视频",
    "icon-hospitalpdf": "体检报告.pdf",
    "sn-ico": "备忘录"
  };

  var DARK_APPS = {
    "win-photoviewer": true,
    "win-videoplayer": true,
    "win-cmd": true,
    "win-hospitalpdf": true
  };

  function pad2(n) { return n < 10 ? "0" + n : "" + n; }

  function updateAllClocks() {
    var now = new Date();
    var hhmm = pad2(now.getHours()) + ":" + pad2(now.getMinutes());
    var weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var dateStr = (now.getMonth() + 1) + "月" + now.getDate() + "日 " + weekdays[now.getDay()];

    var sbTime = document.getElementById("phone-status-time");
    if (sbTime) sbTime.textContent = hhmm;
    var hwClock = document.getElementById("phw-clock");
    if (hwClock) hwClock.textContent = hhmm;
    var hwDate = document.getElementById("phw-date");
    if (hwDate) hwDate.textContent = dateStr;
  }

  function initStatusBarLoopMeta() {
    var sigEl = document.getElementById("sb-signal");
    var batEl = document.getElementById("sb-battery");
    var batTxt = document.getElementById("sb-bat-text");
    var batFill = document.getElementById("sb-bat-fill");
    var tempEl = document.getElementById("phw-temp");
    var locEl = document.getElementById("phw-loc");
    var hintEl = document.getElementById("phw-hint");

    if (isZ3) {
      if (sigEl) sigEl.textContent = "无服务";
      if (batTxt) batTxt.textContent = "4%";
      if (batFill) batFill.style.width = "14%";
      if (batEl) batEl.classList.add("low-bat");
      if (tempEl) tempEl.textContent = "--°";
      if (locEl) locEl.textContent = "信号丢失";
      if (hintEl) hintEl.textContent = "若宁的手机";
    } else if (isZ2) {
      if (sigEl) sigEl.textContent = "4G";
      if (batTxt) batTxt.textContent = "23%";
      if (batFill) batFill.style.width = "28%";
      if (tempEl) tempEl.textContent = "18°C";
      if (locEl) locEl.textContent = "明河市 · 阴";
      if (hintEl) hintEl.textContent = "备忘录已同步";
    } else {
      if (sigEl) sigEl.textContent = "5G";
      if (batTxt) batTxt.textContent = "87%";
      if (batFill) batFill.style.width = "84%";
      if (tempEl) tempEl.textContent = "24°C";
      if (locEl) locEl.textContent = "明河市 · 晴";
      if (hintEl) hintEl.textContent = "江若宁的手机";
    }
  }

  /* ========================================================================
     SpringBoard Home Grid — keeps all desktop icons & sticky icon in 4-col grid
     ======================================================================== */
  function organizeHomeGrid() {
    var desktop = document.getElementById("desktop");
    var grid = document.getElementById("phone-app-grid");
    if (!desktop || !grid) return;

    // Move direct desktop icons & sticky note icon into #phone-app-grid
    var icons = desktop.querySelectorAll(":scope > .desktop-icon, :scope > #sn-ico");
    icons.forEach(function (ic) {
      grid.appendChild(ic);
    });

    // Apply mobile-friendly labels (only when not currently glitching)
    Object.keys(MOBILE_LABELS).forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var txt = el.querySelector(".icon-text, .sn-ico-txt");
      if (txt && !txt.hasAttribute("data-orig-name")) {
        if (txt.textContent.trim() !== MOBILE_LABELS[id]) {
          txt.textContent = MOBILE_LABELS[id];
        }
      }
    });

    // Ensure Settings icon exists on home screen
    if (!document.getElementById("icon-settings-home")) {
      var setIcon = document.createElement("div");
      setIcon.className = "desktop-icon";
      setIcon.id = "icon-settings-home";
      setIcon.setAttribute("data-app", "settings");
      setIcon.innerHTML =
        '<div class="icon-img"><img src="image/settings.webp" alt="设置"></div>' +
        '<div class="icon-text">设置</div>';
      setIcon.ondblclick = function () {
        openSettingsMobile();
      };
      grid.appendChild(setIcon);
    }

    applyIosIcons();
    // Show ZiliZili shortcut on home screen when unlocked in Loop 1
    var biliUnlocked = false;
    try {
      biliUnlocked = !isZ2 && !isZ3 && localStorage.getItem("win10_bili_view_state") !== null;
    } catch (e) {}
    var existingBili = document.getElementById("icon-bilibili-home");
    if (biliUnlocked && !existingBili) {
      var bIcon = document.createElement("div");
      bIcon.className = "desktop-icon";
      bIcon.id = "icon-bilibili-home";
      bIcon.setAttribute("data-app", "bilibili");
      bIcon.innerHTML =
        '<div class="icon-img"><img src="image/zilizili.png" alt="ZiliZili"></div>' +
        '<div class="icon-text">ZiliZili</div>';
      bIcon.ondblclick = function () {
        if (typeof window.requestOpenApp === "function") window.requestOpenApp("bilibili");
        else if (typeof window.openApp === "function") window.openApp("bilibili");
      };
      grid.appendChild(bIcon);
    }
  }

  /* ========================================================================
     Loop 2 Jigsaw Layer
     PC 版把 9 块拼图碎片当桌面图标，靠 absolute 的 left/top 拼合，并由
     main.js 的 checkCreepyPuzzle() 逐块比对坐标。手机壳把这些图标塞进
     CSS Grid，并用 `left:auto !important` 锁了坐标 —— 碎片既拖不动，也
     拼不出图。这里把它们挪进一块独立的绝对定位画布，恢复原作玩法。
     ======================================================================== */
  var PUZZLE_LAYER_ID = "phone-puzzle-layer";
  var PUZZLE_CHIP_ID = "phone-puzzle-chip";
  var PUZZLE_SHUFFLE = [ 4, 7, 1, 6, 2, 5, 0, 3 ];
  var puzzleWatchStarted = false;
  var puzzleSolvedTimer = null;

  function puzzlePieceEls() {
    var arr = [];
    for (var i = 1; i <= 9; i++) {
      var el = document.getElementById("icon-cpic" + i);
      if (el && el.style.display !== "none") arr.push(el);
    }
    return arr;
  }

  function showPuzzleLayer(show) {
    var layer = document.getElementById(PUZZLE_LAYER_ID);
    var chip = document.getElementById(PUZZLE_CHIP_ID);
    if (layer) layer.style.display = show ? "flex" : "none";
    if (chip) chip.style.display = show ? "none" : "block";
  }

  function ensurePuzzleLayer() {
    var solved = false;
    try {
      solved = localStorage.getItem("win10_creepy_puzzle_solved") === "true";
    } catch (e) {}
    var layer = document.getElementById(PUZZLE_LAYER_ID);
    var chipEl = document.getElementById(PUZZLE_CHIP_ID);
    if (solved) {
      if (chipEl) chipEl.style.display = "none";
      // 拼好之后先让玩家看一眼成品，再把画布收掉、露出新出现的"日记"图标
      if (layer && layer.style.display !== "none" && !puzzleSolvedTimer) {
        puzzleSolvedTimer = setTimeout(function () {
          if (layer) layer.style.display = "none";
        }, 1600);
      }
      return;
    }
    var screen = document.querySelector(".phone-screen");
    if (!screen) return;
    var pieces = puzzlePieceEls();
    if (pieces.length !== 9) return;

    if (layer) {
      pieces.forEach(function (el) {
        if (el.parentElement !== layer) layer.appendChild(el);
      });
      return;
    }

    layer = document.createElement("div");
    layer.id = PUZZLE_LAYER_ID;
    layer.innerHTML =
      '<div class="ppl-head"><span>碎得太厉害了，能拼回来吗？</span>' +
      '<button type="button" class="ppl-close" aria-label="稍后再拼">✕</button></div>' +
      '<div class="ppl-guide"></div>';
    screen.appendChild(layer);

    var chip = document.createElement("button");
    chip.type = "button";
    chip.id = PUZZLE_CHIP_ID;
    chip.textContent = "拼图";
    chip.addEventListener("click", function (e) {
      e.stopPropagation();
      showPuzzleLayer(true);
    });
    screen.appendChild(chip);

    layer.querySelector(".ppl-close").addEventListener("click", function (e) {
      e.stopPropagation();
      showPuzzleLayer(false);
    });

    var grid = window.NINGNING_GRID || { w: 66, h: 82 };
    var GW = grid.w || 66, GH = grid.h || 82;
    var OX = 15, OY = 15;                       // 与 main.js 的 OFFSET_X / OFFSET_Y 一致
    var GX = OX + GW;                           // 拼合区左上角，和吸附格点对齐
    var GY = OY + GH;

    var guide = layer.querySelector(".ppl-guide");
    if (guide) {
      guide.style.left = (GX - 2) + "px";
      guide.style.top = (GY - 2) + "px";
      guide.style.width = (GW * 3 + 4) + "px";
      guide.style.height = (GH * 3 + 4) + "px";
    }

    pieces.forEach(function (el, k) {
      layer.appendChild(el);
      var x, y;
      if (k === 0) {
        x = GX;
        y = GY;
      } else {
        // 打散顺序：直接按下标摆会"半张图已经拼好"，
        // 用一个固定置换让碎片在视觉上真的是乱的。
        var slot = PUZZLE_SHUFFLE[k - 1] % 8;
        var col = slot % 3;
        var row = Math.floor(slot / 3);
        x = OX + col * GW;
        y = OY + (4 + row) * GH;
      }
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.zIndex = String(10 + k);
    });
  }

  function startPuzzleWatch() {
    if (puzzleWatchStarted) return;
    puzzleWatchStarted = true;
    var pending = null;
    var schedule = function () {
      if (pending) return;
      pending = setTimeout(function () {
        pending = null;
        ensurePuzzleLayer();
      }, 280);
    };
    [document.getElementById("desktop"), document.getElementById("phone-app-grid")].forEach(function (t) {
      if (t && window.MutationObserver) new MutationObserver(schedule).observe(t, { childList: true });
    });
    schedule();
  }

  function openSettingsMobile() {
    var win = document.getElementById("win-settings");
    if (!win) return;
    if (typeof window.openApp === "function") {
      window.openApp("settings");
    }
    win.style.display = "flex";
    win.style.zIndex = 6000;
    syncChromeTheme();
  }

  /* ========================================================================
     Per-Window Mobile Header Back Button & Chrome Theme Sync
     ======================================================================== */

  var WIN_TITLE_MAP = {
    "win-pics": "照片",
    "win-pc": "文件",
    "win-docs": "文档",
    "win-bin": "最近删除",
    "win-google": "浏览器",
    "win-search": "全局搜索",
    "win-videoplayer": "视频"
  };

  function polishAppInteriors() {
    Object.keys(WIN_TITLE_MAP).forEach(function (wid) {
      var w = document.getElementById(wid);
      if (!w) return;
      var t = w.querySelector(":scope > .title-bar .title-text");
      if (t) t.textContent = WIN_TITLE_MAP[wid];
    });
    // Tag non-photo files (e.g. .txt, .pdf, folders) inside #win-pics so photos fill square tiles cleanly
    var pics = document.getElementById("content-pics");
    if (pics) {
      pics.querySelectorAll(".file-item").forEach(function (item) {
        var name = (item.textContent || "").toLowerCase();
        var isPhoto = /\.(png|jpg|jpeg|webp|gif)/.test(name);
        item.classList.toggle("is-doc-file", !isPhoto);
      });
    }
    // Replace '此电脑' in file manager path text with '我的手机'
    var pcPath = document.querySelector("#win-pc .explorer-address, #win-pc .address-bar");
    if (pcPath && pcPath.textContent && /(此电脑|我的手机|本地磁盘)/.test(pcPath.textContent)) {
      pcPath.textContent = pcPath.textContent.replace(/此电脑|我的手机/g, "我的 iPhone").replace(/本地磁盘\s*\(C:\)/g, "手机储存");
    }
  }

  function enhanceAppHeaders() {
    document.querySelectorAll(".window").forEach(function (win) {
      var bar = win.querySelector(":scope > .title-bar");
      if (!bar || bar.querySelector(".phone-app-back")) return;
      var appId = win.id.replace(/^win-/, "");
      var back = document.createElement("button");
      back.type = "button";
      back.className = "phone-app-back";
      back.innerHTML =
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>' +
        "<span>返回</span>";
      back.addEventListener("click", function (e) {
        e.stopPropagation();
        handleSmartBack(appId);
      });
      bar.insertBefore(back, bar.firstChild);
    });
  }

  function getTopVisibleWindow() {
    var wins = Array.prototype.slice.call(document.querySelectorAll(".window, #sn-win"));
    var topWin = null;
    var maxZ = -1;
    wins.forEach(function (w) {
      var cs = window.getComputedStyle(w);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      var z = parseInt(w.style.zIndex || cs.zIndex, 10) || 1;
      if (z >= maxZ) {
        maxZ = z;
        topWin = w;
      }
    });
    return topWin;
  }

  function syncChromeTheme() {
    var sb = document.getElementById("phone-statusbar");
    var nb = document.getElementById("phone-navbar");
    if (!sb || !nb) return;
    var topWin = getTopVisibleWindow();
    sb.classList.remove("sb-light", "sb-dark");
    nb.classList.remove("nb-light");
    if (!topWin) return; // Home screen: translucent over wallpaper
    if (DARK_APPS[topWin.id]) {
      sb.classList.add("sb-dark");
    } else {
      sb.classList.add("sb-light");
      nb.classList.add("nb-light");
    }
  }

  /* ========================================================================
     Smart Back / Home / App Switcher Navigation
     ======================================================================== */
  function closeAllOverlays() {
    var cc = document.getElementById("phone-control-center");
    var ccBg = document.getElementById("phone-cc-backdrop");
    var sw = document.getElementById("phone-switcher");
    var closed = false;
    if (cc && cc.classList.contains("open")) {
      cc.classList.remove("open");
      if (ccBg) ccBg.classList.remove("open");
      closed = true;
    }
    if (sw && sw.classList.contains("open")) {
      sw.classList.remove("open");
      closed = true;
    }
    return closed;
  }

  function handleSmartBack(explicitAppId) {
    if (closeAllOverlays()) return;

    var topWin = explicitAppId ? document.getElementById("win-" + explicitAppId) : getTopVisibleWindow();
    if (!topWin) return;

    // 1. WeChat detail -> list
    if (topWin.id === "win-wechat") {
      var wcv = document.getElementById("wechat-chat-view");
      if (wcv && wcv.classList.contains("wc-detail")) {
        wcv.classList.remove("wc-detail");
        return;
      }
    }

    // 2. XHS modal -> feed
    if (topWin.id === "win-xhs") {
      var xModal = document.getElementById("xhs-modal");
      if (xModal && window.getComputedStyle(xModal).display !== "none") {
        var xClose = xModal.querySelector(".xhs-modal-close, [onclick]");
        if (xClose) { xClose.click(); return; }
        xModal.style.display = "none";
        return;
      }
    }

    // 3. Settings subpage -> settings home
    if (topWin.id === "win-settings") {
      var backBtn = topWin.querySelector("#settings-system [data-settings-back], #settings-recovery [data-settings-back]");
      var sysPage = document.getElementById("settings-system");
      var recPage = document.getElementById("settings-recovery");
      if (sysPage && window.getComputedStyle(sysPage).display !== "none") {
        var b1 = sysPage.querySelector("[data-settings-back]");
        if (b1) { b1.click(); return; }
      }
      if (recPage && window.getComputedStyle(recPage).display !== "none") {
        var b2 = recPage.querySelector("[data-settings-back]");
        if (b2) { b2.click(); return; }
      }
    }

    // 4. Sticky Notes (#sn-win)
    if (topWin.id === "sn-win") {
      var snClose = topWin.querySelector(".sn-close");
      if (snClose) snClose.click();
      else topWin.style.display = "none";
      setTimeout(syncChromeTheme, 40);
      return;
    }

    // 5. Default: close the active app window
    var closeBtn = topWin.querySelector(":scope > .title-bar .btn-close");
    if (closeBtn) closeBtn.click();
    if (window.getComputedStyle(topWin).display !== "none") topWin.style.display = "none";
    setTimeout(syncChromeTheme, 40);
  }

  function goHome() {
    closeAllOverlays();
    document.querySelectorAll(".window").forEach(function (w) {
      if (window.getComputedStyle(w).display !== "none") {
        var minBtn = w.querySelector(":scope > .title-bar .btn-min");
        if (minBtn) minBtn.click();
        if (window.getComputedStyle(w).display !== "none") w.style.display = "none";
      }
    });
    var sn = document.getElementById("sn-win");
    if (sn && window.getComputedStyle(sn).display !== "none") {
      var snMin = sn.querySelector(".sn-min, .sn-close");
      if (snMin) snMin.click();
      else sn.style.display = "none";
    }
    setTimeout(syncChromeTheme, 40);
  }

  function openSwitcher() {
    var sw = document.getElementById("phone-switcher");
    var cards = document.getElementById("ps-cards");
    if (!sw || !cards) return;
    if (sw.classList.contains("open")) {
      sw.classList.remove("open");
      return;
    }
    closeAllOverlays();
    cards.innerHTML = "";

    var openApps = [];
    // Collect open apps from #taskbar-apps + visible windows
    document.querySelectorAll("#taskbar-apps .task-item").forEach(function (ti) {
      var appId = ti.id.replace(/^task-/, "");
      var info = (window.appInfo && window.appInfo[appId]) || { name: ti.title || appId, icon: "image/app.webp" };
      openApps.push({ id: appId, name: info.name, icon: info.icon });
    });

    // Also include Settings if currently open
    var setWin = document.getElementById("win-settings");
    if (setWin && window.getComputedStyle(setWin).display !== "none" && !openApps.some(function (a) { return a.id === "settings"; })) {
      openApps.push({ id: "settings", name: "设置", icon: "image/settings.webp" });
    }

    if (!openApps.length) {
      cards.innerHTML = '<div class="ps-empty">暂无后台运行的应用</div>';
    } else {
      openApps.forEach(function (app) {
        var card = document.createElement("div");
        card.className = "ps-card";
        var swLabel = WIN_TITLE_MAP["win-" + app.id] || app.name;
        card.innerHTML =
          '<div class="ps-card-top">' +
            getMiniIconHtml(app.id === "settings" ? "icon-settings-home" : "icon-" + app.id, app.id, app.icon, 28) +
            '<div class="ps-card-name">' + swLabel + '</div>' +
            '<button type="button" class="ps-card-close" title="关闭">✕</button>' +
          '</div>' +
          '<div class="ps-card-preview">点击切换至「' + swLabel + '」</div>';
        card.querySelector(".ps-card-close").addEventListener("click", function (e) {
          e.stopPropagation();
          var w = document.getElementById("win-" + app.id);
          if (w) {
            var cb = w.querySelector(":scope > .title-bar .btn-close");
            if (cb) cb.click(); else w.style.display = "none";
          }
          card.remove();
          if (!cards.children.length) {
            cards.innerHTML = '<div class="ps-empty">暂无后台运行的应用</div>';
          }
          setTimeout(syncChromeTheme, 40);
        });
        card.addEventListener("click", function () {
          sw.classList.remove("open");
          if (app.id === "settings") openSettingsMobile();
          else if (typeof window.openApp === "function") window.openApp(app.id);
          setTimeout(syncChromeTheme, 40);
        });
        cards.appendChild(card);
      });
    }

    sw.classList.add("open");
  }

  /* ========================================================================
     Control Center (Replaces Windows Start Menu)
     ======================================================================== */
  function toggleControlCenter(forceClose) {
    var cc = document.getElementById("phone-control-center");
    var bg = document.getElementById("phone-cc-backdrop");
    if (!cc || !bg) return;
    if (forceClose || cc.classList.contains("open")) {
      cc.classList.remove("open");
      bg.classList.remove("open");
      return;
    }
    var sw = document.getElementById("phone-switcher");
    if (sw) sw.classList.remove("open");

    // Populate user name & all visible apps
    var uName = document.getElementById("cc-user-name");
    if (uName) uName.textContent = isZ3 ? "若宁" : "江若宁";

    var list = document.getElementById("cc-apps-list");
    if (list) {
      list.innerHTML = "";
      document.querySelectorAll("#phone-app-grid .desktop-icon").forEach(function (ic) {
        if (ic.style.display === "none") return;
        var appId = ic.getAttribute("data-app");
        var img = ic.querySelector(".icon-img img") || ic.querySelector("img");
        var txt = ic.querySelector(".icon-text");
        var item = document.createElement("div");
        item.className = "cc-mini-app";
        item.innerHTML =
          getMiniIconHtml(ic.id, appId, img ? img.getAttribute("src") : null, 40) +
          "<span>" + (txt ? txt.textContent.trim() : appId) + "</span>";
        item.addEventListener("click", function () {
          toggleControlCenter(true);
          if (appId === "settings") openSettingsMobile();
          else if (typeof ic.ondblclick === "function") ic.ondblclick();
          else if (typeof window.requestOpenApp === "function") window.requestOpenApp(appId);
        });
        list.appendChild(item);
      });
    }

    cc.classList.add("open");
    bg.classList.add("open");
  }

  function toggleMute() {
    window.NINGNING_MUTED = !window.NINGNING_MUTED;
    var btn = document.getElementById("cc-mute-tile");
    var sub = document.getElementById("cc-mute-sub");
    if (btn) btn.classList.toggle("active", !window.NINGNING_MUTED);
    if (sub) sub.textContent = window.NINGNING_MUTED ? "已静音" : "声音开启";

    document.querySelectorAll("audio, video").forEach(function (el) {
      el.muted = !!window.NINGNING_MUTED;
    });
    if (window.NINGNING_AUDIO_POOL) {
      Object.keys(window.NINGNING_AUDIO_POOL).forEach(function (k) {
        window.NINGNING_AUDIO_POOL[k].muted = !!window.NINGNING_MUTED;
      });
    }
  }

  /* ========================================================================
     Dynamic Island & Mobile Push Notification Observer (#win-toast)
     ======================================================================== */
  function pulseIsland(labelText) {
    var island = document.getElementById("phone-island");
    if (!island) return;
    var lbl = island.querySelector(".island-label");
    if (lbl && labelText) lbl.textContent = labelText;
    island.classList.add("expanded");
    clearTimeout(island._timer);
    island._timer = setTimeout(function () {
      island.classList.remove("expanded");
    }, 3200);
  }

  function bindToastObserver() {
    var toast = document.getElementById("win-toast");
    if (!toast) return;
    var obs = new MutationObserver(function () {
      var r = parseInt(toast.style.right, 10);
      if (!isNaN(r) && r >= 0) {
        toast.classList.add("phone-toast-visible");
        pulseIsland("微信 · 新消息");
      } else {
        toast.classList.remove("phone-toast-visible");
      }
    });
    obs.observe(toast, { attributes: true, attributeFilter: ["style"] });
  }

  /* ========================================================================
     Watch DOM Mutations for newly spawned icons/windows
     ======================================================================== */
  function bindDesktopObservers() {
    var desktop = document.getElementById("desktop");
    if (desktop) {
      var dObs = new MutationObserver(function () {
        organizeHomeGrid();
        enhanceAppHeaders();
        syncChromeTheme();
      });
      dObs.observe(desktop, { childList: true, subtree: false });
    }

    var themeRaf = 0;
    function scheduleThemeSync() {
      if (themeRaf) return;
      themeRaf = requestAnimationFrame(function () {
        themeRaf = 0;
        polishAppInteriors();
        syncChromeTheme();
      });
    }
    var wObs = new MutationObserver(scheduleThemeSync);
    document.querySelectorAll(".window").forEach(function (w) {
      wObs.observe(w, { attributes: true, attributeFilter: ["style", "class"] });
    });
  }

  function initPhoneOS() {
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
    initStatusBarLoopMeta();

    // Wire Status Bar right -> Control Center
    var sbRight = document.getElementById("sb-right-trigger");
    if (sbRight) {
      sbRight.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleControlCenter();
      });
    }

    var ccBg = document.getElementById("phone-cc-backdrop");
    if (ccBg) ccBg.addEventListener("click", function () { toggleControlCenter(true); });
    var ccClose = document.getElementById("cc-close-btn");
    if (ccClose) ccClose.addEventListener("click", function () { toggleControlCenter(true); });

    // Control Center controls
    var muteTile = document.getElementById("cc-mute-tile");
    if (muteTile) muteTile.addEventListener("click", toggleMute);

    var brightInput = document.getElementById("cc-brightness");
    if (brightInput) {
      brightInput.addEventListener("input", function () {
        document.documentElement.style.setProperty("--phone-brightness", brightInput.value);
      });
    }

    var btnSettings = document.getElementById("cc-btn-settings");
    if (btnSettings) btnSettings.addEventListener("click", function () {
      toggleControlCenter(true);
      openSettingsMobile();
    });

    var btnLock = document.getElementById("cc-btn-lock");
    if (btnLock) btnLock.addEventListener("click", function () {
      window.location.href = "index.html";
    });

    var btnSleep = document.getElementById("cc-btn-sleep");
    if (btnSleep) btnSleep.addEventListener("click", function () {
      toggleControlCenter(true);
      var origSleep = document.getElementById("sm-power-sleep");
      if (origSleep) origSleep.click();
    });

    var btnReset = document.getElementById("cc-btn-reset");
    if (btnReset) btnReset.addEventListener("click", function () {
      toggleControlCenter(true);
      var origReset = document.getElementById("settings-reset-btn") || document.getElementById("sm-power-reset");
      if (origReset) origReset.click();
      else openSettingsMobile();
    });

    // Bottom Navigation Bar
    var navBack = document.getElementById("pnav-back");
    if (navBack) navBack.addEventListener("click", function () { handleSmartBack(); });
    var navHome = document.getElementById("pnav-home");
    if (navHome) navHome.addEventListener("click", goHome);
    var navSwitch = document.getElementById("pnav-switch");
    if (navSwitch) navSwitch.addEventListener("click", openSwitcher);

    // iOS Home Indicator swipe-up gesture (swipe up = Home, long swipe / double-tap = Switcher)
    if (navHome) {
      var hbStartY = null;
      navHome.addEventListener("pointerdown", function (e) { hbStartY = e.clientY; });
      navHome.addEventListener("pointerup", function (e) {
        if (hbStartY !== null) {
          var dy = e.clientY - hbStartY;
          hbStartY = null;
          if (dy < -24) { goHome(); return; }
        }
      });
    }
    var searchPill = document.getElementById("ios-search-pill");
    if (searchPill) {
      searchPill.addEventListener("click", function () {
        var searchIcon = document.getElementById("icon-search");
        if (searchIcon && searchIcon.style.display !== "none" && typeof window.requestOpenApp === "function") {
          window.requestOpenApp("search");
        } else {
          toggleControlCenter();
        }
      });
    }


    var psClear = document.getElementById("ps-clear-all");
    if (psClear) psClear.addEventListener("click", function () {
      document.querySelectorAll(".window").forEach(function (w) {
        if (window.getComputedStyle(w).display !== "none") {
          var cb = w.querySelector(":scope > .title-bar .btn-close");
          if (cb) cb.click(); else w.style.display = "none";
        }
      });
      var sw = document.getElementById("phone-switcher");
      if (sw) sw.classList.remove("open");
      setTimeout(syncChromeTheme, 40);
    });

    // Dock shortcuts
    document.querySelectorAll("#phone-dock .dock-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var appId = btn.getAttribute("data-dock-app");
        if (!appId) return;
        if (appId === "settings") {
          openSettingsMobile();
        } else if (typeof window.requestOpenApp === "function") {
          window.requestOpenApp(appId);
        } else if (typeof window.openApp === "function") {
          window.openApp(appId);
        }
        setTimeout(syncChromeTheme, 60);
      });
    });

    // Home Widget click -> open Control Center or pulse island
    var hw = document.getElementById("phone-home-widget");
    if (hw) hw.addEventListener("click", function () {
      pulseIsland(isZ3 ? "无网络连接" : "iPhone · 正常");
    });

    organizeHomeGrid();
    enhanceAppHeaders();
    polishAppInteriors();
    bindToastObserver();
    bindDesktopObservers();
    ensurePuzzleLayer();
    startPuzzleWatch();
    syncChromeTheme();

    // Re-sync after main.js finishes async init
    setTimeout(function () {
      organizeHomeGrid();
      enhanceAppHeaders();
      polishAppInteriors();
      ensurePuzzleLayer();
      syncChromeTheme();
    }, 350);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPhoneOS);
  } else {
    initPhoneOS();
  }
})();
