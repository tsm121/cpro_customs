importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");


// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

//Start caching once the Service Worker is installed
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

//Check if Workbox is running then initialize
if (workbox) {
	console.log(`Yay! Workbox is loaded 🎉`);
	workbox.precaching.suppressWarnings();
	//Pre-cache files (css, html, js and manifest icons)
	//Use 'workbox injectManifest' to inject new files
	workbox.precaching.precacheAndRoute(self.__precacheManifest);
	workbox.precaching.precacheAndRoute([]);

	//Caching manifest and service worker at beginning. Updates if a new version is published
	//TODO: This caches the service worker, but still unsure if this is the right practise. Disabled for now!
	//workbox.precaching.addRoute(['custom-sw.js'], workbox.strategies.staleWhileRevalidate());

	//Caching all images while routing the page
	workbox.routing.registerRoute(
		/\.(?:png|gif|jpg|jpeg|svg)$/,
		workbox.strategies.staleWhileRevalidate({
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
