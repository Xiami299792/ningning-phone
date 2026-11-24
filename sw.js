importScripts("version.js");

const CACHE_VERSION = self.NINGNING_CACHE_VERSION;

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)));
        await self.clients.claim();
    })());
});

self.addEventListener("message", event => {
    if (!event.data || event.data.type !== "NINGNING_GET_CACHE_VERSION") return;
    if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({
            cacheVersion: CACHE_VERSION
        });
    }
});

async function rangeResponse(req, fullRes) {
    const buf = await fullRes.arrayBuffer();
    const m = /bytes=(\d+)-(\d*)/.exec(req.headers.get("range") || "");
    if (!m) return new Response(buf, {
        headers: {
            "Content-Type": fullRes.headers.get("Content-Type") || ""
        }
    });
    const start = Number(m[1]);
    if (start >= buf.byteLength) {
        return new Response(null, {
            status: 416,
            statusText: "Range Not Satisfiable",
            headers: {
                "Content-Range": "bytes */" + buf.byteLength,
                "Accept-Ranges": "bytes"
            }
        });
    }
    const end = m[2] ? Math.min(Number(m[2]), buf.byteLength - 1) : buf.byteLength - 1;
    return new Response(buf.slice(start, end + 1), {
        status: 206,
        statusText: "Partial Content",
        headers: {
            "Content-Type": fullRes.headers.get("Content-Type") || "",
            "Content-Range": "bytes " + start + "-" + end + "/" + buf.byteLength,
            "Content-Length": String(end - start + 1),
            "Accept-Ranges": "bytes"
        }
    });
}

function cacheKey(url) {
    const u = new URL(url);
    u.searchParams.delete("_r");
    if (!u.searchParams.toString()) u.search = "";
    return u.toString();
}

async function handleMedia(req) {
    const cache = await caches.open(CACHE_VERSION);
    const key = cacheKey(req.url);
    const cached = await cache.match(key);
    if (cached) {
        return req.headers.has("range") ? rangeResponse(req, cached) : cached;
    }
    if (req.headers.has("range")) {
        try {
            const full = await fetch(req.url, {
                cache: "no-cache"
            });
            if (full.ok) {
                await cache.put(key, full.clone());
                return rangeResponse(req, full);
            }
        } catch (e) {}
        return fetch(req, {
            cache: "no-cache"
        });
    }
    const res = await fetch(req, {
        cache: "no-cache"
    });
    if (res.ok && res.type === "basic") {
        await cache.put(key, res.clone());
    }
    return res;
}

async function fetchWithTimeout(req, timeoutMs) {
    const controller = new AbortController;
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(req, {
            signal: controller.signal
        });
    } finally {
        clearTimeout(timer);
    }
}

async function normalizeRedirectedResponse(res) {
    if (!res || !res.redirected) return res;
    const body = await res.arrayBuffer();
    const headers = new Headers(res.headers);
    headers.delete("content-encoding");
    headers.delete("content-length");
    headers.delete("transfer-encoding");
    return new Response(body, {
        status: res.status,
        statusText: res.statusText,
        headers
    });
}

async function handleCode(req) {
    const cache = await caches.open(CACHE_VERSION);
    let cached = await cache.match(req);
    if (cached && cached.redirected) {
        cached = await normalizeRedirectedResponse(cached);
        await cache.put(req, cached.clone());
    }
    try {
        const budget = req.mode === "navigate" ? 10000 : 4000;
        const networkRes = cached ? await fetchWithTimeout(req, budget) : await fetch(req);
        const res = await normalizeRedirectedResponse(networkRes);
        if (!res.ok && cached) return cached;
        if (res.ok && (res.type === "basic" || res.type === "default")) {
            await cache.put(req, res.clone());
        }
        return res;
    } catch (err) {
        if (cached) return cached;
        throw err;
    }
}

self.addEventListener("fetch", event => {
    const req = event.request;
    if (req.method !== "GET") return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;
    const path = url.pathname.toLowerCase();
    if (/\.(webp|png|jpe?g|gif|mp3|wav|mp4|woff2?|ico)$/.test(path)) {
        event.respondWith(handleMedia(req));
    } else if (req.mode === "navigate" || /\.(html|js|css)$/.test(path)) {
        event.respondWith(handleCode(req));
    }
});
