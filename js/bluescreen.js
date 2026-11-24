history.pushState(null, null, location.href);

window.onpopstate = function() {
    history.go(1);
};

(function drawBsodQR() {
    var canvas = document.getElementById("bsod-qr");
    if (!canvas || !window.NingningQR) return;
    try {
        var url = new URL("support.html", location.href).href;
        window.NingningQR.render(canvas, url, {
            size: 110,
            quiet: 3
        });
    } catch (e) {}
})();

let progress = parseInt(localStorage.getItem("win10_bsod_progress")) || 0;

const percentageEl = document.getElementById("percentage");

percentageEl.innerText = progress;

const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) progress = 100;
    percentageEl.innerText = progress;
    localStorage.setItem("win10_bsod_progress", progress);
    if (progress >= 100) {
        clearInterval(interval);
        localStorage.setItem("win10_zhoumu2", "true");
        localStorage.removeItem("win10_bsod_progress");
        localStorage.removeItem("win10_windows");
        setTimeout(() => {
            window.location.replace("index.html");
        }, 1000);
    }
}, 450);
