function startStaticEffect() {
    if (typeof window.stopDesktopVideoAudio === "function") window.stopDesktopVideoAudio();
    localStorage.setItem("win10_ending_reached", "true");
    localStorage.setItem("win10_ending_type", "1");
    const canvas = document.createElement("canvas");
    canvas.id = "static-canvas";
    canvas.style.cssText = `\n        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;\n        z-index: 999999; pointer-events: all; opacity: 0;\n        transition: opacity 1.5s ease-in;\n    `;
    document.body.appendChild(canvas);
    const blackBg = document.createElement("div");
    blackBg.style.cssText = `\n        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;\n        background: #000; z-index: 999998; pointer-events: all; opacity: 0;\n        transition: opacity 1.5s ease-in;\n    `;
    document.body.appendChild(blackBg);
    requestAnimationFrame(() => {
        canvas.style.opacity = "1";
        blackBg.style.opacity = "1";
    });
    const ctx = canvas.getContext("2d");
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    function drawStatic(intensity) {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const val = Math.random() < intensity ? 255 : 0;
            data[i] = val;
            data[i + 1] = val;
            data[i + 2] = val;
            data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
    }
    const buildDuration = 2500;
    const fadeDuration = 2000;
    const startTime = Date.now();
    let animFrame;
    function animateStatic() {
        const elapsed = Date.now() - startTime;
        if (elapsed < buildDuration) {
            const progress = elapsed / buildDuration;
            drawStatic(0.15 + progress * 0.85);
            animFrame = requestAnimationFrame(animateStatic);
        } else if (elapsed < buildDuration + fadeDuration) {
            if (canvas.style.transition !== "opacity 2s ease-in-out") {
                canvas.style.transition = "opacity 2s ease-in-out";
                canvas.style.opacity = "0";
            }
            drawStatic(1.0);
            animFrame = requestAnimationFrame(animateStatic);
        } else {
            cancelAnimationFrame(animFrame);
            window.removeEventListener("resize", resizeCanvas);
            canvas.remove();
            blackBg.remove();
            document.body.style.background = "#000";
            showEndingScreen(1);
        }
    }
    animateStatic();
}

function startEnding2Effect() {
    if (typeof window.stopDesktopVideoAudio === "function") window.stopDesktopVideoAudio();
    localStorage.setItem("win10_ending_reached", "true");
    localStorage.setItem("win10_ending_type", "2");
    const blackBg = document.createElement("div");
    blackBg.style.cssText = `\n        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;\n        background: #000; z-index: 999999; opacity: 0;\n        transition: opacity 3s ease-in-out; pointer-events: all;\n    `;
    document.body.appendChild(blackBg);
    requestAnimationFrame(() => {
        blackBg.style.opacity = "1";
    });
    setTimeout(() => {
        document.body.style.background = "#000";
        blackBg.remove();
        showEndingScreen(2);
    }, 3500);
}

function startEnding3Effect() {
    if (typeof window.stopDesktopVideoAudio === "function") window.stopDesktopVideoAudio();
    localStorage.setItem("win10_ending_reached", "true");
    localStorage.setItem("win10_ending_type", "3");
    const wake = document.createElement("div");
    wake.style.cssText = `\n        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;\n        background: #fff; z-index: 999999; opacity: 0; pointer-events: all;\n        transition: opacity 0.25s ease-out;\n    `;
    document.body.appendChild(wake);
    const blackBg = document.createElement("div");
    blackBg.style.cssText = `\n        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;\n        background: #000; z-index: 999998; opacity: 0; pointer-events: all;\n        transition: opacity 2.5s ease-in-out;\n    `;
    document.body.appendChild(blackBg);
    requestAnimationFrame(() => {
        blackBg.style.opacity = "1";
    });
    setTimeout(() => {
        wake.style.opacity = "1";
    }, 700);
    setTimeout(() => {
        wake.style.transition = "opacity 2.6s ease-in-out";
        wake.style.opacity = "0";
    }, 1050);
    setTimeout(() => {
        document.body.style.background = "#000";
        wake.remove();
        blackBg.remove();
        showEndingScreen(3);
    }, 3800);
}

