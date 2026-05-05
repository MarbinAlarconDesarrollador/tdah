const charadasWords = [
    // --- Originales ---
    "Un mono comiendo plátano 🐒", 
    "Un robot sin batería 🤖", 
    "Alguien caminando en la luna 🌕", 
    "Un gato asustado 🐈",
    "Tocando la guitarra eléctrica 🎸", 
    "Un superhéroe volando 🦸",
    "Comiendo espaguetis muy largos 🍝", 
    "Un dinosaurio enojado 🦖",

    // --- Animales ---
    "Un pingüino con mucho frío 🐧",
    "Una jirafa tratando de rascarse los pies 🦒",
    "Un canguro que olvidó cómo saltar 🦘",
    "Un elefante con hipo 🐘",
    "Un pavo real presumiendo sus plumas 🦚",
    "Un perro intentando atrapar su propia cola 🐕",
    "Un perezoso queriendo ganar una carrera 🦥",
    "Una abeja bailando en una flor 🐝",

    // --- Profesiones y Acciones ---
    "Un peluquero muy distraído 💇",
    "Un director de orquesta emocionado 🎼",
    "Un chef que se quema con la sopa 🍲",
    "Un fotógrafo persiguiendo a una mariposa 📸",
    "Un mimo atrapado en una caja invisible 📦",
    "Alguien tratando de atrapar una mosca pesada 🪰",
    "Un astronauta intentando tomar agua en el espacio 🚀",
    "Un carpintero clavándose un dedo 🔨",

    // --- Situaciones Cotidianas Divertidas ---
    "Caminando sobre arena muy caliente 🏖️",
    "Tratando de poner un hilo en una aguja pequeña 🪡",
    "Un bebé probando un limón por primera vez 🍋",
    "Alguien con mucho sueño intentando no dormirse 😴",
    "Tratando de abrir un frasco de mermelada muy apretado 🍯",
    "Una persona con mucha prisa que no encuentra sus llaves 🔑",
    "Caminando con zapatos tres tallas más grandes 👟",
    "Tratando de poner un paraguas en un día de mucho viento ☂️",

    // --- Fantasía y Superpoderes ---
    "Un vampiro que tiene miedo a la oscuridad 🧛",
    "Un mago que hace desaparecer su propia varita por error 🪄",
    "Alguien que se vuelve invisible y hace bromas 👻",
    "Un superhéroe que se queda sin fuerza a mitad de un vuelo 🦸‍♂️",
    "Un zombi que solo quiere bailar 🧟",
    "Un dragón intentando apagar una vela sin quemar nada 🐲"
];


// Variables globales
let lastUpdate = 0;

window.addEventListener('load', () => {
    const cardInner = document.getElementById('card-inner');
    const wordDisplay = document.getElementById('word-display');
    const btnNext = document.getElementById('next-btn');
    const btnSensor = document.getElementById('enable-sensor');

    // FUNCIÓN PARA CAMBIAR PALABRA
    function showNextWord() {
        cardInner.classList.remove('is-flipped');
        
        setTimeout(() => {
            const nextWord = charadasWords[Math.floor(Math.random() * charadasWords.length)];
            wordDisplay.innerText = nextWord;
            cardInner.classList.add('is-flipped');
            if ("vibrate" in navigator) navigator.vibrate(50);
        }, 150);
    }

    // EVENTOS DE CLIC Y TECLADO (PC)
    btnNext.addEventListener('click', showNextWord);
    cardInner.addEventListener('click', showNextWord);
    
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowRight') {
            e.preventDefault();
            showNextWord();
        }
    });

    // EVENTO DE SENSOR (MÓVIL)
    function handleMotion(event) {
        const now = Date.now();
        if (now - lastUpdate < 1500) return; 

        // Detectar inclinación fuerte (hacia arriba o hacia abajo)
        if (event.beta > 130 || event.beta < 30) {
            lastUpdate = now;
            showNextWord();
        }
    }

    // BOTÓN PARA ACTIVAR SENSORES
    btnSensor.addEventListener('click', async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission === 'granted') {
                window.addEventListener('deviceorientation', handleMotion);
                btnSensor.innerText = "¡Sensor Activo! ✅";
            }
        } else {
            window.addEventListener('deviceorientation', handleMotion);
            btnSensor.style.display = 'none';
        }
    });

    console.log("Juego de Charadas listo para PC y Móvil.");
});