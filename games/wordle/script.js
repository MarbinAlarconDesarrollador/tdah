const soundWin = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
const soundLoss = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3');
const soundTick = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'); // Sonido corto
const soundDing = new Audio('https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3'); // Sonido de selección

// --- 1. DICCIONARIOS EXCLUSIVOS ---
const wordSets = {
    ANIMALES: [
        "PERRO", "GATOS", "TIGRE", "CEBRA", "MOSCA", "PANDA", "PULPO", "GALLO", "CISNE",
        "CERDO", "RATON", "CABRA", "BURRO", "ZORRO", "OVEJA", "LLAMA", "KOALA", "LINCE",
        "ERIZO", "HIENA", "LOROS", "MONOS", "FOCAS", "PAVOS", "BAGRE", "PATOS", "GANSO",
        "BUHOS", "COBRA", "SAPOS", "HURON", "LEMUR", "MORSA", "ORCAS", "PUMAS", "RANAS"
    ],
    PAISES: [
        "CHILE", "CHINA", "JAPON", "RUSIA", "INDIA", "PARIS", "DUBAI", "QATAR", "COREA",
        "KENIA", "TOKIO", "NEPAL", "SIRIA", "SUDAN", "SAMOA", "TONGA", "HAITI", "LIBIA",
        "MALTA", "YEMEN", "GABON", "CONGO", "NAURU", "QUITO", "PEKIN", "MOSCU", "VIENA",
        "PRAGA", "SUIZA", "MIAMI"
    ],
    NOMBRES: [
        "PABLO", "MARIA", "JESUS", "LAURA", "PEDRO", "DIEGO", "ELENA", "SOFIA", "LUCAS",
        "MATEO", "ANGEL", "JULIO", "ABRIL", "DARIO", "ESTER", "FELIX", "OSCAR", "RAMON",
        "RUBEN", "PAULA", "DIANA", "CLARA", "CARLA", "MARIO", "TOMAS", "JUANA", "LUCIA",
        "DAVID", "JORGE", "BRUNO", "NADIA", "IRENE", "NOEMI", "KEVIN", "CELIA", "CELIO",
        "PAOLA", "FREDY", "MARTA"
    ],
    COMIDA: [
        "ARROZ", "CARNE", "POLLO", "HUEVO", "LIMON", "MANGO", "FRESA", "PASAS", "CHILE",
        "PASTA", "QUESO", "JAMON", "TORTA", "AREPA", "TACOS", "CALDO", "PERAS", "MORAS",
        "PIZZA", "SUSHI", "PANES", "AVENA", "TRIGO", "PAPAS", "FIDEO", "PIÑAS", "COCOS",
        "KIWIS", "HABAS", "DONAS", "COLES", "APIOS", "MELON", "LECHE", "YOGUR"
    ],
    VERBOS: [
        "ANDAR", "MIRAR", "COMER", "VIVIR", "CORRE", "SALTA", "JUEGA", "VUELA", "VOLAR",
        "ROMPE", "BUSCA", "LLEVA", "CRECE", "SUBIR", "BAJAR", "ENTRA", "SALIR", "CANTA",
        "BAILA", "GRITA", "SOÑAR", "TEMER", "REZAR", "ROGAR", "NADAR", "TOCAR", "REGAR",
        "ESTAR", "HABER", "TENER", "VENIR", "BEBER", "JUGAR", "DECIR", "PONER", "GUIAR",
        "ABRIR", "BOTAR", "VOTAR", "PEDIR", "CREER", "COGER", "TOMAR", "DEJAR", "ECHAR",
        "GANAR", "GIRAR", "HACER", "IDEAR", "JURAR", "LAVAR", "MORIR", "PARAR", "PASAR",
        "PEGAR", "PODER", "ROBAR", "SABER", "TRAER", "MIRAN", "DICEN", "SABEN", "COMEN",
        "AYUDA", "BAILE", "CANTO", "GRITO", "HABLA", "JUEGO", "NACER", "BESAR"

    ],
    INGLES: [
        "APPLE", "BREAD", "BACON", "DRINK", "SALAD", "GRAPE", "TIGER", "WHALE", "SNAKE",
        "SHEEP", "EAGLE", "WRITE", "SPEAK", "LAUGH", "DANCE", "LEARN", "CHAIR", "TABLE",
        "PHONE", "CLOCK", "LIGHT", "NOTES", "STONE", "STORY", "PARTY", "LUCKY", "CANDY",
        "FUNNY", "FLOOR", "GREEN", "HELLO", "DADDY", "HOBBY", "SILLY", "BERRY"
    ],
    GENERAL: [
        "PERRO", "GATOS", "TIGRE", "CEBRA", "MOSCA", "PANDA", "PULPO", "GALLO", "CISNE",
        "CERDO", "RATON", "CABRA", "BURRO", "ZORRO", "OVEJA", "KOALA", "LINCE", "RANAS",
        "ERIZO", "HIENA", "LOROS", "MONOS", "FOCAS", "PAVOS", "BAGRE", "PATOS", "GANSO",
        "BUHOS", "SAPOS", "HURON", "LEMUR", "MORSA", "ORCAS", "PUMAS", "GABON", "CONGO",
        "CHINA", "JAPON", "RUSIA", "INDIA", "PARIS", "DUBAI", "QATAR", "COREA", "NAURU",
        "KENIA", "TOKIO", "NEPAL", "SIRIA", "SUDAN", "SAMOA", "TONGA", "HAITI", "LIBIA",
        "MALTA", "YEMEN", "ARROZ", "CARNE", "POLLO", "HUEVO", "LIMON", "MANGO", "FRESA",
        "PABLO", "MARIA", "JESUS", "LAURA", "PEDRO", "DIEGO", "ELENA", "SOFIA", "LUCAS",
        "MATEO", "ANGEL", "JULIO", "ABRIL", "DARIO", "ESTER", "FELIX", "OSCAR", "RAMON",
        "RUBEN", "PAULA", "DIANA", "CLARA", "CARLA", "MARIO", "TOMAS", "JUANA", "LUCIA",
        "DAVID", "JORGE", "BRUNO", "NADIA", "IRENE", "NOEMI", "KEVIN", "CELIA", "CELIO",
        "PAOLA", "FREDY", "MARTA", "HABAS", "DONAS", "COLES", "APIOS", "MELON", "YOGUR",
        "PASTA", "QUESO", "JAMON", "TORTA", "AREPA", "TACOS", "CALDO", "PERAS", "MORAS",
        "PIZZA", "SUSHI", "PANES", "TRIGO", "PAPAS", "FIDEO", "PIÑAS", "COCOS", "CANTA",
        "KIWIS", "PASAS", "ANDAR", "CORRE", "SALTA", "JUEGA", "VUELA", "ENTRA", "SALIR",
        "BAILA", "GRITA", "SOÑAR", "TEMER", "REZAR", "ROGAR", "NADAR", "TOCAR", "REGAR",
        "ESTAR", "HABER", "TENER", "VENIR", "BEBER", "JUGAR", "DECIR", "PONER", "GUIAR",
        "ABRIR", "BOTAR", "VOTAR", "PEDIR", "CREER", "COGER", "TOMAR", "DEJAR", "ECHAR",
        "GANAR", "GIRAR", "HACER", "IDEAR", "JURAR", "LAVAR", "MORIR", "PARAR", "PASAR",
        "PEGAR", "PODER", "ROBAR", "SABER", "TRAER", "MIRAN", "DICEN", "SABEN", "COMEN",
        "LLEVA", "CRECE", "SUBIR", "BAJAR", "CALVO", "ATRAS", "ATLAS", "BLUSA", "SUDOR",
        "PAÑOS", "ABUSO", "ACTOR", "ALGAS", "ALTAR", "ANCHO", "ANIMO", "ANTES", "NIVEL",
        "ARBOL", "ASILO", "ASTRO", "AUTOS", "AVION", "AYUDA", "BAILE", "BANCO", "BARCO",
        "BARRO", "BATEA", "BINGO", "BOLSO", "BRAZO", "BRISA", "BRUJO", "BUENO", "RUMBO",
        "BURLA", "BUSCA", "CALOR", "CAMPO", "CANAL", "CANTO", "CAPAZ", "CARRO", "HUMOR",
        "CARTA", "CASAS", "CAUSA", "CERRO", "CHICO", "CIELO", "CINCO", "CLASE", "CLAVO",
        "COBRA", "COCHE", "COFRE", "COLOR", "COMER", "CORAL", "CORTE", "COSTO", "CRUEL",
        "CUEVA", "CULPA", "CURSO", "DADOS", "DARDO", "DATOS", "DEBER", "DICHA", "DIETA",
        "DISCO", "DONDE", "DORAR", "EBANO", "ENANO", "ELITE", "ERROR", "FILAS", "PESCA",
        "EXTRA", "FALSO", "FALTA", "FAROL", "FECHA", "FERIA", "FICHA", "FLACO", "FLOTA",
        "FRITO", "FUEGO", "FUERA", "FURIA", "GLOBO", "GOLPE", "GOMAS", "GORRA", "GOTAS",
        "GRADO", "GRANO", "GRITO", "GRUPO", "GUAPA", "GUAPO", "HABLA", "CALMA", "NORMA",
        "HACHA", "ARMAS", "HASTA", "HECHO", "HIELO", "HERIR", "HIJOS", "HOJAS", "HONDA",
        "HORAS", "HORNO", "HOTEL", "HUESO", "IDEAL", "IDEAS", "IGUAL", "ISLAS", "JABON",
        "JARRA", "JAULA", "JEFES", "JUEGO", "JUGOS", "JUNTO", "LABIO", "LADOS", "EXITO",
        "LAGOS", "LANZA", "LARGO", "LECHE", "LENTO", "LETRA", "LIBRE", "LIBRO", "LINDA",
        "LINDO", "LISTA", "LISTO", "LLAVE", "LLENA", "LLENO", "LLORO", "COCOA", "LOGRO",
        "LUCHA", "OTRAS", "LUEGO", "LUGAR", "LUNES", "MADRE", "MAGIA", "MANOS", "MAPAS",
        "OVULO", "MARCA", "MARCO", "MAREA", "MARTE", "MARZO", "MASAS", "MATAR", "MAYOR",
        "MEDIA", "MEDIO", "MEJOR", "MENOR", "MENOS", "MENTE", "MESAS", "METRO", "MIEDO",
        "MINAS", "MIRAR", "MISMO", "MITAD", "MOLER", "MONTE", "MOTOR", "MOVER", "SAZON",
        "MOVIL", "MUELA", "MUERE", "MUJER", "MUNDO", "MUSEO", "NACER", "NARIZ", "FELIZ",
        "NEGRO", "NIETO", "NIEVE", "NIÑOS", "NOBLE", "NOCHE", "NOTAS", "NUEVA", "NUEVO",
        "NUNCA", "OBRAS", "ORDEN", "OREJA", "OSADO", "OTROS", "OVALO", "PADRE", "PAGAR",
        "PALOS", "PANAL", "PANEL", "PAPEL", "PARDO", "PARED", "PARTE", "JOVEN", "GRATO",
        "PASTO", "PATAS", "PATIO", "PAUSA", "PECHO", "PEDAL", "PELEA", "PELOS", "GORDO",
        "PENAS", "PESAR", "PIANO", "PIEZA", "PILAR", "PINTO", "POETA", "POLVO", "BELLO",
        "SANAR", "BESAR", "POSTE", "PRIMO", "PUNTO", "QUIEN", "RADIO", "RAMAS", "CLARO",
        "RAYOS", "RAZON", "REGLA", "RELOJ", "REMAR", "RENTA", "RESTO", "ROBOT", "VOLAR",
        "ROCAS", "ROSAS", "ROMPE", "SABOR", "SACOS", "SALTO", "SALUD", "GAFAS", "FAVOR",
        "SANTO", "SECOS", "SELLO", "SERIE", "SILLA", "SOBRE", "SOCIO", "SOLAR", "SOLOS",
        "SOPLA", "SORDO", "SUAVE", "SUCIO", "SUELO", "SUEÑO", "TABLA", "TARDE", "TAREA",
        "TECHO", "TELON", "TEMOR", "TINTA", "TIPOS", "TONTO", "TORRE", "COBRE", "CIEGO",
        "TRUCO", "UNION", "USARA", "VACIO", "VAGOS", "VALOR", "VASOS", "VECES", "GRIPE",
        "VELAS", "VENTA", "VERDE", "VIAJE", "VIDAS", "VIEJO", "VUELO", "VISTA", "SUEÑA",
        "VIVIR", "ZUMOS", "BELLA", "DANZA", "USADO", "CAMAS", "PLATO", "CABLE", "OIDOS",
        "TAPAS", "VIDEO", "POBRE", "FONDO", "AVISO", "NUBES", "CLIMA", "FORMA", "PASOS",
        "PLANO", "TURNO", "RUIDO", "LUCES", "FRASE", "SONAR", "ZONAR", "DEDOS", "BANDA",
        "TEXTO", "LATEX", "QUITO", "PEKIN", "MOSCU", "VIENA", "PRAGA", "SUIZA", "MIAMI",
        "APPLE", "BREAD", "BACON", "DRINK", "SALAD", "GRAPE", "TIGER", "WHALE", "SNAKE",
        "SHEEP", "EAGLE", "WRITE", "SPEAK", "LAUGH", "DANCE", "LEARN", "CHAIR", "TABLE",
        "PHONE", "CLOCK", "LIGHT", "NOTES", "STONE", "STORY", "PARTY", "LUCKY", "CANDY",
        "FUNNY", "FLOOR", "GREEN", "HELLO", "DADDY", "HOBBY", "SILLY", "BERRY"
    ]
};
const playableCategories = ["ANIMALES", "PAISES", "NOMBRES", "COMIDA", "VERBOS", "GENERAL", "INGLES"];


