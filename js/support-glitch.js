(function() {
    "use strict";
    var main = document.querySelector("main");
    if (!main) return;
    var SIMP = "为会个众优伤价仅单卫厂历压厅双发变台号叶吗员团园图国圣场坏块坚报备复头夹夺奋学实宽对导尔尘层属岁岛币师帮带帐干广库应庆废开异弃张归当录彻忆忧怀态总恋恶惊惧惨愿战户扫扬执扩担拟择挂挥损换据掷断时显晓术机杀权条来极构枪标树档样检楼欢欧残毁气汉汤沟没泪洁济浅测涂润渐温满滚滤灭灯灵炉点烦热爱牵状独献环现电画疗监盘众睁矫码确础礼祸离种积称稳穷窃竞笔简类紧纠红纪纯纲纳纸级线练组细织终经绍结绕络给统继续维绿缓编缘缩网罗罚义习联声职聪肃肠脑脸舰艺节苏药荐获华蓝虑虚虽蚀补装见观规视览觉计订认讨让训议记讲许论设访证评识诉词试诗询该详语误说请诸读课谁调谈谢谱贝负财责败货质贴费资赛赞赶车轨转轮软载较辑输辞边达迁过运还这进远违连迟选逊递适邮郑释里钟钥铁银链销锁错键镜长门闪问闭间闻阅阳阴队险难雾静韩页顶项顺须预领频题颜风飞饰饱馈驱验骗鱼鲜鸟鸡黄齿龙";
    var TRAD = "為會個眾優傷價僅單衛廠歷壓廳雙發變臺號葉嗎員團園圖國聖場壞塊堅報備複頭夾奪奮學實寬對導爾塵層屬歲島幣師幫帶帳幹廣庫應慶廢開異棄張歸當錄徹憶憂懷態總戀惡驚懼慘願戰戶掃揚執擴擔擬擇掛揮損換據擲斷時顯曉術機殺權條來極構槍標樹檔樣檢樓歡歐殘毀氣漢湯溝沒淚潔濟淺測塗潤漸溫滿滾濾滅燈靈爐點煩熱愛牽狀獨獻環現電畫療監盤眾睜矯碼確礎禮禍離種積稱穩窮竊競筆簡類緊糾紅紀純綱納紙級線練組細織終經紹結繞絡給統繼續維綠緩編緣縮網羅罰義習聯聲職聰肅腸腦臉艦藝節蘇藥薦獲華藍慮虛雖蝕補裝見觀規視覽覺計訂認討讓訓議記講許論設訪證評識訴詞試詩詢該詳語誤說請諸讀課誰調談謝譜貝負財責敗貨質貼費資賽贊趕車軌轉輪軟載較輯輸辭邊達遷過運還這進遠違連遲選遜遞適郵鄭釋裡鐘鑰鐵銀鏈銷鎖錯鍵鏡長門閃問閉間聞閱陽陰隊險難霧靜韓頁頂項順須預領頻題顏風飛飾飽饋驅驗騙魚鮮鳥雞黃齒龍";
    var t2s = {};
    for (var i = 0; i < SIMP.length; i++) t2s[SIMP[i]] = TRAD[i];
    var RARE = "龘齾爩麤鱻靐龗厵灪淼犇骉飝龖鑫掱舙嚚譶馫朤惢矗掤孨屮兲冚巭嘦覅嫑烎兾氼忈忊恏龸罒灬爻亖亗麷鞻鑾鸓鼺齺龏龑龒龓龔龕屍殭蠱魑魅魍魎冥殤慟慘慄懼憾噬齧齜齦齬齪齷齲黷黶黰黲黯黤黬鬱鬮鸇鸏鸘鸙齉齾龏彧彣彳亍匚匸卩厶夂夊宀寸尢尣屮巛幺廴彐彡彳忄扌氵灬爫牜犭疒癶罒罓耂虍衤覀訁豸釒镸阝隹韋頁髟鬥鬯鬲鬼".split("");
    var STAY = "留下来";
    function pick(arr, r) {
        return arr[Math.floor(r * arr.length) % arr.length];
    }
    function seeded(seed) {
        var s = seed >>> 0;
        return function() {
            s = s * 1664525 + 1013904223 >>> 0;
            return s / 4294967296;
        };
    }
    function corruptText(text, t, rnd) {
        var pTrad = t < 0.16 ? 0 : Math.min(1, (t - 0.16) / 0.34);
        var pRare = t < 0.42 ? 0 : Math.min(1, (t - 0.42) / 0.36);
        var pStay = t < 0.66 ? 0 : Math.min(1, (t - 0.66) / 0.26);
        var pDup = t < 0.34 ? 0 : Math.min(0.34, (t - 0.34) * 0.5);
        var chars = Array.from(text);
        var out = [], stayIdx = 0;
        for (var i = 0; i < chars.length; i++) {
            var c = chars[i];
            if (!/[一-鿿]/.test(c)) {
                out.push(c);
                continue;
            }
            var r = rnd();
            if (r < pStay) {
                out.push(STAY[stayIdx++ % STAY.length]);
                continue;
            }
            if (r < pStay + pRare * (1 - pStay)) {
                out.push(pick(RARE, rnd()));
                continue;
            }
            if (r < pStay + pRare * (1 - pStay) + pTrad) {
                out.push(t2s[c] || c);
                continue;
            }
            out.push(c);
            if (pDup && rnd() < pDup * 0.22) {
                var n = 2 + Math.floor(rnd() * 2);
                var tail = out.slice(Math.max(0, out.length - n));
                out = out.concat(tail);
            }
        }
        return out.join("");
    }
    function replaceText(el, t, rnd) {
        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
        var nodes = [], n;
        while (n = walker.nextNode()) if (n.nodeValue.trim()) nodes.push(n);
        nodes.forEach(function(node) {
            var txt = corruptText(node.nodeValue, t, rnd);
            if (t < 0.45) {
                node.nodeValue = txt;
                return;
            }
            var frag = document.createDocumentFragment();
            var jitter = (t - 0.45) / 0.55;
            var cs = Array.from(txt);
            for (var i = 0; i < cs.length; i++) {
                var sp = document.createElement("span");
                sp.textContent = cs[i];
                sp.style.display = "inline-block";
                var dx = (rnd() - 0.5) * 14 * jitter;
                var dy = (rnd() - 0.5) * 22 * jitter;
                var rot = (rnd() - 0.5) * 6 * jitter;
                sp.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px) rotate(" + rot.toFixed(1) + "deg)";
                if (rnd() < jitter * 0.25) sp.style.fontWeight = "700";
                if (rnd() < jitter * 0.18) sp.style.opacity = (0.45 + rnd() * 0.4).toFixed(2);
                frag.appendChild(sp);
            }
            node.parentNode.replaceChild(frag, node);
        });
    }
    function corruptLayout(el, t) {
        var base = parseFloat(getComputedStyle(el).fontSize) || 15;
        el.style.fontSize = (base * (1 + Math.pow(t, 1.7) * 6.2)).toFixed(1) + "px";
        el.style.lineHeight = (1.75 - Math.pow(t, 1.1) * 1.32).toFixed(2);
        el.style.letterSpacing = (-Math.pow(t, 2) * 0.07).toFixed(3) + "em";
        el.style.color = "#000";
        if (t > 0.3) el.style.wordBreak = "break-all";
        if (t > 0.25) {
            var mono = el.querySelectorAll("code, kbd");
            for (var k = 0; k < mono.length; k++) {
                mono[k].style.fontSize = "inherit";
                mono[k].style.lineHeight = "inherit";
                if (t > 0.55) {
                    mono[k].style.background = "transparent";
                    mono[k].style.border = "none";
                }
            }
        }
        if (t > 0.5) el.style.marginBottom = (13 * (1 - t)).toFixed(0) + "px";
        if (t > 0.62) el.style.position = "relative";
        if (t > 0.62) el.style.zIndex = String(Math.floor(t * 20));
    }
    var hasRun = false;
    function run() {
        if (hasRun) return;
        hasRun = true;
        var blocks = main.querySelectorAll("h2, h3, p, li, .txt, .who, .when, .q");
        if (!blocks.length) return;
        var items = [];
        for (var i = 0; i < blocks.length; i++) {
            items.push({
                el: blocks[i],
                y: blocks[i].getBoundingClientRect().top + window.scrollY
            });
        }
        var minY = items[0].y;
        var maxY = items[items.length - 1].y;
        var span = Math.max(1, maxY - minY);
        var CLEAN = 0.38;
        items.forEach(function(it, idx) {
            var p = (it.y - minY) / span;
            if (p <= CLEAN) return;
            var t = (p - CLEAN) / (1 - CLEAN);
            t = Math.pow(t, 0.85);
            var rnd = seeded(1013 + idx * 7919);
            corruptLayout(it.el, t);
            replaceText(it.el, t, rnd);
        });
        document.documentElement.style.overflowX = "hidden";
        document.body.style.overflowX = "hidden";
    }
    if (document.readyState === "complete") setTimeout(run, 60); else window.addEventListener("load", function() {
        setTimeout(run, 60);
    });
})();
