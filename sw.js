const CACHE_NAME = 'focus-play-v1';

// Lista de todos los archivos que queremos que funcionen sin internet
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/global.css',
    '/dashboard.js',
    '/manifest.json',
    '/games/charadas/index.html',
    '/games/charadas/style.css',
    '/games/charadas/script.js',
    '/games/conecta-cuatro/index.html',
    '/games/conecta-cuatro/style.css',
    '/games/conecta-cuatro/script.js',
    '/games/memorama/index.html',
    '/games/memorama/style.css',
    '/games/memorama/script.js',
    '/games/peliculas/index.html',
    '/games/peliculas/style.css',
    '/games/peliculas/script.js',
    '/games/respiracion/index.html',
    '/games/respiracion/style.css',
    '/games/respiracion/script.js',
    '/games/sudoku/index.html',
    '/games/sudoku/style.css',
    '/games/sudoku/script.js',
    '/games/tetris/index.html',
    '/games/tetris/style.css',
    '/games/tetris/script.js',
    '/games/torre/index.html',
    '/games/torre/style.css',
    '/games/torre/script.js',
    '/games/verbos/index.html',
    '/games/verbos/style.css',
    '/games/verbos/script.js',
   
];

// 1. Instalación: Guarda los archivos en la memoria del navegador
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache abierto: Guardando recursos para modo offline');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. Activación: Limpia versiones viejas de la App
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Borrando cache antiguo...');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 3. Estrategia de carga: "Cache First" (Carga rápido lo guardado, si no, busca en red)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});