function pickRandomCategory() {
    const currentTeam = stats.current;
    const usage = stats.categoryUsage[currentTeam];

    // Filtramos: solo categorías con menos de 2 usos para este equipo
    let available = playableCategories.filter(cat => usage[cat] < 2);

    // Si por alguna razón técnica se agotan todas, permitimos todas de nuevo (fail-safe)
    if (available.length === 0) {
        available = playableCategories;
    }

    return available[Math.floor(Math.random() * available.length)];
}


const victoryMessages = {
    ANIMALES: ["¡Eres un experto del reino animal!", "¡Rugido de victoria!", "¡Asombroso, instinto salvaje!", "¡Dominas la fauna!"],
    PAISES: ["¡Buen viaje, trotamundos!", "¡Conoces bien el mapa!", "¡Victoria internacional!", "¡Pasaporte sellado!"],
    NOMBRES: ["¡Qué buena memoria!", "¡Un nombre inolvidable!", "¡Eres un gran anfitrión!", "¡Persona ganadora!"],
    COMIDA: ["¡Buen provecho!", "¡Qué exquisita victoria!", "¡Tienes buen gusto!", "¡Victoria con sabor!"],
    VERBOS: ["¡Acción y victoria!", "¡Bien conjugado!", "¡Sabes cómo moverte!", "¡Excelente ejecución!"],
    GENERAL: ["¡Punto para el equipo!", "¡Impresionante!", "¡Lo lograste!", "¡Qué gran nivel!"],
    INGLES: ["¡Very good! ¡Dominas el idioma!", "¡Victory! Eres casi un nativo.", "¡Excellent! Tienes un gran vocabulario.", "¡You win! ¡Qué buen nivel de inglés!"]
};

