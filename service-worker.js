self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('WhatsAppQuic').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/css/styles.css',
       '/js/scripts.js',
       '/logo.html'
     ]);
   })
 );
});