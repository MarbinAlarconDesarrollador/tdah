// --- MOTOR DE SONIDO (Web Audio API) ---
const SoundEngine = {
    ctx: new (window.AudioContext || window.webkitAudioContext)(),

    playTic() {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    },

    playAlarm() {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(300, this.ctx.currentTime + 0.5);
        osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 1);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1);

        osc.start();
        osc.stop(this.ctx.currentTime + 1);
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]); // Vibración
    },

    playDing() {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
    }
};

// Lista de verbos puros
const verbs = [
    // --- TERMINACIÓN -AR (Fáciles y de Oficios) ---
    "Cincelar", "Escalar", "Ordeñar", "Amasar", "Serruchar", "Cosechar", "Zapatear", "Pilotar", "Soldar", "Esquiar",
    "Tatuar", "Pescar", "Bostezar", "Malabarear", "Excavar", "Sembrar", "Brindar", "Vigilar", "Boxear", "Afeitar",
    "Bañar", "Festejar", "Peinar", "Abofetear", "Remar", "Patinar", "Dibujar", "Regar", "Fregar", "Volar",
    "Estornudar", "Silbar", "Torear", "Caminar", "Saltar", "Cocinar", "Planchar", "Bailar", "Gritar", "Abrazar",

    // --- TERMINACIÓN -ER (Acciones de Movimiento) ---
    "Barrer", "Tejer", "Moler", "Coser", "Correr", "Beber", "Comer", "Vender", "Romper", "Mover",
    "Poder", "Querer", "Leer", "Traer", "Saber", "Coger", "Crecer", "Nacer", "Oler", "Tender",
    "Encender", "Morder", "Becer", "Barruntar", "Lamer", "Escoger", "Absorber", "Esconder", "Llover", "Correr",

    // --- TERMINACIÓN -IR (Retos de Mímica) ---
    "Escupir", "Batir", "Zambullir", "Conducir", "Esgrimir", "Aplaudir", "Dormir", "Subir", "Abrir", "Reír",
    "Sentir", "Pedir", "Servir", "Medir", "Vestir", "Escribir", "Partir", "Discutir", "Crujir", "Hervir",
    "Rugir", "Pulir", "Diferir", "Sufrir", "Teñir", "Sacudir", "Disparar", "Derretir", "Fingir", "Construir",

    // --- ACCIONES ESPECÍFICAS (Divertidas) ---
    "Teletransportar", "Levitar", "Hipnotizar", "Desmayar", "Parpadear", "Atornillar", "Enhebrar", "Barajar", "Surfear", "Pescar"
];

// Cambia la inicialización para que use la nueva lista
let available = [...verbs];


let scores = { 1: 0, 2: 0 };
let currentTeam = 1;
let timerInterval;
let timeLeft = 120;

function spin() {
    if (available.length === 0) {
        alert("¡Lista vacía! Reiniciando...");
        available = [...verbs];
    }
    // Asegurar que la peli principal esté oculta al girar
    document.getElementById('verbo-name').classList.remove('visible');
    resetTimer();

    const idx = Math.floor(Math.random() * available.length);
    const verbo = available.splice(idx, 1)[0];

    document.getElementById('verbo-name').innerText = verbo.title;
    document.getElementById('category-display').innerText = (verbo.cat || "Sin Categoría").toUpperCase();
}

function toggleVisibility() {
    document.getElementById('verbo-name').classList.toggle('visible');
}

// Nueva función para pantalla completa
function toggleFsverbo() {
    const verboDisplay = document.getElementById('fs-verbo');
    const toggleBtn = document.querySelector('.btn-fs-toggle');

    verboDisplay.classList.toggle('hidden');

    if (verboDisplay.classList.contains('hidden')) {
        toggleBtn.innerText = "👁️ REVELAR VERBO";
    } else {
        toggleBtn.innerText = "🙈 OCULTAR";
    }
}


