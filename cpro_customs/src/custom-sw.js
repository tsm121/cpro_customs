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
    "url": "manifest.json",
    "revision": "42fc31c33280cb234aa152b87075cf00"
  },
  {
    "url": "static/js/main.ddc3dbe9.js",
    "revision": "0e31b51cd6c975f8579a366584e6a6e0"
  },
  {
    "url": "static/css/main.f9ebf2cf.css",
    "revision": "780069750b4b4e25fd23c756206e3b29"
  },
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
    "url": "favicon.ico",
    "revision": "d43b9322d51ba4102eccdb7eb41a9a30"
  },
  {
    "url": "static/media/alcopop_dark_grey.9f700874.png",
    "revision": "9f7008745c8ae376cb47c94a0ac7e69a"
  },
  {
    "url": "static/media/animal_dark_grey.2242c9d5.png",
    "revision": "2242c9d50a4df0d4b2290db65b6ef552"
  },
  {
    "url": "static/media/archive_dark_grey.b74c8819.png",
    "revision": "b74c88193e996fef23ff31d7d1a669de"
  },
  {
    "url": "static/media/arrow_down_white.f060ae51.png",
    "revision": "f060ae5152ec026b0b594123606e9446"
  },
  {
    "url": "static/media/arrow_down_yellow.155972b4.png",
    "revision": "155972b4e7eb581f863aee7016816455"
  },
  {
    "url": "static/media/arrow_right_white.3668efcc.png",
    "revision": "3668efcc853f9f74abef5a83706ab141"
  },
  {
    "url": "static/media/arrow_right_yellow.89510e66.png",
    "revision": "89510e6657f754894ab4538817715892"
  },
  {
    "url": "static/media/arrow_up_white.17664057.png",
    "revision": "1766405721c4e7bb10437168e88845ae"
  },
  {
    "url": "static/media/arrow_up_yellow.d2c872b5.png",
    "revision": "d2c872b59a2b512fa0cc169f823cd6dc"
  },
  {
    "url": "static/media/beer_can_big_dark_grey.f364f7b8.png",
    "revision": "f364f7b89ea151c11c7dd51a0d006a0c"
  },
  {
    "url": "static/media/beer_can_small_dark_grey.57e7a8d9.png",
    "revision": "57e7a8d98336346a6272cbeba6d47512"
  },
  {
    "url": "static/media/bitcoin.60ea9f01.png",
    "revision": "60ea9f01e38134f799f4b184e601dd17"
  },
  {
    "url": "static/media/cigar_dark_grey.a93b34a0.png",
    "revision": "a93b34a0db80f578f08129451aecabdd"
  },
  {
    "url": "static/media/cigarette_paper_dark_grey.f09d0bc6.png",
    "revision": "f09d0bc685209efd2bb888bb4a7ebd9d"
  },
  {
    "url": "static/media/cigarettes_dark_grey.ff80a9ab.png",
    "revision": "ff80a9ab2001f616ead5c72e80c90565"
  },
  {
    "url": "static/media/close_button_grey.36f2c930.png",
    "revision": "36f2c93099660149da69601d46e8cd5e"
  },
  {
    "url": "static/media/cross-button-grey.4b70ce81.png",
    "revision": "4b70ce81fe27a05a4f79b8b029a1bd43"
  },
  {
    "url": "static/media/cross-button.deecfc04.png",
    "revision": "deecfc04fcedb030703a4aaee3c32dc5"
  },
  {
    "url": "static/media/diet.843b701d.png",
    "revision": "843b701d3299a4ae7e8fbae45cf4ee84"
  },
  {
    "url": "static/media/dog_dark_grey.7a04f102.png",
    "revision": "7a04f102a4781bf8819977332c0c30cb"
  },
  {
    "url": "static/media/dog.54d11129.png",
    "revision": "54d11129a971fa71c4f95e5387932503"
  },
  {
    "url": "static/media/fireworks.cc0135ad.png",
    "revision": "cc0135ad227788f4d805b86979ddc765"
  },
  {
    "url": "static/media/fortified_wine_dark_grey.1588e65a.png",
    "revision": "1588e65ad21f25223d72509f478407d1"
  },
  {
    "url": "static/media/funds.a7f665a4.png",
    "revision": "a7f665a498b25ea1e0b826b83579357e"
  },
  {
    "url": "static/media/horse_dark_grey.9461185d.png",
    "revision": "9461185dfd71c31eab1eae8e27f607f2"
  },
  {
    "url": "static/media/horse.cfd6d9d3.png",
    "revision": "cfd6d9d398c1cef092719c5b85cbc328"
  },
  {
    "url": "static/media/laboratory.070706f0.png",
    "revision": "070706f085c7fdfcfdbb95692c5a6384"
  },
  {
    "url": "static/media/mastercard.d0eda3bf.png",
    "revision": "d0eda3bff40bf471bb18cf7856a2be21"
  },
  {
    "url": "static/media/pawprint.877f55d0.png",
    "revision": "877f55d055ad72324342f80b7b7aa4af"
  },
  {
    "url": "static/media/person_yellow.3d03d6ec.png",
    "revision": "3d03d6eca20f1a90df335a8bf6fdf399"
  },
  {
    "url": "static/media/pipe_dark_grey.9cabdd9d.png",
    "revision": "9cabdd9d00ffd5842a6af624200fa6b3"
  },
  {
    "url": "static/media/pitcher_dark_grey.809392cc.png",
    "revision": "809392cccdc58f6f8d1213ae04d1c1ce"
  },
  {
    "url": "static/media/plant.67da42b2.png",
    "revision": "67da42b24f307e22ea4be0222e142f34"
  },
  {
    "url": "static/media/shopping-cart_dark_grey.dc9643e3.png",
    "revision": "dc9643e3c8564977a777c120dfadad5a"
  },
  {
    "url": "static/media/snus_dark_grey.9e070bfa.png",
    "revision": "9e070bfa52a6e833def19a26f69517e2"
  },
  {
    "url": "static/media/spirits_dark_grey.060d2638.png",
    "revision": "060d2638da4ca6220c057b04ef1f0b0e"
  },
  {
    "url": "static/media/visa.0a4701fd.png",
    "revision": "0a4701fd9e0b96cc2a8f78606d1dfa71"
  },
  {
    "url": "static/media/weight_dark_grey.9369c7f6.png",
    "revision": "9369c7f624a1debb275f00d701fe45b2"
  },
  {
    "url": "static/media/wine_bottle_big_dark_grey.c7565487.png",
    "revision": "c75654877574c24dda4080344e1edcf8"
  },
  {
    "url": "static/media/wine_dark_grey.4f17659d.png",
    "revision": "4f17659df4f10f5d929ceffa1fc17a54"
  },
  {
    "url": "index.html",
    "revision": "b599d8b471b7e160025c22e0e2703e14"
  },
  {
    "url": "registerServiceWorker.js",
    "revision": "84c3234a856483e1fd84104d63d37126"
  }
]);

    //Caching manifest and service worker at beginning. Updates if a new version is published
    //TODO: This caches the service worker, but still unsure if this is the right practise. Disabled for now!
    //workbox.precaching.addRoute(['custom-sw.js'], workbox.strategies.staleWhileRevalidate());
    workbox.precaching.addRoute(['registerServiceWorker.js'], workbox.strategies.staleWhileRevalidate());

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    );

}else {
    console.log(`Boo! Workbox didn't load 😬`);
}
