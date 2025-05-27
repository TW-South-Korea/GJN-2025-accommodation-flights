const CACHE_NAME = "gjn-2025-cache-v1";
const FILES_TO_CACHE = [
  "/GJN-2025-accommodation/",
  "/GJN-2025-accommodation/index.html",
  "/GJN-2025-accommodation/assets/manifest.json",
  "/GJN-2025-accommodation/assets/icons/icon-192x192.png",
  "/GJN-2025-accommodation/assets/icons/icon-512x512.png"
];

// Install event - cache files
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache if available
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      return response || fetch(evt.request);
    })
  );
});
