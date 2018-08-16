self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('app-cache').then(cache =>
        {
            return cache.addAll([
                'css/style.css',
                'index.html',
                'js/scripts.js',
                'sw.js'
            ])
        })
    )
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
