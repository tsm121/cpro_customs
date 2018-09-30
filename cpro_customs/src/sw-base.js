importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");


// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config

if (workbox) {
	console.log(`Yay! Workbox is loaded 🎉`);
	workbox.precaching.suppressWarnings();
	workbox.precaching.precacheAndRoute(self.__precacheManifest);
	workbox.precaching.precacheAndRoute([]);

// app-shell
	workbox.routing.registerRoute("/manifest.json", workbox.strategies.staleWhileRevalidate({
		cacheName: 'STATIC'
	}));

	workbox.routing.registerRoute("/custom-sw.js", workbox.strategies.staleWhileRevalidate({
		cacheName: 'STATIC'
	}));


	workbox.routing.registerRoute(
		/\.(?:png|gif|jpg|jpeg|svg)$/,
		workbox.strategies.cacheFirst({
			cacheName: 'images',
			plugins: [
				new workbox.expiration.Plugin({
					maxEntries: 60,
					maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
				}),
			],
		}),
	);

}else {
	console.log(`Boo! Workbox didn't load 😬`);
}
