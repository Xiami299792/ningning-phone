(function checkEndingState() {
    if (localStorage.getItem("win10_ending_reached") !== "true") return;
    var type = parseInt(localStorage.getItem("win10_ending_type"), 10);
    if (!(type >= 1 && type <= 3)) type = 1;
    var waited = 0;
    function tryShowEnding() {
        if (!document.body || typeof showEndingScreen !== "function") {
            waited += 100;
            if (waited > 10000) return;
            setTimeout(tryShowEnding, 100);
            return;
        }
        document.body.style.transition = "background 1s ease";
        document.body.style.background = "#000";
        document.body.style.overflow = "hidden";
        showEndingScreen(type, true);
    }
    tryShowEnding();
})();
