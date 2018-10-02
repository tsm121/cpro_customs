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
	workbox.precaching.precacheAndRoute([
  {
    "url": "assets/icons/icon-128x128.png",
    "revision": "65f786eb997a30d2efa384578b02501c"
  },
  {
    "url": "assets/icons/icon-144x144.png",
    "revision": "216d8b804f35eff41898e0c57715c635"
  },
  {
    "url": "assets/icons/icon-152x152.png",
    "revision": "8bd4819e25c4d0b4aecd13090d1635db"
  },
  {
    "url": "assets/icons/icon-192x192.png",
    "revision": "0dbe118ed9846f8c9d21c9a38c0ec1ef"
  },
  {
    "url": "assets/icons/icon-384x384.png",
    "revision": "b73e7afad0d1f76f2078977a4e8bb4be"
  },
  {
    "url": "assets/icons/icon-512x512.png",
    "revision": "d256c21f08b5d67d3c5883d22f321782"
  },
  {
    "url": "assets/icons/icon-72x72.png",
    "revision": "afe57889a50bd65b1b2ba93103432a7d"
  },
  {
    "url": "assets/icons/icon-96x96.png",
    "revision": "0175eff2625e5bad81e422f3c41e6154"
  },
  {
    "url": "assets/test.png",
    "revision": "9b15b6140374217a74fcf2d920bb8f05"
  },
  {
    "url": "manifest.json",
    "revision": "19a7aa30a295475b5355cb3f4e6cd535"
  }
]);

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