const defeatMessages = {
    ANIMALES: ["¡Se escapó la presa!", "¡El espécimen huyó!", "¡Te faltó instinto!", "¡Perdiste el rastro!"],
    PAISES: ["¡Te perdiste en el mapa!", "¡Vuelo cancelado!", "¡Escala fallida!", "¡Sin brújula!"],
    NOMBRES: ["¡Se te olvidó quién era!", "¡Desconocido total!", "¡Nombre borrado!", "¡Mala memoria!"],
    COMIDA: ["¡Se te quemó el arroz!", "¡Plato amargo!", "¡Receta fallida!", "¡Mal sabor de boca!"],
    VERBOS: ["¡Te quedaste sin acción!", "¡Mal conjugado!", "¡Falta de movimiento!", "¡Verbo fallido!"],
    GENERAL: ["¡Suerte para la próxima!", "¡Casi lo logras!", "¡Inténtalo de nuevo!", "¡No te rindas!"],
    INGLES: ["¡Lost in translation! Te faltó vocabulario.", "¡Game over! Se te trabó la lengua.", "¡Te faltó el diccionario!", "¡Keep trying! Sigue practicando tu inglés."]
};

// Diccionario MAESTRO para validación (permite cruce de categorías)
const allWords = [...new Set(Object.values(wordSets).flat())];