function showEndingScreen(type = 1, skipIntro = false) {
    if (document.getElementById("ending-screen")) return;
    document.body.style.background = "#000";
    document.body.style.overflow = "hidden";
    if (!document.getElementById("ending-anim-style")) {
        const st = document.createElement("style");
        st.id = "ending-anim-style";
        st.textContent = `\n            #ending-message{scrollbar-width:thin;scrollbar-color:#333 transparent;}\n            #ending-message::-webkit-scrollbar{width:4px;}\n            #ending-message::-webkit-scrollbar-thumb{background:#333;border-radius:2px;}\n            #ending-message::-webkit-scrollbar-track{background:transparent;}\n        `;
        document.head.appendChild(st);
    }
    const endingDiv = document.createElement("div");
    endingDiv.id = "ending-screen";
    endingDiv.style.cssText = `\n        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;\n        background: #000; z-index: 999999; pointer-events: all; overflow: hidden;\n    `;
    const titleEl = document.createElement("div");
    titleEl.id = "ending-title";
    titleEl.style.cssText = `\n        position: absolute; top: clamp(20px, 6vh, 70px); left: 50%; transform: translateX(-50%);\n        font-family: 'SimSun', '宋体', serif; font-size: clamp(16px, 3vh, 24px);\n        letter-spacing: clamp(4px, 1.2vw, 12px); color: #e0e0e0;\n        text-shadow: 0 0 10px rgba(255, 255, 255, 0.2); opacity: 0;\n        transition: opacity 3s ease-in-out; user-select: none; white-space: nowrap; max-width: 96vw;\n    `;
    titleEl.textContent = type == 3 ? "True Ending ：我没有忘" : type == 1 ? "Bad Ending ：你和我" : "Open Ending ：无事发生";
    const msgWrap = document.createElement("div");
    msgWrap.id = "ending-msg-wrap";
    msgWrap.style.cssText = `\n        position: absolute; top: 0; left: 0; width: 100%; height: 100%;\n        display: flex; justify-content: center; align-items: center;\n        padding: clamp(64px, 13vh, 120px) 20px clamp(44px, 10vh, 80px);\n        box-sizing: border-box; overflow: hidden;\n    `;
    const msgEl = document.createElement("div");
    msgEl.id = "ending-message";
    msgEl.style.cssText = `\n        max-width: min(620px, 92vw); max-height: 100%; overflow-y: auto;\n        flex-shrink: 0; font-family: 'SimSun', '宋体', serif; font-size: 16px;\n        color: #b0b0b0; line-height: 2.1; letter-spacing: 3px; text-align: left;\n        text-shadow: 0 0 8px rgba(255, 255, 255, 0.1); opacity: 0;\n    `;
    msgWrap.appendChild(msgEl);
    const hintEl = document.createElement("div");
    hintEl.id = "ending-hint";
    hintEl.style.cssText = `\n        position: absolute; bottom: clamp(12px, 3.5vh, 30px); left: 0; width: 100%;\n        text-align: center; font-family: 'SimSun', '宋体', serif; font-size: 12px;\n        color: #5f5f5f; letter-spacing: 6px; opacity: 0;\n        transition: opacity 1.5s ease; user-select: none; pointer-events: none;\n    `;
    hintEl.textContent = "单击继续";
    const restartWrap = document.createElement("div");
    restartWrap.id = "ending-restart-wrap";
    restartWrap.style.cssText = `\n        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);\n        opacity: 0; transition: opacity 2.5s ease-in-out; pointer-events: none;\n        display: flex; flex-direction: column; align-items: center; gap: clamp(20px, 5vh, 40px);\n    `;
    const imgContainer = document.createElement("div");
    imgContainer.style.cssText = `position: relative; width: min(400px, 82vw, 53vh); aspect-ratio: 4 / 3;`;
    const customImg1 = document.createElement("img");
    customImg1.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; transition: opacity 2s ease-in-out;`;
    const customImg2 = document.createElement("img");
    customImg2.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; transition: opacity 2s ease-in-out;`;
    if (type == 1) {
        customImg1.src = "image/生日.webp";
        customImg2.src = "image/生日2.webp";
    } else if (type == 2) {
        customImg1.src = "image/小时候.webp";
        customImg2.style.display = "none";
    } else if (type == 3) {
        customImg1.src = "image/荡秋千.webp";
        customImg2.style.display = "none";
    }
    imgContainer.appendChild(customImg1);
    imgContainer.appendChild(customImg2);
    const btnHtml = `\n        <button id="ending-restart-btn" style="\n            background: transparent; border: 1px solid #444; color: #888;\n            font-size: 14px; letter-spacing: 5px; padding: 14px 40px;\n            cursor: pointer; font-family: 'SimSun', '宋体', serif;\n            transition: all 0.5s ease; outline: none;\n        ">重新开始</button>\n    `;
    restartWrap.innerHTML = btnHtml;
    restartWrap.prepend(imgContainer);
    endingDiv.appendChild(titleEl);
    endingDiv.appendChild(msgWrap);
    endingDiv.appendChild(hintEl);
    endingDiv.appendChild(restartWrap);
    document.body.appendChild(endingDiv);
    function revealRestart() {
        msgWrap.style.display = "none";
        hintEl.style.display = "none";
        restartWrap.style.opacity = "1";
        restartWrap.style.pointerEvents = "all";
        if (type == 1) {
            customImg1.style.opacity = "1";
            setTimeout(() => {
                customImg2.style.opacity = "1";
                customImg1.style.opacity = "0";
            }, 4500);
        } else if (type == 2) {
            customImg1.style.opacity = "1";
        } else if (type == 3) {
            customImg1.style.opacity = "1";
        }
        const btn = document.getElementById("ending-restart-btn");
        if (btn) {
            btn.onmouseenter = () => {
                btn.style.color = "#fff";
                btn.style.borderColor = "#aaa";
                btn.style.boxShadow = "0 0 15px rgba(255,255,255,0.1)";
            };
            btn.onmouseleave = () => {
                btn.style.color = "#888";
                btn.style.borderColor = "#444";
                btn.style.boxShadow = "none";
            };
            btn.onclick = () => {
                document.body.style.opacity = "0";
                document.body.style.transition = "opacity 1s ease";
                setTimeout(() => {
                    localStorage.clear();
                    window.location.replace("index.html");
                }, 1000);
            };
        }
    }
    if (skipIntro) {
        titleEl.style.transition = "none";
        titleEl.style.opacity = "1";
        revealRestart();
        return;
    }
    setTimeout(() => {
        titleEl.style.opacity = "1";
    }, 500);
    setTimeout(() => {
        const fullText = buildEndingMessage(type);
        renderEndingLines(msgEl, fullText);
        const refit = () => {
            fitEndingLayout(msgEl, msgWrap, fullText);
            if (hintEl.style.opacity === "0.55") {
                hintEl.textContent = msgEl.scrollHeight > msgEl.clientHeight + 4 ? "滚动回看 · 单击继续" : "单击继续";
            }
        };
        refit();
        window.addEventListener("resize", refit);
        let ro = null;
        if (typeof ResizeObserver === "function") {
            let first = true;
            ro = new ResizeObserver(() => {
                if (first) {
                    first = false;
                    return;
                }
                refit();
            });
            ro.observe(endingDiv);
        }
        presentEndingText(endingDiv, msgEl, hintEl, () => {
            window.removeEventListener("resize", refit);
            if (ro) ro.disconnect();
            msgWrap.style.transition = "opacity 1.2s ease";
            msgWrap.style.opacity = "0";
            setTimeout(() => {
                revealRestart();
            }, 1400);
        });
    }, 2800);
}

