importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js",
);

// This must come before any other workbox.* methods.
// workbox.setConfig({
//   debug: true,
// });
// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// index.html
workbox.routing.registerRoute(
  /https?:\/\/app\.meetly\.site\/$/,
  new workbox.strategies.NetworkFirst({
    cacheName: "initial",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 1 * 24 * 60 * 60, // 1 day
      }),
    ],
  }),
);

// Assets
workbox.routing.registerRoute(
  /\.(css|html|js|json)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: "assets",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 1 * 24 * 60 * 60, // 1 day
      }),
    ],
  }),
);

// Images
workbox.routing.registerRoute(
  /https?:\/\/s3\.app\.meetly\.site/,
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  }),
);

self.addEventListener("push", (event) => {
  const payload = event.data.json();

  const message = payload.message || "Notification";
  const description = payload.description || "";
  const path = payload.resourcePath || "/";

  event.waitUntil(
    self.registration.showNotification(message, {
      body: description,
      icon: "android-chrome-192x192.png",
      data: {
        url: "https://app.meetly.site" + path,
      },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(() => {
      if (clients.openWindow) {
        clients.openWindow(url);
      }
    }),
  );
});
