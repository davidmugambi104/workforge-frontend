// Simple service worker for offline caching
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('workforge-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/logo.png',
        // Add more assets as needed
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== 'workforge-cache-v1').map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