function renderEndingLines(msgEl, fullText) {
    msgEl.textContent = "";
    fullText.split("\n").forEach(line => {
        const div = document.createElement("div");
        div.textContent = line === "" ? " " : line;
        div.style.breakInside = "avoid";
        msgEl.appendChild(div);
    });
}

function fitEndingLayout(msgEl, msgWrap, fullText) {
    const steps = [ [ 18, 2.2 ], [ 17, 2.1 ], [ 16, 2.0 ], [ 15, 1.95 ], [ 14, 1.9 ], [ 13, 1.8 ], [ 12, 1.7 ] ];
    const GAP = 64;
    const LS = 3;
    const cs = getComputedStyle(msgWrap);
    const availH = msgWrap.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const availW = msgWrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const probe = msgEl.cloneNode(false);
    probe.removeAttribute("id");
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.maxHeight = "none";
    probe.style.maxWidth = "none";
    probe.style.overflowY = "visible";
    fullText.split("\n").forEach(line => {
        const d = document.createElement("div");
        d.textContent = line === "" ? " " : line;
        d.style.breakInside = "avoid";
        probe.appendChild(d);
    });
    msgWrap.appendChild(probe);
    function longestLineWidth(font) {
        probe.style.fontSize = font + "px";
        probe.style.whiteSpace = "nowrap";
        probe.style.width = "max-content";
        probe.style.columnCount = "auto";
        const w = probe.offsetWidth;
        probe.style.whiteSpace = "";
        probe.style.width = "";
        return w;
    }
    let chosen = null;
    outer: for (const [font, lh] of steps) {
        const colW = Math.min(longestLineWidth(font), Math.round(26 * (font + LS)));
        for (const cols of [ 1, 2 ]) {
            const blockW = cols * colW + (cols - 1) * GAP;
            if (blockW > availW) continue;
            probe.style.fontSize = font + "px";
            probe.style.lineHeight = String(lh);
            probe.style.width = blockW + "px";
            probe.style.columnCount = cols > 1 ? String(cols) : "auto";
            probe.style.columnGap = GAP + "px";
            if (probe.offsetHeight <= availH - 8) {
                chosen = {
                    font,
                    lh,
                    cols,
                    blockW
                };
                break outer;
            }
        }
    }
    if (!chosen) {
        const colW = Math.min(longestLineWidth(12), Math.round(26 * (12 + LS)), availW);
        chosen = {
            font: 12,
            lh: 1.7,
            cols: 1,
            blockW: colW
        };
    }
    probe.remove();
    msgEl.style.fontSize = chosen.font + "px";
    msgEl.style.lineHeight = String(chosen.lh);
    msgEl.style.width = chosen.blockW + "px";
    msgEl.style.maxWidth = "none";
    msgEl.style.columnCount = chosen.cols > 1 ? String(chosen.cols) : "auto";
    msgEl.style.columnGap = GAP + "px";
    msgEl.style.columnRule = chosen.cols > 1 ? "1px solid #222" : "none";
}

