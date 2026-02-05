// EMERGENCY RESET: Pass-through only
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
