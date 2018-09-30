importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");


// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
//workbox.precaching.precacheAndRoute(self.__precacheManifest);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// app-shell
workbox.routing.registerRoute("/manifest.json", workbox.strategies.staleWhileRevalidate({
	cacheName: 'STATIC'
}));

workbox.routing.registerRoute("/custom-sw.js", workbox.strategies.staleWhileRevalidate({
	cacheName: 'STATIC'
}));