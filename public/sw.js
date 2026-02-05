const CACHE_NAME = 'dijital-pano-v4-route-swap';
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Network only - no cache
    event.respondWith(fetch(event.request));
});
