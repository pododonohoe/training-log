/* Training Log — offline cache.
   Opens instantly from the copy on the phone, then refreshes the app and
   programme together in the background. New versions show on next open.
   Your logged data is NOT stored here — it lives in the app's own storage. */
var CACHE = "tl-v3.1.2";
var FILES = ["./", "./index.html", "./programme.js"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(FILES); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Refresh app + programme as a pair, so they never drift apart. */
function refreshAll() {
  return caches.open(CACHE).then(function (c) {
    return Promise.all(FILES.map(function (f) {
      return fetch(f, { cache: "no-cache" }).then(function (r) {
        if (r && r.ok) return c.put(f, r);
      }).catch(function () {});
    }));
  });
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  var isPage = req.mode === "navigate";
  var key = isPage ? "./index.html" : req;

  e.respondWith(
    caches.open(CACHE).then(function (c) {
      return c.match(key, { ignoreSearch: true }).then(function (hit) {
        if (isPage) e.waitUntil(refreshAll());
        if (hit) return hit;
        return fetch(req).then(function (r) {
          if (r && r.ok) c.put(key, r.clone());
          return r;
        });
      });
    })
  );
});
