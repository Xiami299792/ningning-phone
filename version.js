self.NINGNING_CACHE_VERSION = "ningning-v26-20260808";

self.NINGNING_ASSET_BASE = "";

self.ningningAssetUrl = function(path) {
    var base = self.NINGNING_ASSET_BASE;
    if (!base || !path) return path;
    if (/^(https?:)?\/\/|^data:|^blob:/i.test(path)) return path;
    return base.replace(/\/+$/, "") + "/" + String(path).replace(/^\/+/, "");
};