function presentEndingText(rootEl, msgEl, hintEl, onFinished) {
    let phase = "appearing";
    let clickGuardUntil = 0;
    let shownTimer = 0;
    msgEl.style.opacity = "0";
    msgEl.style.transform = "translateY(14px)";
    void msgEl.offsetWidth;
    msgEl.style.transition = "opacity 3s ease, transform 3.2s ease-out";
    msgEl.style.opacity = "1";
    msgEl.style.transform = "translateY(0)";
    shownTimer = setTimeout(enterWaiting, 3400);
    function enterWaiting() {
        if (phase !== "appearing") return;
        phase = "waiting";
        clearTimeout(shownTimer);
        clickGuardUntil = performance.now() + 600;
        hintEl.textContent = msgEl.scrollHeight > msgEl.clientHeight + 4 ? "滚动回看 · 单击继续" : "单击继续";
        hintEl.style.opacity = "0.55";
    }
    function onAdvance() {
        if (phase === "appearing") {
            msgEl.style.transition = "opacity 0.5s ease, transform 0.5s ease-out";
            msgEl.style.opacity = "1";
            msgEl.style.transform = "translateY(0)";
            enterWaiting();
        } else if (phase === "waiting") {
            if (performance.now() < clickGuardUntil) return;
            phase = "done";
            rootEl.removeEventListener("click", onAdvance);
            document.removeEventListener("keydown", onKey);
            hintEl.style.opacity = "0";
            if (typeof onFinished === "function") onFinished();
        }
    }
    function onKey(e) {
        if (e.code === "Space" || e.code === "Enter") {
            e.preventDefault();
            onAdvance();
        }
    }
    rootEl.addEventListener("click", onAdvance);
    document.addEventListener("keydown", onKey);
}

function buildEndingMessage(type) {
    if (type == 3) {
        return `奇怪的声音又出现了，\n学着哥哥说话的腔调，\n一遍又一遍地呼喊着我的名字。\n我屏住呼吸踮着脚，一点点靠近猫眼，\n门外忽然安静了下来。\n我贴近猫眼，向外望去\n猫眼外空无一人\n我刚松了一口气，\n门外却突然响起急促的敲门声\n但这一次，我并没有开门。`;
    }
    if (type == 2) {
        return `6月16日\n\n今天的风不冷，也不暖。\n我一个人在阳台上站了许久，\n看着天上的云朵慢慢地飘过。\n它们一会儿像小兔子，\n一会儿像大白熊，\n一会儿又变成了一座软绵绵的城堡。\n“唉，云朵到底是什么味道的呢？”\n“是甜甜的棉花糖味吗？”\n“是香香的蛋糕味？”\n“还是冰凉的牛奶味？”\n我想着\n直到身后传来妈妈的声音：\n“宁宁，吃饭啦”\n“好！”\n我跑到餐桌前，看见桌上摆着许多美味的食物\n有金黄的鸡蛋\n绿油油的青菜\n还有一碗热气腾腾的米饭\n妈妈夹了一块白白软软的豆腐放进我的碗里\n“快尝尝，这是你最喜欢吃的。”\n我轻轻咬了一口。\n豆腐软绵绵的,\n带着淡淡的香味。\n“我知道了！”\n“妈妈，我知道云朵是什么味道的了！”\n妈妈好奇地问：“是什么味道？”\n“云朵就是豆腐的味道！白白的，软软的，还带着妈妈做饭的香味！”\n哥哥听了，忍不住笑了起来。\n我也笑了。\n这时，窗外的云朵还在慢慢地飘着。\n我想，也许每个人心里的云朵，都有不一样的味道。\n而我心里的云朵，是幸福的味道。`;
    }
    return `宁宁睡着了。\n她最近总是睡得很晚。\n也时常一个人趴在窗边\n静静地望着远处的灯，\n一盏一盏的熄灭。\n她问我：“其他人都去哪儿了？”\n“睡着了。”我说。\n她又问：“为什么家里越来越安静？”\n我告诉她：“因为你长大了\n长大了就会这样的。”\n她信了。\n她一直都很相信我。\n相信妈妈还会回来\n相信爸爸只是暂时离开，\n相信哥哥不过是出了趟远门。\n相信明天醒来。\n一切都会变回原来的样子。\n可我知道。\n明天不会。\n后天不会。\n以后也不会。\n因为这个世界。\n已经只剩下我们两个了`;
}
