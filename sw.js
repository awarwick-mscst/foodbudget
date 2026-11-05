// Offline support: cache the app shell, serve it cache-first, refresh in the background.
var CACHE = 'foodbudge-v8';
var SHELL = [
  './', 'index.html', 'manifest.webmanifest', 'css/app.css',
  'js/config.js', 'js/ingredients.js', 'js/prices-data.js', 'js/recipes.js', 'js/recipes-more.js', 'js/recipes-classic.js', 'js/nutrition.js',
  'js/stores.js', 'js/planner.js', 'js/kroger.js', 'js/app.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  // Live store prices come from another server and must stay fresh.
  if (url.origin !== self.location.origin && url.hostname.indexOf('fonts.') !== 0) return;
  // Monthly price data: newest copy when online, saved copy when offline.
  if (/prices-data\.js$/.test(url.pathname)) {
    e.respondWith(fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () { return caches.match(e.request); }));
    return;
  }
  e.respondWith(caches.open(CACHE).then(function (cache) {
    return cache.match(e.request).then(function (hit) {
      var net = fetch(e.request).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) cache.put(e.request, res.clone());
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    });
  }));
});
