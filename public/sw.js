/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Service Worker for Yawmi Offline App
 */

const CACHE_NAME = 'yawmi-pwa-v2.1';

// Essential static shell and offline assets
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
];

// Install Event: Precaching App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Precaching partial error, will continue dynamic caching:', err);
      });
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate Event: Cleanup Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch Event: Cache-First for static assets, Stale-While-Revalidate for JS/CSS, Network-First for APIs
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Ignore non-GET requests or chrome-extension URLs
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  const url = new URL(request.url);

  // If it's a Gemini / AI API endpoint: Network-First with graceful offline fallback message
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({
            offline: true,
            message: 'أنت في وضع عدم الاتصال بالإنترنت (Offline Mode). تعمل كافة وظائف التطبيق، الجداول، المربعات، والبيانات بكفاءة 100% بدون إنترنت.',
          }),
          {
            headers: { 'Content-Type': 'application/json' },
            status: 503,
          }
        );
      })
    );
    return;
  }

  // For app navigation, scripts, styles, and static assets: Stale-While-Revalidate with Cache Fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Fetch fresh version in background
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request is an HTML page, serve cached index.html
          if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
          }
          return cachedResponse;
        });

      // Return cached response immediately if found, else wait for network
      return cachedResponse || fetchPromise;
    })
  );
});