function startTimer() {
    // Importante: Desbloquear el audio en móviles por interacción del usuario
    if (SoundEngine.ctx.state === 'suspended') SoundEngine.ctx.resume();

    clearInterval(timerInterval);
    document.getElementById('start-btn').disabled = true;
    document.getElementById('start-btn').style.opacity = "0.5";

    const overlay = document.getElementById('fullscreen-overlay');
    overlay.classList.remove('hidden');

    // 1. Copiamos el nombre del verbo
    document.getElementById('fs-verbo').innerText = document.getElementById('verbo-name').innerText;

    // 2. COPIAMOS LA TERMINACIÓN (La pista visual)
    const currentTermination = document.getElementById('category-display').innerText;
    document.getElementById('fs-termination').innerText = currentTermination;

    // Aseguramos que el verbo inicie oculto en la pantalla completa
    document.getElementById('fs-verbo').classList.add('hidden');

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        // Lógica de Sonido Tic-Tac
        if (timeLeft > 20) {
            SoundEngine.playTic(); // Tic normal cada segundo
        } else if (timeLeft <= 20 && timeLeft > 0) {
            // Aceleramos el Tic-Tac (doble sonido)
            SoundEngine.playTic();
            setTimeout(() => SoundEngine.playTic(), 500);
        }

        if (timeLeft <= 15) {
            document.getElementById('timer').style.color = "#ff4444";
            document.getElementById('fs-timer').style.color = "#ff4444";
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            SoundEngine.playAlarm(); // Sonido de Alarma
            closeFullscreen();
            alert("¡TIEMPO AGOTADO!");
            nextTurn();
        }
    }, 1000);
}

function stopTimerEarly() {
    clearInterval(timerInterval);
    closeFullscreen();
}

function closeFullscreen() {
    document.getElementById('fullscreen-overlay').classList.add('hidden');
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 120;
    updateTimerDisplay();
    document.getElementById('timer').style.color = "var(--accent)";
    document.getElementById('fs-timer').style.color = "var(--accent)";
    document.getElementById('start-btn').disabled = false;
    document.getElementById('start-btn').style.opacity = "1";
}

function updateTimerDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    let timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.getElementById('timer').innerText = timeString;
    document.getElementById('fs-timer').innerText = timeString;
}


function addPoint(team) {
    SoundEngine.playDing();

    confetti({
        particleCount: 250,
        spread: 70,
        origin: { y: 0.7 },
        zIndex: 10000
    });

    confetti({
        particleCount: 500,
        spread: 70,
        origin: { x: 1, y: 1 },
        zIndex: 10000
    });

    confetti({
        particleCount: 500,
        spread: 70,
        origin: { x: 0, y: 1 },
        zIndex: 10000
    });


    scores[team]++;
    document.getElementById(`s${team}`).innerText = scores[team];

    setTimeout(() => {
        nextTurn();
    }, 500);
}

function nextTurn() {
    currentTeam = currentTeam === 1 ? 2 : 1;

    const nameDisplay = document.getElementById('team-name');
    const header = document.getElementById('header-bar');

    nameDisplay.innerText = `EQUIPO ${currentTeam}`;
    nameDisplay.className = `t${currentTeam}-text`;
    header.className = `header t${currentTeam}`;

    document.getElementById('box-1').classList.toggle('active', currentTeam === 1);
    document.getElementById('box-2').classList.toggle('active', currentTeam === 2);

    resetTimer();
    document.getElementById('verbo-name').classList.remove('visible');
    document.getElementById('verbo-name').innerText = "PELÍCULA";
    document.getElementById('category-display').innerText = "CATEGORÍA";
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log(err));
    });
}

function spin() {
    if (available.length === 0) {
        alert("¡Todos los verbos terminados! Reiniciando...");
        available = [...verbs];
    }

    document.getElementById('verbo-name').classList.remove('visible');
    resetTimer();

    const idx = Math.floor(Math.random() * available.length);
    const verb = available.splice(idx, 1)[0];

    // Mostramos el verbo
    document.getElementById('verbo-name').innerText = verb;

    // LÓGICA DE TERMINACIÓN: Extraemos las últimas 2 letras (ar, er, ir)
    const termination = verb.slice(-2).toLowerCase();
    document.getElementById('category-display').innerText = `TERMINA EN: -${termination}`;

    // Cambiamos el color de la etiqueta según la terminación para dar feedback visual
    const tag = document.getElementById('category-display');
    if (termination === 'ar') tag.style.color = '#00dfa2'; // Verde
    if (termination === 'er') tag.style.color = '#3498db'; // Azul
    if (termination === 'ir') tag.style.color = '#e50914'; // Rojo
}