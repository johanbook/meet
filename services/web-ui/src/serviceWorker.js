importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js",
);

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

  event.waitUntil(
    self.registration.showNotification(message, {
      body: description,
      icon: "android-chrome-192x192.png",
    }),
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(window.location.origin));
});