// --- 2. GESTIÓN DE ESTADO ---
let stats = JSON.parse(localStorage.getItem('wordleElite_V12')) || {
    wins: { A: 0, B: 0 },
    turns: { A: 0, B: 0 },
    hist: { A: [0, 0, 0, 0, 0, 0], B: [0, 0, 0, 0, 0, 0] },
    current: "A",
    goal: 5,
    started: false,
    usedWords: [],
    category: "GENERAL",
    timeLimit: 120,
    // NUEVO: Seguimiento de categorías por equipo
    categoryUsage: {
        A: { ANIMALES: 0, PAISES: 0, NOMBRES: 0, COMIDA: 0, VERBOS: 0, GENERAL: 0, INGLES: 0 },
        B: { ANIMALES: 0, PAISES: 0, NOMBRES: 0, COMIDA: 0, VERBOS: 0, GENERAL: 0, INGLES: 0 }
    }
};

// Parche de seguridad para sesiones existentes
if (!stats.categoryUsage) {
    stats.categoryUsage = {
        A: { ANIMALES: 0, PAISES: 0, NOMBRES: 0, COMIDA: 0, VERBOS: 0, GENERAL: 0, INGLES: 0 },
        B: { ANIMALES: 0, PAISES: 0, NOMBRES: 0, COMIDA: 0, VERBOS: 0, GENERAL: 0, INGLES: 0 }
    };
}

let showingCategory = false;
let categoriaRegistradaEnRonda = false; // VARIABLE PARA CONTROLAR EL COBRO


async function showCategoryRoulette() {
    showingCategory = true;
    gameOver = true;
    const catDisplay = document.getElementById("categorySelect");
    const msgDisplay = document.getElementById("message");

    catDisplay.disabled = true;
    msgDisplay.innerText = "🎲 🎲 🎲 SORTEANDO CATEGORÍA...";
    catDisplay.classList.add("roulette-anim");

    const totalJumps = 25;
    for (let i = 0; i < totalJumps; i++) {
        const tempCat = playableCategories[Math.floor(Math.random() * playableCategories.length)];
        catDisplay.value = tempCat;
        soundTick.currentTime = 0;
        soundTick.play().catch(e => { });
        await new Promise(resolve => setTimeout(resolve, 100 + (i * 12)));
    }

    // --- SELECCIÓN FINAL ---
    const finalCategory = pickRandomCategory();

    // Calculamos cuántas veces se ha usado ANTES de incrementar (solo visualmente aquí)
    const usosPrevios = stats.categoryUsage[stats.current][finalCategory];
    const usosRestantes = 2 - (usosPrevios + 1);

    // Seteamos pero NO incrementamos aún el uso en stats.categoryUsage
    stats.category = finalCategory;
    catDisplay.value = finalCategory;
    saveStats();

    // --- MENSAJE PERSONALIZADO ---
    let extraMsg = "";
    if (usosRestantes === 1) {
        extraMsg = " (Queda 1 oportunidad)";
    } else if (usosRestantes === 0) {
        extraMsg = " (¡ÚLTIMA VEZ DISPONIBLE!)";
    }

    soundDing.play().catch(e => { });
    catDisplay.classList.remove("roulette-anim");
    catDisplay.style.backgroundColor = "#22c55e";
    catDisplay.style.color = "#fff";

    // Mostramos el nombre de la categoría y el aviso de disponibilidad
    msgDisplay.innerHTML = `<div>¡CATEGORÍA: ${finalCategory}!</div>
                            <div style="font-size: 0.8rem; margin-top: 5px; color: #fde047;">${extraMsg}</div>`;

    setTimeout(() => {
        catDisplay.style.backgroundColor = "";
        catDisplay.style.color = "";
        msgDisplay.innerText = "";
        catDisplay.disabled = false;
        showingCategory = false;
        gameOver = false;
        categoriaRegistradaEnRonda = false; // Reset para la nueva ronda
        pickNewWord();
    }, 3500); // tiempo para leer el aviso
}

