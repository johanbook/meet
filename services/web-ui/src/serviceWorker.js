importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Images
workbox.routing.registerRoute(
  new RegExp(".(png|svg|jpg|jpeg)$"),
  workbox.strategies.cacheFirst()
);
