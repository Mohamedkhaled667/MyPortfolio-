const CACHE_NAME = 'mk-portfolio-v2';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './icon.png',
    './featured_project.png',
    './talabat_project.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
