(function initGoogleSearch() {
    const JMY_HOSPITAL_REPORT_3_ORIGINAL = "image/医院报告3.webp";
    const JMY_HOSPITAL_REPORT_3_CORRUPTED = "image/医院报告3.2.webp";
    function syncJmyHospitalReportState() {
        const isCorrupted = localStorage.getItem("win10_jmy_corrupted") === "true";
        const targetSrc = isCorrupted ? JMY_HOSPITAL_REPORT_3_CORRUPTED : JMY_HOSPITAL_REPORT_3_ORIGINAL;
        document.querySelectorAll('[data-jmy-hospital-report-page="3"]').forEach(image => {
            if (image.getAttribute("src") !== targetSrc) image.setAttribute("src", targetSrc);
        });
    }
    const GOOGLE_SEARCH_DB = [ {
        id: "jiangjianguo",
        matched: [ "江建国", "建国" ],
        results: [ {
            title: "江建国 - 明安区第七中学",
            url: "action:show-jiangjianguo",
            displayUrl: "mingan.edu.xyzz › 江建国",
            desc: "江建国，男，1971年生，明安区本地人，中共党员，中学高级教师职称。1996年起任教于明安区第七中学历史教研组，长期承担初中及高中历史课程的教学工作，现兼任历史教研组备课组组长",
            favicon: "alphabet"
        }, {
            title: "江建国 检验报告查询明细 - 明安市第一人民医院",
            url: "action:show-hospital",
            displayUrl: "mingan-hospital.gov.xyzz › report › detail",
            desc: "明安市第一人民医院电子健康档案系统。姓名：江建国，性别：男。查看综合体检报告、门诊记录及相关检验结果（PDF格式下载）。",
            favicon: "map"
        } ]
    }, {
        id: "jiangmingyuan",
        matched: [ "江明远" ],
        exact: true,
        results: (() => {
            const isCorrupted = localStorage.getItem("win10_jmy_corrupted") === "true";
            return [ {
                title: "江明远 - 博客",
                url: "action:show-jiangmingyuan",
                displayUrl: "mingyuanbk.xyzz › 江明远",
                desc: "三年真的好快，感觉昨天才刚进校门。今天整理东西，翻出了好多以前的合影，突然就有点想哭了。",
                blurred: isCorrupted,
                favicon: "alphabet"
            } ];
        })()
    }, {
        id: "alphabet",
        matched: [ "字母表格", "字母表", "alphabet", "密码", "加密", "维吉尼亚", "维吉尼亚密码", "vigenere", "vigenère" ],
        results: [ {
            title: "维吉尼亚密码 - 维基百科，自由的百科全书",
            url: "action:show-vigenere",
            displayUrl: "zh.wikipedia.xyzz › wiki › 维吉尼亚密码",
            desc: "维吉尼亚密码（法语：Chiffre de Vigenère，英语：Vigenère cipher）是使用一系列凯撒密码组成密码字母表的加密算法，属于多表密码的一种简单形式。加密时需要一个关键词（密钥），依照密钥字母对明文逐位移位……",
            favicon: "wiki"
        }, {
            title: "英文字母表 A-Z 完整发音与书写教学",
            url: "action:show-english",
            displayUrl: "english-learning.xyzz › alphabet",
            desc: "包含26个英文字母的大小写标准书写规范、美式/英式发音音频，以及配套的少儿英语启蒙顺口溜。",
            favicon: "book"
        }, {
            title: "ASCII码对照表 - 26个英文字母数值",
            url: "tools/ascii-table",
            displayUrl: "dev-tools.xyzz › ascii",
            desc: "提供英文字母 A-Z 与数字的对应表：A=0、B=1、C=2 …… 一直到 Z=25。常用于把一串数字，按字母表“翻”回单词。",
            favicon: "alphabet"
        } ]
    }, {
        id: "answer",
        matched: [ "答案", "真相", "发生了什么", "怎么了", "秘密", "兔子先生", "兔兔先生", "answer", "truth", "为什么", "失踪", "消失", "忘记", "遗忘", "记忆" ],
        results: [ {
            title: "《兔子先生》动画停播原因 — 官方说明 - 滋哩滋哩",
            url: "action:show-zilizili-rabbit",
            displayUrl: "ZiliZili.xyzz › read › 兔子先生停播说明",
            desc: "《兔子先生》已于2020年6月起暂停更新。该动画讲述了一只可爱的兔子的动画故事。停播原因官方未作说明。与之相关内容已从平台下架。有的人电脑上也许还有该动画片的记录。",
            favicon: "bili"
        }, {
            title: "为什么人会选择性遗忘？防御性遗忘机制解析 - 芝乎",
            url: "zhihu.xyzz/question/defensive-forgetting-mechanism",
            displayUrl: "www.zhihu.xyzz › question › 遗忘机制",
            desc: "防御性遗忘是一种心理自我保护机制。当大脑判断某段记忆会造成持续的心理创伤时，会主动屏蔽相关信息的提取路径。这类遗忘往往在特定刺激（如气味、声音、场景）下突然被唤醒。",
            favicon: "zhihu"
        }, {
            title: "【科普】曼德拉效应：是谁篡改了我们的集体记忆？ - 滋哩滋哩",
            url: "action:show-zilizili-mandela",
            displayUrl: "ZiliZili.xyzz › video › 曼德拉效应",
            desc: "为什么成千上万的人会共同拥有一段根本不存在的记忆？比如从来没出过某部动画，大家却都记得主角的名字。是大脑的集体错乱，还是信息传播产生的认知偏差？本期视频为你解析。",
            favicon: "bili"
        } ]
    }, {
        id: "mingan",
        matched: [ "明安市", "明安", "明河", "mingan", "明安二中", "二中", "2018届", "明安2中", "明安第二中学", "贴吧", "毕业照", "椅子", "画画" ],
        results: [ {
            title: "明安市 - 维基百科，自由的百科全书",
            url: "action:show-wiki",
            displayUrl: "zh.wikipedia.xyzz › wiki › 明安市",
            desc: "明安市，简称「明」，位于中国东部地区，是一座兼具历史底蕴与现代活力的区域中心城市。全市总面积约5,812平方公里，下辖5个区、3个县及1个县级市。因城区最初位于明河两岸，且当地素有「崇文尚学、以德为明」的传统，故得名「明安」。",
            favicon: "wiki"
        }, {
            title: "明安第二中学 - 2018届毕业生名单公示",
            url: "action:show-school",
            displayUrl: "mingan2zx.edu.xyzz › graduates › 2018",
            desc: "明安第二中学2018届初中毕业生名单公示（初三6班，共48人）。公示期为2018年6月20日至6月26日。如对名单有异议，请以书面形式向学校教务处提出。",
            favicon: "map"
        }, {
            title: "有人还记得 2018 明安二中出的校刊吗？ - 芝乎",
            url: "action:show-zhihu",
            displayUrl: "www.zhihu.xyzz › question › 48160372",
            desc: "5 个回答 - 216 人关注。为什么里面会有一张椅子的图片？合着椅子也是校友吗？",
            favicon: "zhihu"
        } ]
    } ];
    const TRENDING = [ "字母表", "地图", "明安市", "密码", "纪念日", "失踪", "遗忘" ];
    const KEY_HISTORY = "win10_google_search_history";
    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem(KEY_HISTORY)) || [];
        } catch (e) {
            return [];
        }
    }
    function saveHistory(query) {
        if (!query || !query.trim()) return;
        let h = getHistory().filter(q => q !== query.trim());
        h.unshift(query.trim());
        if (h.length > 12) h = h.slice(0, 12);
        localStorage.setItem(KEY_HISTORY, JSON.stringify(h));
    }
    function getFaviconSVG(type) {
        const map = {
            map: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
            zhihu: `<svg width="14" height="14" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#056DE8"/><text x="4" y="17" fill="white" font-size="12" font-weight="bold" font-family="arial">芝</text></svg>`,
            baidu: `<svg width="14" height="14" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#2932E1"/><text x="4" y="17" fill="white" font-size="12" font-weight="bold" font-family="arial">百</text></svg>`,
            bili: `<svg width="14" height="14" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#FB7299"/><text x="5" y="17" fill="white" font-size="13" font-weight="bold" font-family="arial">Z</text></svg>`,
            alphabet: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20L12 4l6 16M9 12h6"/></svg>`,
            wiki: `<svg width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#fff" stroke="#c8ccd1" stroke-width="1"/><text x="12" y="16" fill="#54595d" font-size="13" font-weight="bold" font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">W</text></svg>`
        };
        return map[type] || `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`;
    }
    function renderDropdown(boxId, wrapperId, query, onSelect) {
        const box = document.getElementById(boxId);
        const wrapper = document.getElementById(wrapperId);
        if (!box) return;
        const history = getHistory();
        const qLow = (query || "").toLowerCase().trim();
        const hasQuery = qLow.length > 0;
        const histMatched = hasQuery ? history.filter(h => h.toLowerCase().includes(qLow)).slice(0, 5) : history.slice(0, 5);
        const trendFiltered = TRENDING.filter(t => (!hasQuery || t.toLowerCase().includes(qLow)) && !histMatched.includes(t)).slice(0, hasQuery ? 3 : 4);
        const totalItems = histMatched.length + trendFiltered.length;
        if (totalItems === 0 && hasQuery) {
            box.innerHTML = `\n                <div id="_gdrop_direct" style="display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;font-size:15px;color:#202124;"\n                    onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background=''">\n                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2" style="flex-shrink:0;"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>\n                    <span>${query}</span>\n                </div>`;
            box.querySelector("#_gdrop_direct").onclick = () => {
                closeDrop(boxId, wrapperId);
                onSelect(query);
            };
            openDrop(box, wrapper);
            return;
        }
        if (totalItems === 0) {
            closeDrop(boxId, wrapperId);
            return;
        }
        let html = "";
        if (histMatched.length > 0) {
            histMatched.forEach((item, i) => {
                const bold = hasQuery ? item.replace(new RegExp(`(${query})`, "gi"), "<strong>$1</strong>") : item;
                html += `\n                    <div data-gdrop-idx="${i}" style="display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;font-size:15px;color:#202124;"\n                        onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background=''">\n                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2" style="flex-shrink:0;"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>\n                        <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${bold}</span>\n                        <span style="font-size:11px; color:#bdc1c6; flex-shrink:0;">搜索历史</span>\n                    </div>`;
            });
        }
        if (histMatched.length > 0 && trendFiltered.length > 0) html += `<div style="height:1px; background:#f1f3f4; margin:4px 0;"></div>`;
        if (trendFiltered.length > 0) {
            if (!hasQuery) html += `<div style="padding:8px 16px 4px; font-size:12px; color:#70757a; font-weight:500; letter-spacing:.3px;">大家都在搜</div>`;
            trendFiltered.forEach((item, i) => {
                const bold = hasQuery ? item.replace(new RegExp(`(${query})`, "gi"), "<strong>$1</strong>") : item;
                html += `\n                    <div data-gdrop-trend="${i}" style="display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;font-size:15px;color:#202124;"\n                        onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background=''">\n                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="1.5" style="flex-shrink:0;"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>\n                        <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${bold}</span>\n                        ${!hasQuery ? `<span style="font-size:11px; color:#bdc1c6; flex-shrink:0;">热门</span>` : ""}\n                    </div>`;
            });
        }
        box.innerHTML = html;
        box.querySelectorAll("[data-gdrop-idx]").forEach((el, i) => {
            el.onclick = () => {
                closeDrop(boxId, wrapperId);
                onSelect(histMatched[i]);
            };
        });
        box.querySelectorAll("[data-gdrop-trend]").forEach((el, i) => {
            el.onclick = () => {
                closeDrop(boxId, wrapperId);
                onSelect(trendFiltered[i]);
            };
        });
        openDrop(box, wrapper);
    }
    function openDrop(box, wrapper) {
        if (box) {
            box.style.display = "block";
            box.style.borderTop = "none";
            box.style.boxShadow = "0 4px 6px rgba(32,33,36,.2)";
            box.style.marginTop = "-1px";
        }
        if (wrapper) {
            wrapper.style.borderRadius = "24px 24px 0 0";
            wrapper.style.borderBottomColor = "transparent";
            wrapper.style.boxShadow = "none";
        }
    }
    function closeDrop(boxId, wrapperId) {
        const box = document.getElementById(boxId);
        const wrapper = document.getElementById(wrapperId);
        if (box) {
            box.style.display = "none";
            box.style.marginTop = "0";
        }
        if (wrapper) {
            wrapper.style.borderRadius = "24px";
            wrapper.style.borderBottomColor = "#dfe1e5";
            wrapper.style.boxShadow = "0 1px 6px rgba(32,33,36,.1)";
        }
    }
    var GOOGLE_SUB_VIEWS = [ "google-alphabet-view", "google-vigenere-view", "google-jiangjianguo-view", "google-hospital-view", "google-jiangmingyuan-view", "google-wiki-view", "google-school-view", "google-zhihu-view", "google-english-view", "google-zilizili-view" ];
    var ZZ_LEAD_IN_MS = 1000;
    var ZZ_TAIL_MS = 1000;
    var ZZ_AUDIO_MS = 15444;
    var ZZ_TOTAL_MS = ZZ_LEAD_IN_MS + ZZ_AUDIO_MS + ZZ_TAIL_MS;
    var ZZ_ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 4.8v14.4L19 12 7.5 4.8Z"/></svg>';
    var ZZ_ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6.4" y="4.8" width="4" height="14.4" rx="1"/><rect x="13.6" y="4.8" width="4" height="14.4" rx="1"/></svg>';
    function zzFmt(ms) {
        var s = Math.max(0, Math.min(ZZ_TOTAL_MS, ms)) / 1000;
        var m = Math.floor(s / 60), r = Math.floor(s % 60);
        return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
    }
    function zzPaint(ms) {
        var fill = document.getElementById("zz-bar-fill");
        var time = document.getElementById("zz-time");
        if (fill) fill.style.width = (Math.min(1, ms / ZZ_TOTAL_MS) * 100).toFixed(2) + "%";
        if (time) time.textContent = zzFmt(ms) + " / " + zzFmt(ZZ_TOTAL_MS);
    }
    function zzSetPlayIcon(playing) {
        var btn = document.getElementById("zz-playbtn");
        if (btn) btn.innerHTML = playing ? ZZ_ICON_PAUSE : ZZ_ICON_PLAY;
    }
    function zzStopPlayback(resetToZero) {
        if (zzState.playRaf) {
            cancelAnimationFrame(zzState.playRaf);
            zzState.playRaf = 0;
        }
        zzState.playing = false;
        var a = document.getElementById("zz-audio");
        if (a) {
            try {
                a.pause();
                if (resetToZero) a.currentTime = 0;
            } catch (e) {}
        }
        zzSetPlayIcon(false);
        if (resetToZero) {
            zzState.elapsed = 0;
            zzPaint(0);
        }
    }
    function zzPlayAudioAt(ms) {
        var audio = document.getElementById("zz-audio");
        if (!audio || ms < ZZ_LEAD_IN_MS || ms >= ZZ_LEAD_IN_MS + ZZ_AUDIO_MS) return;
        try {
            audio.currentTime = Math.max(0, (ms - ZZ_LEAD_IN_MS) / 1000);
            var pr = audio.play();
            if (pr && pr.catch) pr.catch(function() {});
        } catch (e) {}
    }
    function zzStartPlayback() {
        var audio = document.getElementById("zz-audio");
        zzState.playing = true;
        zzSetPlayIcon(true);
        var base = zzState.elapsed || 0;
        var t0 = performance.now() - base;
        var soundAttempted = false;
        function ensureSound(ms) {
            if (soundAttempted || !audio || ms < ZZ_LEAD_IN_MS || ms >= ZZ_LEAD_IN_MS + ZZ_AUDIO_MS) return;
            soundAttempted = true;
            zzPlayAudioAt(ms);
        }
        ensureSound(base);
        function tick(now) {
            if (!zzState.playing) return;
            var ms = now - t0;
            zzState.elapsed = ms;
            if (ms >= ZZ_TOTAL_MS) {
                zzPaint(ZZ_TOTAL_MS);
                zzState.elapsed = ZZ_TOTAL_MS;
                zzStopPlayback(false);
                return;
            }
            ensureSound(ms);
            zzPaint(ms);
            zzState.playRaf = requestAnimationFrame(tick);
        }
        zzState.playRaf = requestAnimationFrame(tick);
    }
    function zzTogglePlayback() {
        if (zzState.playing) {
            zzState.playing = false;
            if (zzState.playRaf) {
                cancelAnimationFrame(zzState.playRaf);
                zzState.playRaf = 0;
            }
            var a = document.getElementById("zz-audio");
            if (a) {
                try {
                    a.pause();
                } catch (e) {}
            }
            zzSetPlayIcon(false);
        } else {
            if (zzState.elapsed >= ZZ_TOTAL_MS) zzState.elapsed = 0;
            if (zzState.suspended) {
                zzState.suspended = false;
                zzStartDanmaku();
            }
            zzStartPlayback();
        }
    }
    function zzBindPlayer() {
        var btn = document.getElementById("zz-playbtn");
        if (btn && !btn._zzBound) {
            btn._zzBound = true;
            btn.addEventListener("click", function(e) {
                e.stopPropagation();
                zzTogglePlayback();
            });
            btn.addEventListener("keydown", function(e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    zzTogglePlayback();
                }
            });
        }
        var player = document.getElementById("zz-player");
        if (player && !player._zzBound) {
            player._zzBound = true;
            player.addEventListener("click", function(e) {
                if (btn && (e.target === btn || btn.contains(e.target))) return;
                if (zzState.playing) zzPlayAudioAt(zzState.elapsed); else zzTogglePlayback();
            });
        }
    }
    function hideAllGoogleSubViews(keepId) {
        GOOGLE_SUB_VIEWS.forEach(function(id) {
            if (id === keepId) return;
            var v = document.getElementById(id);
            if (v) v.style.display = "none";
        });
        if (keepId !== "google-zilizili-view") zzSuspendMedia(true);
    }
    function ensureGoogleView(id) {
        if (document.getElementById(id)) return true;
        var host = document.getElementById("google-scroll-area") || document.getElementById("win-google") || document.body;
        if (host && !document.getElementById("google-stale-tip")) {
            var tip = document.createElement("div");
            tip.id = "google-stale-tip";
            tip.style.cssText = "position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);" + "z-index:99;max-width:340px;padding:18px 22px;border-radius:10px;text-align:center;" + "background:#fff;border:1px solid #dfe1e5;box-shadow:0 2px 12px rgba(32,33,36,.18);" + 'font-family:"Microsoft YaHei","PingFang SC",sans-serif;font-size:14px;color:#3c4043;line-height:1.8;';
            tip.innerHTML = "这个页面没能加载出来<br>" + '<span style="font-size:12.5px;color:#70757a;">多半是浏览器还留着旧版本的缓存</span>' + '<br><br><button type="button" style="padding:7px 20px;border:0;border-radius:6px;' + 'background:#1a73e8;color:#fff;font-size:13px;cursor:pointer;">刷新一下</button>';
            tip.querySelector("button").addEventListener("click", function() {
                location.reload();
            });
            if (getComputedStyle(host).position === "static") host.style.position = "relative";
            host.appendChild(tip);
        }
        console.warn("[ningning] 缺少视图元素 #" + id + "：页面 HTML 和 js 版本不一致，需要刷新");
        return false;
    }
    var ZILIZILI_VIDEOS = {
        rabbit: {
            title: "【官方】《兔子先生》停播说明",
            play: "79.3万",
            date: "2020-06-13 22:59:02",
            addr: "ZiliZili.xyzz/video/BV1Rb411c7Tu",
            up: {
                name: "user8823041",
                sign: "这个人很懒，什么都没有留下",
                fans: "42.6万"
            },
            stats: {
                like: "1.2万",
                fav: "4698",
                share: "774"
            },
            top: [ "前排", "为什么停播了？？", "每年今天都来看一次" ],
            danmaku: [ "啊？怎么突然就停了", "我小时候超爱看这个", "官方一句解释都没有吗", "我记得片尾曲特别好听", "求资源啊啊啊", "网盘里还留着几集", "这动画我表妹以前天天追", "突然想起来搜一下 结果全没了", "下架得太干净了吧", "有生之年系列", "补档呢补档呢", "现在的小孩都不知道这个了", "泪目", "谁还记得那只兔子叫什么来着", "童年+1", "意难平", "哭死我了", "所以到底为什么停啊", "我妈还说我小时候看这个看到不肯睡觉", "刚搜到就没了 什么运气", "2020年了还有人看吗", "有一说一片头做得是真好", "当年守着电视等更新的举手", "这就是童年吧", "一整个青春没了", "评论区怎么也关了", "就没有一个人存档吗", "我找了好久了", "连百科词条都空了一半", "心里空落落的", "再也回不去了" ]
        },
        mandela: {
            title: "【科普】曼德拉效应：是谁篡改了我们的集体记忆？",
            play: "18.7万",
            date: "2020-05-30 20:14:36",
            addr: "ZiliZili.xyzz/video/BV1xK4y1P7zQ",
            up: {
                name: "user1170526",
                sign: "这个人很懒，什么都没有留下",
                fans: "1.2万"
            },
            stats: {
                like: "3821",
                fav: "1976",
                share: "402"
            },
            top: [ "沙发", "这期干货很足" ],
            danmaku: [ "讲得挺清楚的", "我一直以为是那样的", "集体记忆真的很神奇", "这期质量不错", "有没有人跟我一样", "大脑真是不靠谱", "科普向支持", "已三连", "想起小时候一个动画 现在怎么都搜不到", "讲讲皮卡丘尾巴那个", "好家伙 我记忆全是错的", "视频没了？", "怎么打不开啊", "刚看到一半就失效了", "前面的兄弟 我这边也放不出来", "资料翻得挺细的", "所以是记忆出错还是被改了", "有点细思极恐", "收藏了慢慢看", "这up讲话好听", "课代表呢", "我和我朋友记的完全不一样" ]
        }
    };
    var zzState = {
        key: null,
        timer: null,
        nodes: [],
        lane: 0,
        timeouts: [],
        playRaf: 0,
        playing: false,
        elapsed: 0,
        suspended: false
    };
    function zzSchedule(fn, delay) {
        var id = setTimeout(function() {
            var index = zzState.timeouts.indexOf(id);
            if (index > -1) zzState.timeouts.splice(index, 1);
            fn();
        }, delay);
        zzState.timeouts.push(id);
        return id;
    }
    function zzClearDanmaku() {
        if (zzState.timer) {
            clearInterval(zzState.timer);
            zzState.timer = null;
        }
        zzState.timeouts.forEach(clearTimeout);
        zzState.timeouts = [];
        zzState.nodes.forEach(function(n) {
            if (n && n.parentNode) n.parentNode.removeChild(n);
        });
        zzState.nodes = [];
    }
    function zzSuspendMedia(resetToZero) {
        zzClearDanmaku();
        zzStopPlayback(resetToZero);
        zzState.suspended = true;
    }
    window.stopGoogleMedia = function(resetToZero) {
        zzSuspendMedia(resetToZero !== false);
    };
    function zzSpawn(text) {
        var layer = document.getElementById("zz-dm-layer");
        if (!layer) return;
        var el = document.createElement("div");
        el.className = "zz-dm";
        el.textContent = text;
        el.style.top = "0px";
        layer.appendChild(el);
        zzState.nodes.push(el);
        var lineH = el.offsetHeight || 22;
        var lanes = Math.max(1, Math.floor(layer.offsetHeight / (lineH + 4)));
        el.style.top = zzState.lane % lanes * (lineH + 4) + "px";
        zzState.lane++;
        var travel = layer.offsetWidth + el.offsetWidth + 20;
        var dur = 8000 + Math.random() * 4000;
        var start = null;
        function step(ts) {
            if (!start) start = ts;
            if (!el.parentNode) return;
            var p = (ts - start) / dur;
            if (p >= 1) {
                el.parentNode.removeChild(el);
                var i = zzState.nodes.indexOf(el);
                if (i > -1) zzState.nodes.splice(i, 1);
                return;
            }
            el.style.transform = "translateX(" + -travel * p + "px)";
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    function zzSpawnTop(text) {
        var host = document.getElementById("zz-dm-top");
        if (!host) return;
        var el = document.createElement("div");
        el.textContent = text;
        host.appendChild(el);
        zzState.nodes.push(el);
        requestAnimationFrame(function() {
            el.classList.add("in");
        });
        zzSchedule(function() {
            el.classList.remove("in");
            zzSchedule(function() {
                if (el.parentNode) el.parentNode.removeChild(el);
                var i = zzState.nodes.indexOf(el);
                if (i > -1) zzState.nodes.splice(i, 1);
            }, 400);
        }, 4000);
    }
    function zzStartDanmaku() {
        zzClearDanmaku();
        var conf = ZILIZILI_VIDEOS[zzState.key];
        if (!conf) return;
        var pool = conf.danmaku.slice();
        var i = 0;
        for (var k = 0; k < 3; k++) {
            (function(d) {
                zzSchedule(function() {
                    zzSpawn(pool[i++ % pool.length]);
                }, d);
            })(k * 700);
        }
        zzState.timer = setInterval(function() {
            zzSpawn(pool[i++ % pool.length]);
        }, 1500 + Math.random() * 900);
        (conf.top || []).forEach(function(t, n) {
            zzSchedule(function() {
                zzSpawnTop(t);
            }, 2500 + n * 6500);
        });
    }
    function zzRenderList() {
        var body = document.getElementById("zz-dmlist-body");
        var num = document.getElementById("zz-dmlist-n");
        var conf = ZILIZILI_VIDEOS[zzState.key];
        if (!body || !conf) return;
        var html = conf.danmaku.map(function(t, i) {
            var sec = Math.floor(i * 17 / conf.danmaku.length);
            var mm = "00:" + (sec < 10 ? "0" : "") + sec;
            return '<div class="zz-dmrow"><span class="tm">' + mm + '</span><span class="tx">' + t.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</span></div>";
        }).join("");
        body.innerHTML = html;
        if (num) num.textContent = "共 " + conf.danmaku.length + " 条";
    }
    window.showGoogleZilizili = function(key) {
        if (!ensureGoogleView("google-zilizili-view")) return;
        var conf = ZILIZILI_VIDEOS[key] || ZILIZILI_VIDEOS.rabbit;
        zzState.key = ZILIZILI_VIDEOS[key] ? key : "rabbit";
        zzState.lane = 0;
        document.getElementById("google-home-view").style.display = "none";
        document.getElementById("google-result-view").style.display = "none";
        hideAllGoogleSubViews("google-zilizili-view");
        var view = document.getElementById("google-zilizili-view");
        view.style.display = "block";
        var set = function(id, text) {
            var e = document.getElementById(id);
            if (e) e.textContent = text;
        };
        set("zz-title", conf.title);
        set("zz-play", conf.play);
        set("zz-dmcount", String(conf.danmaku.length));
        set("zz-date", conf.date);
        set("zz-up-name", conf.up.name);
        set("zz-up-sign", conf.up.sign);
        set("zz-up-fans", conf.up.fans || "0");
        set("zz-like", conf.stats.like);
        set("zz-fav", conf.stats.fav);
        set("zz-share", conf.stats.share);
        zzRenderList();
        document.getElementById("google-address-text").innerText = conf.addr;
        var backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "1";
            backBtn.style.cursor = "pointer";
        }
        var scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
        zzBindPlayer();
        zzStopPlayback(true);
        zzState.suspended = false;
        zzStartDanmaku();
        zzStartPlayback();
    };
    function buildLoadFailedNotice() {
        var box = document.createElement("div");
        box.className = "google-more-failed";
        box.style.cssText = "max-width:680px;margin:4px 0 30px;padding:18px 0 4px;" + "border-top:1px solid #ebebeb;text-align:center;" + 'font-family:arial,"Microsoft YaHei","PingFang SC",sans-serif;' + "font-size:12.5px;color:#9aa0a6;line-height:1.9;";
        box.textContent = "似乎无法加载出更多内容";
        return box;
    }
    window.showGoogleHome = function() {
        var stale = document.getElementById("google-stale-tip");
        if (stale) stale.remove();
        const homeView = document.getElementById("google-home-view");
        const resultView = document.getElementById("google-result-view");
        const alphabetView = document.getElementById("google-alphabet-view");
        const navBar = document.getElementById("google-nav-bar");
        const footer = document.getElementById("google-footer");
        const homeInput = document.getElementById("google-home-input");
        const navInput = document.getElementById("google-nav-input");
        const jjView = document.getElementById("google-jiangjianguo-view");
        const hospView = document.getElementById("google-hospital-view");
        const jmyView = document.getElementById("google-jiangmingyuan-view");
        if (jmyView) jmyView.style.display = "none";
        hideAllGoogleSubViews();
        const vgView = document.getElementById("google-vigenere-view");
        if (vgView) vgView.style.display = "none";
        if (hospView) hospView.style.display = "none";
        if (homeView) homeView.style.display = "flex";
        if (resultView) resultView.style.display = "none";
        if (alphabetView) alphabetView.style.display = "none";
        if (navBar) navBar.style.display = "none";
        if (footer) footer.style.display = "flex";
        if (jjView) jjView.style.display = "none";
        const backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "0.35";
            backBtn.style.cursor = "default";
        }
        closeDrop("google-home-suggest-box", "google-home-search-wrapper");
        closeDrop("google-nav-suggest-box", "google-nav-search-wrapper");
        if (navInput) navInput.value = "";
        const scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
        if (homeInput) {
            homeInput.value = "";
            setTimeout(() => {
                homeInput.focus();
                renderDropdown("google-home-suggest-box", "google-home-search-wrapper", "", performGoogleSearch);
            }, 60);
        }
    };
    window.showGoogleAlphabet = function() {
        if (!ensureGoogleView("google-alphabet-view")) return;
        document.getElementById("google-home-view").style.display = "none";
        document.getElementById("google-result-view").style.display = "none";
        hideAllGoogleSubViews("google-alphabet-view");
        document.getElementById("google-alphabet-view").style.display = "flex";
        document.getElementById("google-address-text").innerText = "alphabet.xyzz/a-z-mapping-table";
        const backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "1";
            backBtn.style.cursor = "pointer";
        }
        const scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
    };
    window.showGoogleVigenere = function() {
        if (!ensureGoogleView("google-vigenere-view")) return;
        document.getElementById("google-home-view").style.display = "none";
        document.getElementById("google-result-view").style.display = "none";
        hideAllGoogleSubViews("google-vigenere-view");
        document.getElementById("google-vigenere-view").style.display = "block";
        document.getElementById("google-address-text").innerText = "zh.wikipedia.xyzz/wiki/维吉尼亚密码";
        const backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "1";
            backBtn.style.cursor = "pointer";
        }
        const scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
    };
    window.verifyHospitalAuth = function() {
        const pwdInput = document.getElementById("hospital-pwd-input");
        const errTip = document.getElementById("hospital-pwd-error");
        if (!pwdInput) return;
        if (pwdInput.value === "jianguo0527") {
            if (errTip) errTip.style.display = "none";
            const authView = document.getElementById("hospital-auth-view");
            if (authView) authView.style.display = "none";
            localStorage.setItem("win10_hosp_auth", "true");
        } else {
            if (errTip) errTip.style.display = "block";
            pwdInput.value = "";
            pwdInput.focus();
        }
    };
    window.showGoogleHospital = function() {
        if (!ensureGoogleView("google-hospital-view")) return;
        document.getElementById("google-home-view").style.display = "none";
        document.getElementById("google-result-view").style.display = "none";
        hideAllGoogleSubViews("google-hospital-view");
        document.getElementById("google-hospital-view").style.display = "flex";
        document.getElementById("google-address-text").innerText = "mingan-hospital.gov.xyzz/report/detail";
        const hospAuthView = document.getElementById("hospital-auth-view");
        if (hospAuthView) {
            hospAuthView.style.display = localStorage.getItem("win10_hosp_auth") === "true" ? "none" : "flex";
        }
        const backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "1";
            backBtn.style.cursor = "pointer";
        }
        const scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
    };
    const SCHOOL_ROSTER_6 = [ "王萱", "胡静", "宋然心", "崔婉", "秦心", "钟洁", "魏伟俊", "汤雯诗", "袁晨", "郭欣", "石宇博", "周佳月", "胡萱", "薛宇嘉", "杨紫", "姜航", "江明远", "陈承远", "范梓晴", "林阳", "高舟野", "胡野航", "白明野", "范宸", "谭若婉", "邹航", "郝深建", "余阳睿", "赵梓", "何承", "邵彤", "胡志野", "夏萱", "何若然", "徐风宁", "何希馨", "钟浩远", "周清欣", "于思临", "任佩", "石宇俊", "邹楷", "周一野", "任浩白", "方清", "姚远伟", "姜川俊", "钟川天" ];
    function renderSchoolRoster() {
        const grid = document.getElementById("sc-roster-grid");
        const head = document.getElementById("sc-roster-h");
        if (!grid) return;
        if (head) head.textContent = `初三（6）班　班主任：张雅雯　应届毕业 ${SCHOOL_ROSTER_6.length} 人`;
        grid.innerHTML = SCHOOL_ROSTER_6.map(function(n, i) {
            const blurred = n === "江明远";
            return '<div class="sc-cell' + (blurred ? " void" : "") + '">' + "<i>" + (i + 1) + "</i><b>" + n + "</b></div>";
        }).join("");
    }
    window.showGoogleSchool = function() {
        if (!ensureGoogleView("google-school-view")) return;
        document.getElementById("google-home-view").style.display = "none";
        document.getElementById("google-result-view").style.display = "none";
        hideAllGoogleSubViews("google-school-view");
        var view = document.getElementById("google-school-view");
        if (view) view.style.display = "block";
        document.getElementById("google-address-text").innerText = "mingan2zx.edu.xyzz/graduates/2018";
        renderSchoolRoster();
        var backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "1";
            backBtn.style.cursor = "pointer";
        }
        var scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
    };
    window.showGoogleEnglish = function() {
        if (!ensureGoogleView("google-english-view")) return;
        document.getElementById("google-home-view").style.display = "none";
        document.getElementById("google-result-view").style.display = "none";
        hideAllGoogleSubViews("google-english-view");
        var view = document.getElementById("google-english-view");
        if (view) view.style.display = "block";
        document.getElementById("google-address-text").innerText = "english-learning.xyzz/learn/english/alphabet-a-z";
        var backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "1";
            backBtn.style.cursor = "pointer";
        }
        var scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
    };
    var zhQrDrawn = false;
    function drawZhihuQR() {
        if (zhQrDrawn) return;
        var cv = document.getElementById("zh-qr");
        if (!cv || !window.NingningQR) return;
        try {
            window.NingningQR.render(cv, "zhihu.xyzz/q/48160372", {
                size: 96,
                minModule: 3,
                quiet: 4
            });
            zhQrDrawn = true;
        } catch (e) {}
    }
    window.showGoogleZhihu = function() {
        if (!ensureGoogleView("google-zhihu-view")) return;
        document.getElementById("google-home-view").style.display = "none";
        document.getElementById("google-result-view").style.display = "none";
        hideAllGoogleSubViews("google-zhihu-view");
        var view = document.getElementById("google-zhihu-view");
        if (view) view.style.display = "block";
        document.getElementById("google-address-text").innerText = "www.zhihu.xyzz/question/48160372";
        drawZhihuQR();
        var folded = document.getElementById("zh-folded");
        var foldTxt = document.getElementById("zh-fold-txt");
        if (folded) folded.style.display = "none";
        if (foldTxt) foldTxt.textContent = "1 个回答被折叠（原因：内容质量低）";
        var backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "1";
            backBtn.style.cursor = "pointer";
        }
        var scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
    };
    window.showGoogleWiki = function() {
        if (!ensureGoogleView("google-wiki-view")) return;
        document.getElementById("google-home-view").style.display = "none";
        document.getElementById("google-result-view").style.display = "none";
        hideAllGoogleSubViews("google-wiki-view");
        var wikiView = document.getElementById("google-wiki-view");
        if (wikiView) wikiView.style.display = "block";
        document.getElementById("google-address-text").innerText = "zh.wikipedia.xyzz/wiki/明安市";
        var backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "1";
            backBtn.style.cursor = "pointer";
        }
        var scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
    };
    window.showGoogleJiangmingyuan = function() {
        if (!ensureGoogleView("google-jiangmingyuan-view")) return;
        document.getElementById("google-home-view").style.display = "none";
        document.getElementById("google-result-view").style.display = "none";
        hideAllGoogleSubViews("google-jiangmingyuan-view");
        const jmyView = document.getElementById("google-jiangmingyuan-view");
        if (jmyView) jmyView.style.display = "flex";
        document.getElementById("google-address-text").innerText = "jiangmingyuan.mingan2zx.edu.xyzz";
        const backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "1";
            backBtn.style.cursor = "pointer";
        }
        const scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
        const isCorrupted = localStorage.getItem("win10_jmy_corrupted") === "true";
        updateJmyBlogState(isCorrupted);
        if (!isCorrupted) {
            setTimeout(() => {
                const bsodAudio = new Audio("audio/windows-10-bsod-sound.mp3");
                bsodAudio.volume = 0;
                let finished = false;
                const finish = () => {
                    if (finished) return;
                    finished = true;
                    endJmyGlitchEffect();
                };
                bsodAudio.onended = finish;
                bsodAudio.onerror = finish;
                const GLITCH_MAX_MS = 3200;
                const kick = () => {
                    startJmyGlitchEffect();
                    setTimeout(finish, GLITCH_MAX_MS);
                };
                bsodAudio.play().then(() => {
                    setTimeout(() => {
                        bsodAudio.volume = 1.0;
                        kick();
                    }, 3000);
                }).catch(e => {
                    console.log("音频播放被拦截:", e);
                    setTimeout(kick, 3000);
                });
            }, 800);
        }
    };
    function updateJmyBlogState(isCorrupted) {
        const bgFilter = document.getElementById("jmy-bg-filter");
        const blogTitle = document.getElementById("jmy-blog-title");
        const postsContainer = document.getElementById("jmy-posts-container");
        const emptyState = document.getElementById("jmy-empty-state");
        const emptyText = document.getElementById("jmy-empty-text");
        const avatar = document.getElementById("jmy-avatar");
        const nameEl = document.getElementById("jmy-name");
        const bioEl = document.getElementById("jmy-bio");
        const popularList = document.getElementById("jmy-popular-list");
        const popularEmpty = document.getElementById("jmy-popular-empty");
        const tagCloud = document.getElementById("jmy-tag-cloud");
        const tagEmpty = document.getElementById("jmy-tag-empty");
        if (isCorrupted) {
            if (bgFilter) {
                bgFilter.style.background = "rgba(0, 0, 0, 0.6)";
                bgFilter.style.backdropFilter = "grayscale(100%)";
            }
            if (blogTitle) blogTitle.innerText = "个人博客";
            if (postsContainer) postsContainer.style.display = "none";
            if (emptyState) emptyState.style.display = "flex";
            if (emptyText) emptyText.innerText = "这里空空如也~";
            if (avatar) avatar.src = "image/user.png";
            if (nameEl) {
                nameEl.innerText = "此用户不存在";
                nameEl.style.color = "#999";
            }
            if (bioEl) bioEl.innerText = "这个人很懒，什么都没留下";
            if (popularList) popularList.style.display = "none";
            if (popularEmpty) popularEmpty.style.display = "block";
            if (tagCloud) tagCloud.style.display = "none";
            if (tagEmpty) tagEmpty.style.display = "block";
        } else {
            if (bgFilter) {
                bgFilter.style.background = "transparent";
                bgFilter.style.backdropFilter = "none";
            }
            if (blogTitle) blogTitle.innerText = "江明远的个人博客";
            if (postsContainer) postsContainer.style.display = "block";
            if (emptyState) emptyState.style.display = "none";
            if (avatar) avatar.src = "image/ming.webp";
            if (nameEl) {
                nameEl.innerText = "江明远";
                nameEl.style.color = "#333";
            }
            if (bioEl) bioEl.innerHTML = "热爱计算机与数字媒体<br>明安二中2018届毕业生";
            if (popularList) popularList.style.display = "flex";
            if (popularEmpty) popularEmpty.style.display = "none";
            if (tagCloud) tagCloud.style.display = "flex";
            if (tagEmpty) tagEmpty.style.display = "none";
        }
    }
    function startJmyGlitchEffect() {
        const style = document.createElement("style");
        style.id = "jmy-glitch-css";
        style.innerHTML = `\n        @keyframes creepingDread {\n            0%   { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }\n            48%  { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }\n            50%  { filter: brightness(0.6) contrast(1.5) sepia(1) hue-rotate(315deg); transform: translate(-2px, 2px) skew(1deg); }\n            52%  { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }\n            85%  { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }\n            87%  { filter: brightness(0.5) contrast(2.0) grayscale(0.8); transform: translate(3px, -1px) skew(-2deg); }\n            89%  { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }\n            100% { filter: brightness(0.8) contrast(1.2) grayscale(0.2); transform: translate(0,0); }\n        }\n\n        @keyframes cursedText {\n            0%, 100% { text-shadow: 2px 0 rgba(139,0,0,0.8), -2px 0 rgba(0,0,50,0.6); opacity: 0.9; transform: translate(0,0); }\n            25%      { text-shadow: -2px 0 rgba(139,0,0,0.8), 2px 0 rgba(0,0,50,0.6); opacity: 0.8; }\n            50%      { text-shadow: 2px 2px rgba(139,0,0,0.8), -2px -2px rgba(0,0,50,0.6); opacity: 1; }\n            75%      { text-shadow: none; opacity: 0.6; color: #500; transform: translate(-1px, 1px); }\n            95%      { color: #8b0000; transform: translate(1px, -1px); }\n        }\n\n        @keyframes cursedImgFlicker {\n            0%, 100% { filter: grayscale(0.9) contrast(1.8) brightness(0.6); transform: scale(1) rotate(calc(var(--r,0) * 1deg)); }\n            10%      { filter: grayscale(1) contrast(2.5) brightness(0.8); transform: scale(1.02) rotate(calc(var(--r,0) * 1deg)); }\n            45%      { filter: sepia(1) hue-rotate(320deg) contrast(1.5) brightness(0.5) saturate(300%); }\n            47%      { filter: grayscale(0.9) contrast(1.8) brightness(0.6); }\n            80%      { filter: grayscale(0.8) contrast(2) brightness(0.4) invert(0.1); transform: scale(0.98) rotate(calc(var(--r,0) * 1deg)); }\n        }\n\n        @keyframes scanlines {\n            0%   { background-position: 0 0;     }\n            100% { background-position: 0 100px; }\n        }\n\n        @keyframes noisePulse {\n            0%,100% { opacity: 0.15; }\n            50%     { opacity: 0.25; }\n            80%     { opacity: 0.10; }\n        }\n\n        body *:not(#jmy-glitch-overlay):not(#jmy-glitch-scanlines):not(#jmy-glitch-removed-text):not(img):not(.jmy-ming-float) {\n            animation: cursedText 4s infinite !important;\n            font-size: calc(18px + 2.5vw) !important;\n            line-height: 0.55 !important;\n            font-weight: 900 !important;\n            font-family: 'Courier New', monospace !important;\n            color: #8b0000 !important;\n            background-color: transparent !important;\n            border: 1px dashed rgba(50, 50, 100, 0.4) !important;\n            border-radius: 0 !important;\n            position: static !important;\n            float: left !important;\n            display: inline-block !important;\n            width: auto !important;\n            height: auto !important;\n            max-width: none !important;\n            max-height: none !important;\n            margin: -6px !important;\n            padding: 8px !important;\n            overflow: visible !important;\n            box-shadow: none !important;\n            letter-spacing: -4px !important;\n            word-break: break-all !important;\n            outline: none !important;\n            transition: none !important;\n            z-index: auto !important;\n            visibility: visible !important;\n            transform: rotate(calc(var(--r, 0) * 1deg)) !important;\n        }\n\n        img {\n            content: url('image/ming.webp') !important;\n            width: 90px !important;\n            height: 90px !important;\n            object-fit: cover !important;\n            display: inline-block !important;\n            float: none !important;\n            position: static !important;\n            mix-blend-mode: normal !important;\n            background: #000 !important;\n            border: 1px solid #333 !important;\n            outline: none !important;\n            box-shadow: 0 0 15px rgba(0,0,0,0.8) !important;\n            animation: cursedImgFlicker 3s infinite !important;\n            transform: rotate(calc(var(--r, 0) * 1deg)) !important;\n        }\n\n        .jmy-ming-float {\n            position: fixed !important;\n            object-fit: cover !important;\n            mix-blend-mode: normal !important;\n            background: #000 !important;\n            border: 1px solid rgba(139,0,0,0.5) !important;\n            box-shadow: 0 0 20px rgba(0,0,0,0.9), 0 0 10px rgba(139,0,0,0.4) !important;\n            outline: none !important;\n            pointer-events: none !important;\n            z-index: 9999998 !important;\n            float: none !important;\n            display: block !important;\n            animation: cursedImgFlicker 3s infinite !important;\n            transform: rotate(calc(var(--r, 0) * 1deg)) !important;\n        }\n\n        body {\n            background: #050505 !important;\n            animation: creepingDread 5s infinite !important;\n            overflow: hidden !important;\n        }\n        #jmy-glitch-overlay {\n            position: fixed !important;\n            top: 0 !important; left: 0 !important;\n            width: 100vw !important; height: 100vh !important;\n            pointer-events: none !important;\n            z-index: 9999995 !important;\n            background: radial-gradient(circle at center, transparent 30%, rgba(30,0,0,0.85) 100%) !important;\n            mix-blend-mode: multiply !important;\n            animation: none !important;\n            border: none !important;\n        }\n\n        #jmy-glitch-scanlines {\n            position: fixed !important;\n            top: 0 !important; left: 0 !important;\n            width: 100vw !important; height: 100vh !important;\n            pointer-events: none !important;\n            z-index: 9999996 !important;\n            background: repeating-linear-gradient(\n                to bottom,\n                transparent 0px,\n                transparent 2px,\n                rgba(0,0,0,0.3) 2px,\n                rgba(0,0,0,0.3) 4px\n            ) !important;\n            animation: scanlines 0.5s linear infinite, noisePulse 0.15s steps(1) infinite !important;\n            border: none !important;\n            mix-blend-mode: normal !important;\n        }\n\n        #jmy-glitch-removed-text {\n            position: fixed !important;\n            top: 50% !important;\n            left: 50% !important;\n            transform: translate(-50%, -50%) !important;\n            z-index: 9999999 !important;\n            font-size: 15vw !important;\n            font-family: 'Microsoft YaHei', '黑体', sans-serif !important;\n            font-weight: 900 !important;\n            color: #4a0000 !important;\n            white-space: nowrap !important;\n            letter-spacing: 2vw !important;\n            pointer-events: none !important;\n            text-shadow: 3px 3px 0 #000;\n            opacity: 0.8 !important;\n        }\n    `;
        document.head.appendChild(style);
        document.querySelectorAll("body *").forEach(el => {
            if (Math.random() > 0.5) {
                el.style.setProperty("--r", (Math.random() * 10 - 5).toString());
            }
            if (el.tagName === "IMG" && !el.classList.contains("jmy-ming-float")) {
                el.dataset.originalSrc = el.src;
                el.src = "image/ming.webp";
            }
        });
        const positions = [ [ 8, 10 ], [ 55, 5 ], [ 80, 15 ], [ 15, 55 ], [ 45, 60 ], [ 70, 45 ], [ 30, 80 ], [ 85, 70 ] ];
        positions.forEach(([top, left]) => {
            const f = document.createElement("img");
            f.className = "jmy-ming-float";
            f.src = "image/ming.webp";
            const size = 60 + Math.floor(Math.random() * 40);
            f.style.width = size + "px";
            f.style.height = size + "px";
            f.style.top = top + "vh";
            f.style.left = left + "vw";
            f.style.setProperty("--r", (Math.random() * 20 - 10).toString());
            document.body.appendChild(f);
        });
        const overlay = document.createElement("div");
        overlay.id = "jmy-glitch-overlay";
        document.body.appendChild(overlay);
        const scanlines = document.createElement("div");
        scanlines.id = "jmy-glitch-scanlines";
        document.body.appendChild(scanlines);
        const removedText = document.createElement("div");
        removedText.id = "jmy-glitch-removed-text";
        removedText.innerText = "";
        document.body.appendChild(removedText);
    }
    function endJmyGlitchEffect() {
        const style = document.getElementById("jmy-glitch-css");
        if (style) style.remove();
        const overlay = document.getElementById("jmy-glitch-overlay");
        if (overlay) overlay.remove();
        const scanlines = document.getElementById("jmy-glitch-scanlines");
        if (scanlines) scanlines.remove();
        const removedText = document.getElementById("jmy-glitch-removed-text");
        if (removedText) removedText.remove();
        document.querySelectorAll(".jmy-ming-float").forEach(el => el.remove());
        document.querySelectorAll("body *").forEach(el => {
            el.style.removeProperty("--r");
            el.style.removeProperty("--img-hue");
            if (el.tagName === "IMG" && el.dataset.originalSrc) {
                el.src = el.dataset.originalSrc;
                delete el.dataset.originalSrc;
            }
        });
        localStorage.setItem("win10_jmy_corrupted", "true");
        window.dispatchEvent(new Event("win10:jmy-corrupted"));
        updateJmyBlogState(true);
        const jmyEntry = GOOGLE_SEARCH_DB.find(item => item.id === "jiangmingyuan");
        if (jmyEntry) {
            jmyEntry.results[0].blurred = true;
        }
        const navInput = document.getElementById("google-nav-input");
        if (navInput && navInput.value) {
            performGoogleSearch(navInput.value);
            document.getElementById("google-result-view").style.display = "none";
            const jmyView = document.getElementById("google-jiangmingyuan-view");
            if (jmyView) jmyView.style.display = "flex";
        }
    }
    window.showGoogleJiangjianguo = function() {
        if (!ensureGoogleView("google-jiangjianguo-view")) return;
        document.getElementById("google-home-view").style.display = "none";
        document.getElementById("google-result-view").style.display = "none";
        hideAllGoogleSubViews("google-jiangjianguo-view");
        document.getElementById("google-jiangjianguo-view").style.display = "flex";
        document.getElementById("google-address-text").innerText = "mingan.edu.xyzz/teachers/jiangjianguo";
        const backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "1";
            backBtn.style.cursor = "pointer";
        }
        const scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
    };
    window.performGoogleSearch = function(query) {
        if (!query || !query.trim()) return;
        query = query.trim();
        saveHistory(query);
        const homeView = document.getElementById("google-home-view");
        const resultView = document.getElementById("google-result-view");
        const alphabetView = document.getElementById("google-alphabet-view");
        const navBar = document.getElementById("google-nav-bar");
        const footer = document.getElementById("google-footer");
        const navInput = document.getElementById("google-nav-input");
        const addrText = document.getElementById("google-address-text");
        const stats = document.getElementById("google-result-stats");
        const resultList = document.getElementById("google-result-list");
        const homeInput = document.getElementById("google-home-input");
        const hospView = document.getElementById("google-hospital-view");
        const jmyView = document.getElementById("google-jiangmingyuan-view");
        closeDrop("google-home-suggest-box", "google-home-search-wrapper");
        closeDrop("google-nav-suggest-box", "google-nav-search-wrapper");
        hideAllGoogleSubViews();
        if (homeView) homeView.style.display = "none";
        if (resultView) resultView.style.display = "block";
        if (navBar) navBar.style.display = "flex";
        if (footer) footer.style.display = "none";
        if (navInput) navInput.value = query;
        if (addrText) addrText.innerText = "www.google.com/search?q=" + encodeURIComponent(query);
        if (homeInput) homeInput.value = "";
        const backBtn = document.getElementById("google-back-btn");
        if (backBtn) {
            backBtn.style.opacity = "0.35";
            backBtn.style.cursor = "default";
        }
        const qLow = query.toLowerCase();
        let matched = null;
        for (const entry of GOOGLE_SEARCH_DB) {
            const hit = entry.matched.some(kw => {
                const k = kw.toLowerCase();
                return entry.exact ? qLow.includes(k) : qLow.includes(k) || k.includes(qLow);
            });
            if (hit) {
                matched = entry;
                break;
            }
        }
        if (!resultList) return;
        resultList.innerHTML = "";
        if (matched) {
            const count = (Math.floor(Math.random() * 90000000) + 10000000).toLocaleString();
            const sec = (Math.random() * 0.3 + 0.18).toFixed(2);
            if (stats) stats.innerHTML = `找到约 <strong style="color:#202124;">${count}</strong> 条结果（用时 ${sec} 秒）`;
            matched.results.forEach(r => {
                const div = document.createElement("div");
                div.style.cssText = "margin-bottom:32px; max-width:680px;";
                div.innerHTML = `\n                    <div class="google-result-entry-content" style="${r.blurred ? "filter:blur(4px);opacity:0.72;" : ""}">\n                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">\n                            <div style="width:18px;height:18px;background:#f8f9fa;border:1px solid #e8eaed;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${getFaviconSVG(r.favicon)}</div>\n                            <span style="font-size:13px;color:#202124;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${r.displayUrl}</span>\n                        </div>\n                        <a href="#" data-action="${r.url}" class="google-result-link" style="display:block;font-size:20px;color:#1a0dab;text-decoration:none;line-height:1.3;margin-bottom:5px;word-break:break-word;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">${r.title}</a>\n                        <div style="font-size:14px;color:#4d5156;line-height:1.58;word-break:break-word;">${r.desc}</div>\n                    </div>\n                `;
                resultList.appendChild(div);
            });
            resultList.appendChild(buildLoadFailedNotice());
        } else {
            if (stats) stats.innerHTML = "";
            resultList.innerHTML = `\n                <div style="padding:12px 0; max-width:680px;">\n                    <p style="font-size:16px;color:#202124;margin:0 0 16px;">找不到和您查询的"<strong>${query}</strong>"相符的内容。</p>\n                    <p style="font-size:14px;color:#5f6368;margin:0 0 6px;font-weight:500;">建议：</p>\n                    <ul style="font-size:14px;color:#5f6368;line-height:1.8;margin:0;padding-left:20px;">\n                        <li>请检查字词有无错别字。</li>\n                        <li>尝试使用其他关键词搜索。</li>\n                    </ul>\n                </div>`;
        }
        const scrollArea = document.getElementById("google-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
    };
    function bindEvents() {
        const homeInput = document.getElementById("google-home-input");
        const navInput = document.getElementById("google-nav-input");
        const searchBtn = document.getElementById("google-search-btn");
        const navIcon = document.getElementById("google-nav-search-icon");
        const resultList = document.getElementById("google-result-list");
        const backBtn = document.getElementById("google-back-btn");
        if (!homeInput) {
            setTimeout(bindEvents, 200);
            return;
        }
        const alphabetGrid = document.getElementById("google-alphabet-grid");
        if (alphabetGrid && alphabetGrid.innerHTML.trim() === "") {
            let gridHtml = "";
            for (let i = 0; i < 26; i++) {
                const letter = String.fromCharCode(65 + i);
                gridHtml += `\n                    <div style="background: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px 0; text-align: center; transition: 0.2s; cursor: default; box-shadow: 0 1px 2px rgba(0,0,0,0.02);"\n                         onmouseover="this.style.background='#f1f3f4';this.style.borderColor='#bdc1c6';this.style.transform='translateY(-2px)';"\n                         onmouseout="this.style.background='#fdfdfd';this.style.borderColor='#e0e0e0';this.style.transform='translateY(0)';">\n                        <div style="font-size: 20px; font-weight: bold; color: #1a73e8; margin-bottom: 2px;">${letter}</div>\n                        <div style="font-size: 15px; color: #5f6368; font-family: 'Consolas', monospace; font-weight: 500;">${i}</div>\n                    </div>\n                `;
            }
            alphabetGrid.innerHTML = gridHtml;
        }
        const vgSquare = document.getElementById("google-vigenere-square");
        if (vgSquare && vgSquare.innerHTML.trim() === "") {
            let t = '<table class="vg-square-table"><thead><tr><th class="vg-corner">+</th>';
            for (let j = 0; j < 26; j++) t += `<th>${String.fromCharCode(65 + j)}</th>`;
            t += "</tr></thead><tbody>";
            for (let i = 0; i < 26; i++) {
                t += `<tr><th class="vg-rowhead">${String.fromCharCode(65 + i)}</th>`;
                for (let j = 0; j < 26; j++) {
                    const c = String.fromCharCode(65 + (i + j) % 26);
                    const diag = i === j ? ' class="vg-diag"' : "";
                    t += `<td${diag}>${c}</td>`;
                }
                t += "</tr>";
            }
            t += "</tbody></table>";
            vgSquare.innerHTML = t;
        }
        if (resultList) {
            resultList.onclick = e => {
                const link = e.target.closest(".google-result-link");
                if (link) {
                    e.preventDefault();
                    const action = link.getAttribute("data-action");
                    if (action === "action:show-alphabet") {
                        showGoogleAlphabet();
                    } else if (action === "action:show-vigenere") {
                        showGoogleVigenere();
                    } else if (action === "action:show-jiangjianguo") {
                        showGoogleJiangjianguo();
                    } else if (action === "action:show-hospital") {
                        showGoogleHospital();
                    } else if (action === "action:show-wiki") {
                        showGoogleWiki();
                    } else if (action === "action:show-school") {
                        showGoogleSchool();
                    } else if (action === "action:show-zhihu") {
                        showGoogleZhihu();
                    } else if (action === "action:show-english") {
                        showGoogleEnglish();
                    } else if (action === "action:show-zilizili-rabbit") {
                        showGoogleZilizili("rabbit");
                    } else if (action === "action:show-zilizili-mandela") {
                        showGoogleZilizili("mandela");
                    } else if (action === "action:show-jiangmingyuan") {
                        showGoogleJiangmingyuan();
                    }
                }
            };
        }
        if (backBtn) {
            backBtn.onclick = () => {
                if (backBtn.style.cursor === "pointer") {
                    hideAllGoogleSubViews();
                    document.getElementById("google-result-view").style.display = "block";
                    const currentQuery = navInput ? navInput.value : "";
                    document.getElementById("google-address-text").innerText = "www.google.com/search?q=" + encodeURIComponent(currentQuery);
                    backBtn.style.opacity = "0.35";
                    backBtn.style.cursor = "default";
                }
            };
        }
        homeInput.addEventListener("focus", () => {
            renderDropdown("google-home-suggest-box", "google-home-search-wrapper", homeInput.value.trim(), performGoogleSearch);
        });
        homeInput.addEventListener("input", () => {
            renderDropdown("google-home-suggest-box", "google-home-search-wrapper", homeInput.value.trim(), performGoogleSearch);
        });
        homeInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                const q = homeInput.value.trim();
                if (q) performGoogleSearch(q); else closeDrop("google-home-suggest-box", "google-home-search-wrapper");
            }
            if (e.key === "Escape") closeDrop("google-home-suggest-box", "google-home-search-wrapper");
        });
        if (navInput) {
            navInput.addEventListener("focus", () => {
                renderDropdown("google-nav-suggest-box", "google-nav-search-wrapper", navInput.value.trim(), q => {
                    navInput.value = q;
                    performGoogleSearch(q);
                });
            });
            navInput.addEventListener("input", () => {
                renderDropdown("google-nav-suggest-box", "google-nav-search-wrapper", navInput.value.trim(), q => {
                    navInput.value = q;
                    performGoogleSearch(q);
                });
            });
            navInput.addEventListener("keydown", e => {
                if (e.key === "Enter") {
                    const q = navInput.value.trim();
                    if (q) performGoogleSearch(q);
                    closeDrop("google-nav-suggest-box", "google-nav-search-wrapper");
                }
                if (e.key === "Escape") closeDrop("google-nav-suggest-box", "google-nav-search-wrapper");
            });
        }
        if (searchBtn) searchBtn.onclick = () => {
            const q = homeInput.value.trim();
            if (q) performGoogleSearch(q);
        };
        if (navIcon) navIcon.onclick = () => {
            const q = navInput ? navInput.value.trim() : "";
            if (q) performGoogleSearch(q);
        };
        document.addEventListener("mousedown", e => {
            const homeBox = document.getElementById("google-home-suggest-box");
            const navBox = document.getElementById("google-nav-suggest-box");
            const homeWrap = document.getElementById("google-home-search-wrapper");
            const navWrap = document.getElementById("google-nav-search-wrapper");
            if (homeBox && homeBox.style.display !== "none") {
                if (!homeBox.contains(e.target) && !homeWrap.contains(e.target)) closeDrop("google-home-suggest-box", "google-home-search-wrapper");
            }
            if (navBox && navBox.style.display !== "none") {
                if (!navBox.contains(e.target) && navWrap && !navWrap.contains(e.target)) closeDrop("google-nav-suggest-box", "google-nav-search-wrapper");
            }
        });
    }
    const _origOpen = window.openApp;
    window.openApp = function(appId) {
        _origOpen(appId);
        if (appId === "google") {
            requestAnimationFrame(() => {
                if (typeof showGoogleHome === "function") showGoogleHome();
            });
        }
    };
    window.addEventListener("win10:jmy-corrupted", syncJmyHospitalReportState);
    function verifyMarkupVersion() {
        var required = [ "google-wiki-view", "google-school-view", "google-zhihu-view", "google-english-view", "google-zilizili-view" ];
        var missing = required.filter(function(id) {
            return !document.getElementById(id);
        });
        if (!missing.length) return true;
        var version = window.NINGNING_CACHE_VERSION || "unknown";
        var LOCK = "ningning_markup_selfheal";
        console.warn("[ningning] 页面缺少 " + missing.join("、") + "：HTML 比 js 旧");
        try {
            if (sessionStorage.getItem(LOCK) === version) return false;
            sessionStorage.setItem(LOCK, version);
        } catch (e) {
            return false;
        }
        location.reload();
        return false;
    }
    function initializeGoogleSearch() {
        verifyMarkupVersion();
        bindEvents();
        syncJmyHospitalReportState();
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeGoogleSearch);
    } else {
        initializeGoogleSearch();
    }
})();