// Parches de compatibilidad
if (!stats.turns) stats.turns = { A: 0, B: 0 };
if (!stats.category) stats.category = "GENERAL";
if (!stats.timeLimit) stats.timeLimit = 120;

let secret = "", attempt = 0, guess = "", gameOver = false, timerStarted = false;
let timeLeft = stats.timeLimit, timerId = null;

// --- 3. FUNCIONES DE TIEMPO Y CONTROL ---
function startTimer() {
    if (timerStarted || gameOver) return;
    timerStarted = true;

    // BLOQUEAR CONTROLES AL EMPEZAR A JUGAR (teclear)
    document.getElementById("btnNext").disabled = true;
    document.getElementById("settingsBox").classList.add("locked");
    document.getElementById("categorySelect").disabled = true;
    document.getElementById("timeInput").disabled = true;

    document.getElementById("timer").classList.add("active");
    // Nos aseguramos de que empiece en el color normal
    document.getElementById("timer").style.color = ""; 

    timerId = setInterval(() => {
        if (gameOver) { clearInterval(timerId); return; }
        
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        
        // Cambiar a rojo cuando queden 10 segundos
        if (timeLeft <= 10) {
            document.getElementById("timer").style.color = "#ef4444";
        }

        // CORRECCIÓN AQUÍ: Evaluamos 'timeLeft' y limpiamos el intervalo
        if (timeLeft <= 0) {
            clearInterval(timerId); // Detenemos el reloj para que no pase a negativo
            
            const defeatMsgs = (typeof defeatMessages !== 'undefined' && defeatMessages.TIMEOUT) 
                                ? defeatMessages.TIMEOUT 
                                : ["¡El tiempo se agotó!", "¡Qué mala suerte, tiempo fuera!"];
                                
            end(`❌ ${defeatMsgs[Math.floor(Math.random() * defeatMsgs.length)]} ERA: ${secret}`);
        }
    }, 1000);
}

// Esta función se llama cada vez que cambian el select de Categoría o Tiempo
function updateCategoryParams() {
    // Solo permitimos cambiar si el reloj NO está corriendo
    if (!timerStarted) {
        stats.category = document.getElementById("categorySelect").value;
        stats.timeLimit = parseInt(document.getElementById("timeInput").value) || 120;

        // Actualizamos el tiempo visual
        timeLeft = stats.timeLimit;
        document.getElementById("timer").innerText = timeLeft;

        // Y lo más importante: GENERAMOS NUEVA PALABRA DE LA NUEVA CATEGORÍA
        // Esto borra la palabra anterior (si había una pendiente) y pone una nueva
        // Pero primero quitamos la anterior de "usadas" si no se llegó a jugar
        if (secret && stats.usedWords.includes(secret)) {
            stats.usedWords.pop(); // Sacamos la última porque en realidad no se jugó
        }

        pickNewWord(); // Elegimos una nueva basada en la nueva categoría
        saveStats();
    }
}

function saveGoal() {
    if (!stats.started) {
        stats.goal = parseInt(document.getElementById("goalInput").value) || 5;
        saveStats();
    }
}

function saveNames() {
    localStorage.setItem('nA', document.getElementById("nameA").innerText);
    localStorage.setItem('nB', document.getElementById("nameB").innerText);
    renderUI();
}


function saveStats() {
    localStorage.setItem('wordleElite_V12', JSON.stringify(stats));
    renderUI();
}

function hardReset() {
    if (confirm("⚠️ ¿REINICIAR TORNEO COMPLETO?")) {
        stats = {
            wins: { A: 0, B: 0 },
            turns: { A: 0, B: 0 },
            hist: { A: [0, 0, 0, 0, 0, 0], B: [0, 0, 0, 0, 0, 0] },
            current: "A",
            goal: stats.goal,
            started: false,
            usedWords: [],
            category: "GENERAL",
            timeLimit: 120,
            categoryUsage: {
                A: { ANIMALES: 0, PAISES: 0, NOMBRES: 0, COMIDA: 0, VERBOS: 0, GENERAL: 0, INGLES: 0 },
                B: { ANIMALES: 0, PAISES: 0, NOMBRES: 0, COMIDA: 0, VERBOS: 0, GENERAL: 0, INGLES: 0 }
            }
        };
        document.getElementById("winnerOverlay").style.display = "none";
        saveStats();
        resetRound();
    }
}

// Función auxiliar para elegir palabra
function pickNewWord() {
    // Validación de seguridad: si la categoría no existe, usar GENERAL
    if (!wordSets[stats.category]) stats.category = "GENERAL";

    let categoryList = wordSets[stats.category];

    // Filtrar usadas
    const availableWords = categoryList.filter(word => !stats.usedWords.includes(word));

    if (availableWords.length === 0) {
        // Reciclaje si se acaban las palabras
        secret = categoryList[Math.floor(Math.random() * categoryList.length)];
    } else {
        secret = availableWords[Math.floor(Math.random() * availableWords.length)];
    }

    // Registrar usada
    stats.usedWords.push(secret);
    saveStats();

    // Debug
    console.log(`Juego listo. Cat: ${stats.category}, Palabra: ${secret}`);
}



