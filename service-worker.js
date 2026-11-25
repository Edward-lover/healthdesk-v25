

const CACHE_NAME = "healthdesk-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./dashboard.html",
    "./appointment.html",
    "./appointments.html",
    "./admin.html",
    "./admin-login.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];



self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                console.log("HealthDesk: Caching app files...");

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    // Activate the new service worker immediately
    self.skipWaiting();

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(cacheName => {
                            return cacheName !== CACHE_NAME;
                        })
                        .map(cacheName => {
                            return caches.delete(cacheName);
                        })

                );

            })
            .then(() => {

                console.log(
                    "HealthDesk: Old cache removed."
                );

                return self.clients.claim();

            })

    );

});


self.addEventListener("fetch", event => {

    // Only handle GET requests
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(

        fetch(event.request)

            .then(response => {

                // Save a copy of the latest file
                const responseClone = response.clone();

                caches.open(CACHE_NAME)
                    .then(cache => {

                        cache.put(
                            event.request,
                            responseClone
                        );

                    });

                return response;

            })

            .catch(() => {

                // If there is no internet,
                // use the cached version
                return caches.match(event.request);

            })

    );

});