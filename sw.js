const APP_CACHE_NAME = 'b2b-catalog-cache-v4';
const DATA_CACHE_NAME = 'b2b-data-cache-v1';
const IMAGE_CACHE_NAME = 'b2b-image-cache-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/index.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE_NAME)
      .then(cache => {
        console.log('Opened app cache');
        // Use addAll for atomic caching. If one file fails, the entire install fails.
        // This is desirable for the core app shell to ensure integrity.
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Force the waiting service worker to become the active service worker.
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [APP_CACHE_NAME, DATA_CACHE_NAME, IMAGE_CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Become the service worker for all open clients.
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Strategy for Supabase API calls (e.g., /rest/v1/): Network-first, fallback to cache
  if (url.hostname.includes('supabase.co') && !url.pathname.includes('/storage/v1/')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(request)
          .then(networkResponse => {
            // If the network request is successful, cache it and return it
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // If the network fails, try to serve the response from the cache
            return cache.match(request);
          });
      })
    );
    return;
  }
  
  // Strategy for Supabase Images (Stale-While-Revalidate)
  if (url.hostname.includes('supabase.co') && url.pathname.includes('/storage/v1/')) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then(cache => {
        return cache.match(request).then(cachedResponse => {
          const fetchPromise = fetch(request).then(networkResponse => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
          // Return the cached response immediately if available, and update cache in background.
          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // Strategy for app shell and other assets (Cache First)
  event.respondWith(
    caches.match(request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(request);
      })
  );
});