function resetRound() {
    clearInterval(timerId);
    timerStarted = false;
    timeLeft = stats.timeLimit;
    gameOver = false;
    attempt = 0;
    guess = "";

    // Reset visual de la cuadrícula
    document.getElementById("timer").innerText = timeLeft;
    document.getElementById("timer").style.color = "";
    document.getElementById("message").innerText = "";
    document.getElementById("grid").innerHTML = "";
    for (let i = 0; i < 30; i++) document.getElementById("grid").innerHTML += `<div class="cell"></div>`;

    // HABILITAR CONTROLES (Para que puedan cambiar categoría antes de jugar)
    document.getElementById("btnNext").disabled = false;
    document.getElementById("categorySelect").disabled = false;
    document.getElementById("timeInput").disabled = false;
    document.getElementById("settingsBox").classList.remove("locked");

    renderKeyboard();
    renderUI();

    // Lanzar la ruleta de categoría aleatoria
    showCategoryRoulette();
}

function renderUI() {
    // 1. Obtener nombres y actualizar etiquetas básicas
    const nA = localStorage.getItem('nA') || "EQUIPO AZUL";
    const nB = localStorage.getItem('nB') || "EQUIPO ROJO";
    document.getElementById("nameA").innerText = nA;
    document.getElementById("nameB").innerText = nB;
    document.getElementById("turnStatA").innerText = "Partidas: " + stats.turns.A;
    document.getElementById("turnStatB").innerText = "Partidas: " + stats.turns.B;

    // 2. LÓGICA DEL INDICADOR DE TURNO 
    const indicator = document.getElementById("turnIndicator");
    const nameSpan = document.getElementById("activePlayerName");

    if (stats.current === "A") {
        nameSpan.innerText = nA.toUpperCase();
        indicator.className = "turn-banner turn-team-A active-turn-pulse";
    } else {
        nameSpan.innerText = nB.toUpperCase();
        indicator.className = "turn-banner turn-team-B active-turn-pulse";
    }

    // 3. Inputs de Configuración
    const goalInput = document.getElementById("goalInput");
    const catSelect = document.getElementById("categorySelect");
    const timeInput = document.getElementById("timeInput");

    goalInput.value = stats.goal;
    catSelect.value = stats.category;
    timeInput.value = stats.timeLimit;

    // Bloqueo de configuración si el torneo inició
    if (stats.started) {
        goalInput.disabled = true;
        document.getElementById("goalBox").classList.add("locked");
    } else {
        goalInput.disabled = false;
        document.getElementById("goalBox").classList.remove("locked");
    }

    // 4. Marcador Central (Solo números para no repetir el nombre)
    document.getElementById("scoreHeader").innerHTML = `
        <div style="font-size: 2.8rem; font-weight: 900; letter-spacing: 2px;">
            ${stats.wins.A} — ${stats.wins.B}
        </div>
    `;

    // 5. Verificación de Ganador Final
    // Solo si ambos equipos han jugado la misma cantidad de rondas
    if (stats.turns.A === stats.turns.B && stats.turns.A > 0) {
        if (stats.wins.A >= stats.goal && stats.wins.A > stats.wins.B) showFinalWinner(nA);
        else if (stats.wins.B >= stats.goal && stats.wins.B > stats.wins.A) showFinalWinner(nB);
    }

    // 6. Renderizar Historial (Gráficos de barras) 
    window.lastWinsRendered = window.lastWinsRendered || { A: null, B: null };

["A", "B"].forEach(t => {
    const container = document.getElementById("hist" + t);
    if (!container) return;

    const wins = (stats?.wins?.[t]) ?? 0;

    if (window.lastWinsRendered[t] === wins) return;
    window.lastWinsRendered[t] = wins;

    container.innerHTML = "";

    const trophies = Math.floor(wins / 10);
    const stars = wins % 10;

    for (let i = 0; i < trophies; i++) {
        container.innerHTML += `<span class="trophy">🏆</span>`;
    }

    for (let i = 0; i < stars; i++) {
        container.innerHTML += `<span class="star">⭐</span>`;
    }

    if (wins === 0) {
        const mensajes = [
            "🐵 ¿Se quedaron dormidos? 😴",
            "😅 Vamos equipo, aún hay tiempo...",
            "🤔 Estrategia secreta o qué?",
            "💀 Buscando la primera victoria...",
            "🔥 ¡La remontada será legendaria!"
        ];

        const random = mensajes[Math.floor(Math.random() * mensajes.length)];
        container.innerHTML = `<span class="no-wins">${random}</span>`;
    }
});

    
}

function showFinalWinner(name) {
    gameOver = true;
    document.getElementById("winnerName").innerText = name.toUpperCase();
    document.getElementById("winnerOverlay").style.display = "flex";
    createConfetti();
}

function renderKeyboard() {
    const keys = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"], ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]];
    const kb = document.getElementById("keyboard"); kb.innerHTML = "";
    keys.forEach(row => {
        const div = document.createElement("div"); div.className = "keyboard-row";
        row.forEach(k => {
            const b = document.createElement("button"); b.innerText = k; b.className = "key";
            b.id = "k-" + k; b.onclick = () => handleKey(k);
            div.appendChild(b);
        });
        kb.appendChild(div);
    });
}

