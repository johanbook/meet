/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js"
);

// This must come before any other workbox.* methods.
workbox.setConfig({
  debug: true,
});

// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Images
workbox.routing.registerRoute(
  new RegExp("s3."),
  new workbox.strategies.CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50, // Limit number of images cached
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
