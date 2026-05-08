const CACHE_NAME = 'focus-play-v3';

// Lista de todos los archivos que queremos que funcionen sin internet
const ASSETS_TO_CACHE = [
    '/',
    'index.html',
    'global.css',
    'dashboard.js',
    'manifest.json',
    'games/charadas/index.html',
    'games/charadas/style.css',
    'games/charadas/script.js',
    'games/conecta-cuatro/index.html',
    'games/conecta-cuatro/style.css',
    'games/conecta-cuatro/script.js',
    'games/memoria/index.html',
    'games/memoria/style.css',
    'games/memoria/script.js',
    'games/peliculas/index.html',
    'games/peliculas/style.css',
    'games/peliculas/script.js',
    'games/respiracion/index.html',
    'games/respiracion/style.css',
    'games/respiracion/script.js',
    'games/sudoku/index.html',
    'games/sudoku/style.css',
    'games/sudoku/script.js',
    'games/tetris/index.html',
    'games/tetris/style.css',
    'games/tetris/script.js',
    'games/torre/index.html',
    'games/verbos/index.html',
    'games/verbos/style.css',
    'games/verbos/app.js',
    'games/rompe-cabezas/index.html',
    'games/rompe-cabezas/style.css',
    'games/rompe-cabezas/script.js',
    'games/busca-y-encuentra/index.html',
    'games/busca-y-encuentra/style.css',
    'games/busca-y-encuentra/script.js',
    'games/emociones/index.html',
    'games/emociones/style.css',
    'games/emociones/script.js',
    'games/lectura-interactiva/index.html',
    'games/lectura-interactiva/style.css',
    'games/lectura-interactiva/script.js',
    'games/respiracion-guiada/index.html',
    'games/respiracion-guiada/style.css',
    'games/respiracion-guiada/script.js',
    'games/simon-dice/index.html',
    'games/simon-dice/style.css',
    'games/simon-dice/script.js',
    'games/wordle/index.html',
    'games/wordle/style.css',
    'games/wordle/script.js',
    'games/historias/index.html',
    'games/historias/style.css',
    'games/historias/script.js',
    'games/mueve-tu-cuerpo/index.html',
    'games/mueve-tu-cuerpo/style.css',
    'games/mueve-tu-cuerpo/script.js',
    'games/patrones/index.html',
    'games/patrones/style.css',
    'games/patrones/script.js',
    'games/ritmo/index.html',
    'games/ritmo/style.css',
    'games/ritmo/script.js',
    'games/laberintos/index.html',
    'games/laberintos/style.css',
    'games/laberintos/script.js',
    'games/modo-calma/index.html',
    'games/modo-calma/style.css',
    'games/modo-calma/script.js',
    'assets/icon-192.png',
    'assets/icon-512.png',
    'assets/meta.png',
    'assets/charadas.png',
    'assets/conecta-cuatro.png',
    'assets/memoria.png',
    'assets/peliculas.png',
    'assets/respiracion.png',
    'assets/sudoku.png',
    'assets/tetris.png',
    'assets/torre.png',
    'assets/verbos.png',
    'assets/rompecabezas.png',
    'assets/busca-y-encuentra.png',
    'assets/emociones.png',
    'assets/yoga.png',
    'assets/wordle.png',
    'assets/simon-dice.png',
    'assets/cuentos.png',
    'assets/historias.png',
    'assets/mueve-tu-cuerpo.png',
    'assets/patrones.png',
    'assets/ritmo.png',
    'assets/laberintos.png',
    'assets/modo-calma.png',
    'assets/flecha-derecha.png',
    'assets/flecha-izquierda.png',
    'assets/rotar.png',
    'assets/flecha-hacia-abajo.png'  
   
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