function handleKey(k) {
    if (gameOver) return;

    // REGISTRO DE CATEGORÍA AL ESCRIBIR LA PRIMERA LETRA
    if (!categoriaRegistradaEnRonda && k !== "ENTER" && k !== "⌫" && k.length === 1) {
        stats.categoryUsage[stats.current][stats.category]++;
        categoriaRegistradaEnRonda = true;
        saveStats();
    }

    // Si es la primera tecla del torneo
    if (!stats.started && k !== "ENTER" && k !== "⌫" && k.length === 1) {
        stats.started = true;
        saveStats();
    }

    // Si es la primera tecla de la RONDA (Inicia Timer y Bloquea Selectores)
    if (!timerStarted && k !== "ENTER" && k !== "⌫") {
        startTimer();
    }

    const cells = document.querySelectorAll(".cell");
    const start = attempt * 5;
    if (k === "ENTER") { if (guess.length === 5) submit(); }
    else if (k === "⌫") { guess = guess.slice(0, -1); }
    else if (guess.length < 5 && k.length === 1) { guess += k; }
    for (let i = 0; i < 5; i++) {
        if (cells[start + i]) cells[start + i].textContent = guess[i] || "";
    }
}

function submit() {
    if (!allWords.includes(guess)) {
        const cells = document.querySelectorAll(".cell");
        const start = attempt * 5;
        document.getElementById("message").innerText = "PALABRA NO VÁLIDA";
        for (let i = 0; i < 5; i++) {
            cells[start + i].classList.add("cell-error");
            setTimeout(() => { cells[start + i].classList.remove("cell-error"); }, 400);
        }
        return;
    }

    const cells = document.querySelectorAll(".cell");
    const start = attempt * 5;
    let tempSec = secret.split("");
    const res = Array(5).fill("absent");

    for (let i = 0; i < 5; i++) { if (guess[i] === secret[i]) { res[i] = "correct"; tempSec[i] = null; } }
    for (let i = 0; i < 5; i++) { if (res[i] !== "correct" && tempSec.includes(guess[i])) { res[i] = "present"; tempSec[tempSec.indexOf(guess[i])] = null; } }

    res.forEach((s, i) => {
        const cell = cells[start + i];
        cell.classList.add(s);
        const letra = guess[i];
        setTimeout(() => { cell.textContent = letra; }, 10);
        const k = document.getElementById("k-" + letra); if (k) k.classList.add(s);
    });

    if (guess === secret) {
        for (let i = 0; i < 5; i++) setTimeout(() => cells[start + i].classList.add("win-bounce"), i * 100);
        createConfetti();
        stats.wins[stats.current]++;
        stats.hist[stats.current][attempt]++;
        soundWin.play(); 
        //end("¡PUNTO!");
        // --- CAMBIO AQUÍ: Mensaje Personalizado ---
        const msgs = victoryMessages[stats.category] || victoryMessages["GENERAL"];
        const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
        end(randomMsg);
        // ------------------------------------------
    } else if (attempt === 5) {
        end("ERA: " + secret);
    } else {
        attempt++; guess = "";
    }
}

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.backgroundColor = ["#3b82f6", "#f43f5e", "#10b981", "#f59e0b"][Math.floor(Math.random() * 4)];
        c.style.animationDelay = Math.random() * 2 + "s";
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 12000);
    }
}

function end(m) {
    gameOver = true;
    clearInterval(timerId);

    // Si m indica derrota (tiempo agotado o intentos fallidos)
    if (m.includes("ERA:") || m.includes("TIEMPO AGOTADO")) {
        soundLoss.play(); //  (Efecto de perder)
        // 1. Crear el flash rojo visual
        const flash = document.createElement("div");
        flash.className = "defeat-flash";
        document.body.appendChild(flash);

        // Eliminar el elemento después de que termine la animación
        setTimeout(() => flash.remove(), 800);

        // 2. Seleccionar mensaje divertido de derrota
        const msgs = defeatMessages[stats.category] || defeatMessages["GENERAL"];
        const randomDefeat = msgs[Math.floor(Math.random() * msgs.length)];
        document.getElementById("message").innerText = `${randomDefeat} (Era: ${secret})`;

        // 3. (Opcional) Hacer vibrar el timer si se agotó el tiempo
        if (m.includes("TIEMPO AGOTADO")) {
            document.getElementById("timer").style.color = "#ef4444";
        }

    } else {
        // Es una victoria
        document.getElementById("message").innerText = m;
    }

    // Desbloqueo de controles y limpieza visual
    document.getElementById("btnNext").disabled = false;
    document.getElementById("categorySelect").disabled = false;
    document.getElementById("timeInput").disabled = false;
    document.getElementById("settingsBox").classList.remove("locked");
    document.getElementById("timer").classList.remove("active");

    stats.turns[stats.current]++;
    stats.current = stats.current === "A" ? "B" : "A";
    saveStats();

}

document.onkeydown = (e) => {
    let k = e.key.toUpperCase();
    if (k === "BACKSPACE") k = "⌫";
    handleKey(k);
};

resetRound();

// --- SISTEMA DE TUTORIAL INTEGRADO V2 ---

let currentStep = 0;
const steps = [
    {
        element: "goalBox",
        title: "Objetivo del Torneo",
        text: "Aquí defines a cuántas partidas ganadas se termina el torneo. ¡No podrás cambiarlo una vez empiecen!",
        pos: { top: "80px", left: "50%" } // Ajustado a la izquierda arriba
    },
    {
        element: "categorySelect",
        title: "Elección de Categoría",
        text: "La ruleta elegirá una temática. ¡Ojo! Solo se descuenta de tus 2 oportunidades si empiezas a escribir. Si la categoria te parece muy difícil, ¡puedes saltarla antes de tocar el teclado!. Pero Recuerda que cada equipo solo puede repetir una categoría 2 veces.",
        pos: { top: "80px", left: "50%" }
    },
    {
        element: "timeInput",
        title: "El Reloj Corre",
        text: "Define los segundos por turno. Si llega a cero, el equipo pierde la ronda.",
        pos: { top: "80px", left: "50%" } // Ajustado a la derecha arriba
    },
    {
        element: "grid",
        title: "Adivina la Palabra",
        text: "Verde: Letra y posición correctas. Amarillo: Existe pero en otro lugar. Gris: No existe.",
        pos: { top: "50%", left: "30%" } // Izquierda para el tablero
    }
];

function openRulesModal() {
    document.getElementById("tutorialModal").style.display = "flex";
}

function closeTutorial() {
    document.getElementById("tutorialModal").style.display = "none";
    localStorage.setItem('tutorialVisto', 'true');
}

function startInteractiveTutorial() {
    currentStep = 0;
    // Cerramos cualquier otro modal abierto
    document.getElementById("tutorialModal").style.display = "none";
    document.getElementById("tutorialOverlay").style.display = "flex";
    showStep();
}

function showStep() {
    // 1. Limpiar resaltado previo
    steps.forEach(s => {
        const el = document.getElementById(s.element);
        if (el) el.classList.remove("highlight-focus");
    });

    const step = steps[currentStep];
    const target = document.getElementById(step.element);
    const card = document.getElementById("stepContent");
    const arrow = document.getElementById("tutorialArrow");

    if (target) {
        target.classList.add("highlight-focus");

        // Scroll automático
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 2. Lógica de la Flecha
        const rect = target.getBoundingClientRect();
        arrow.style.display = "block";
        arrow.style.left = (rect.left + rect.width / 2 - 12) + "px";

        if (rect.top > 300) {
            arrow.style.top = (rect.top - 30) + "px";
            arrow.style.setProperty('--rot', '180deg');
        } else {
            arrow.style.top = (rect.bottom + 15) + "px";
            arrow.style.setProperty('--rot', '0deg');
        }

        // 3. Posicionar tarjeta (Se ajusta al nuevo layout)
        if (window.innerWidth > 768) {
            card.style.top = step.pos.top;
            card.style.left = step.pos.left;
            card.style.transform = "translateX(-50%)";
            card.style.position = "fixed";
        }
    }

    document.getElementById("stepTitle").innerText = step.title;
    document.getElementById("stepText").innerText = step.text;
    document.getElementById("btnNextStep").innerText = (currentStep === steps.length - 1) ? "¡A JUGAR!" : "Siguiente";
}

function nextStep() {
    currentStep++;
    if (currentStep < steps.length) {
        showStep();
    } else {
        finishStepTutorial();
    }
}

function finishStepTutorial() {
    document.getElementById("tutorialOverlay").style.display = "none";
    document.getElementById("tutorialArrow").style.display = "none";
    steps.forEach(s => {
        const el = document.getElementById(s.element);
        if (el) el.classList.remove("highlight-focus");
    });
    // Al terminar el interactivo, abrimos el de los colores (Gris/Verde/Amarillo)
    openRulesModal();
    localStorage.setItem('tutorialInteractivoVisto', 'true');
    localStorage.setItem('tutorialVisto', 'true');
}

function skipTutorial() {
    document.getElementById("tutorialOverlay").style.display = "none";
    document.getElementById("tutorialArrow").style.display = "none";
    steps.forEach(s => {
        const el = document.getElementById(s.element);
        if (el) el.classList.remove("highlight-focus");
    });
    localStorage.setItem('tutorialInteractivoVisto', 'true');
    localStorage.setItem('tutorialVisto', 'true');
}

// Auto-inicio
document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('tutorialInteractivoVisto')) {
        setTimeout(startInteractiveTutorial, 1000);
    }
});

// --- BLOQUEO DE REINICIO POR TECLADO ---
window.addEventListener('keydown', function (e) {
    // Bloquear F5
    if (e.key === 'F5') {
        e.preventDefault();
        alert("⚠️ El reinicio por F5 está deshabilitado. Usa el botón 'REINICIAR TORNEO'.");
    }

    // Bloquear Ctrl + R o Cmd + R (Mac)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        alert("⚠️ El reinicio por Ctrl+R está deshabilitado. Usa el botón 'REINICIAR TORNEO'.");
    }

    // Bloquear Ctrl + Shift + R
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'r') {
        e.preventDefault();
        alert("⚠️ El reinicio forzado está deshabilitado. Usa el botón 'REINICIAR TORNEO'.");
    }
});

window.addEventListener('beforeunload', function (e) {
    // Si el torneo ha empezado y no ha terminado
    if (stats.started && !gameOver) {
        // Cancelar el evento (esto muestra el cuadro de diálogo estándar del navegador)
        e.preventDefault();
        e.returnValue = '';
    }
});
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Cargar el tema preferido al abrir la página
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        // Por defecto será Claro si no hay nada guardado o es "light"
        document.body.classList.remove("dark-mode");
    }
});