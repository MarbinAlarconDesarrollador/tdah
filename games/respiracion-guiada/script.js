
const bubble = document.getElementById("bubble");
const bubbleText = document.getElementById("bubbleText");

const phase = document.getElementById("phase");
const counter = document.getElementById("counter");
const bar = document.getElementById("bar");

const fire = document.getElementById("fire");
const balloon = document.getElementById("balloon");

const stars = document.getElementById("stars");

let breathing = false;
let currentMode = 0;
let interval;

const modes = [
    "Burbuja Calmante",
    "Dragón Respirador",
    "Globo Flotante"
];

function createStars() {

    for (let i = 0; i < 40; i++) {

        const star = document.createElement("div");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 2 + "s";

        stars.appendChild(star);
    }
}

createStars();

async function startBreathing() {

    if (breathing) return;

    breathing = true;

    while (breathing) {

        await inhale();

        if (!breathing) break;

        await hold();

        if (!breathing) break;

        await exhale();
    }
}

function stopBreathing() {

    breathing = false;

    phase.innerHTML = "Pausado";

    counter.innerHTML = "0";

    bar.style.width = "0%";
}

async function inhale() {

    phase.innerHTML = "🌬 Inhala";

    bubbleText.innerHTML = "Inhala";

    animateProgress(0, 100, 4000);

    for (let i = 4; i >= 1; i--) {

        counter.innerHTML = i;

        // BURBUJA
        if (currentMode === 0) {

            bubble.style.transform =
                `translate(-50%,-50%) scale(${1 + (5 - i) * 0.15})`;
        }

        // GLOBO
        if (currentMode === 2) {

            balloon.style.bottom =
                `${80 + (5 - i) * 40}px`;
        }

        await wait(1000);
    }
}

async function hold() {

    phase.innerHTML = "🧘 Mantén";

    bubbleText.innerHTML = "Mantén";

    for (let i = 2; i >= 1; i--) {

        counter.innerHTML = i;

        await wait(1000);
    }
}

async function exhale() {

    phase.innerHTML = "😮‍💨 Exhala";

    bubbleText.innerHTML = "Exhala";

    animateProgress(100, 0, 5000);

    // DRAGÓN
    if (currentMode === 1) {

        fire.classList.add("active");
    }

    for (let i = 5; i >= 1; i--) {

        counter.innerHTML = i;

        // BURBUJA
        if (currentMode === 0) {

            bubble.style.transform =
                `translate(-50%,-50%) scale(${1 + i * 0.03})`;
        }

        // GLOBO
        if (currentMode === 2) {

            balloon.style.bottom =
                `${80 + i * 10}px`;
        }

        await wait(1000);
    }

    fire.classList.remove("active");
}

function animateProgress(from, to, duration) {

    const start = Date.now();

    const animate = () => {

        const now = Date.now();

        const progress =
            Math.min((now - start) / duration, 1);

        const value =
            from + (to - from) * progress;

        bar.style.width = value + "%";

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    animate();
}

function wait(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));
}

function nextMode() {

    currentMode++;

    if (currentMode >= modes.length) {
        currentMode = 0;
    }

    applyMode();
}

function applyMode() {

    const allModes =
        document.querySelectorAll(".mode");

    allModes.forEach(m =>
        m.classList.remove("active")
    );

    allModes[currentMode]
        .classList.add("active");

    // ELEMENTOS
    const dragon =
        document.getElementById("dragon");

    // RESET
    bubble.style.display = "none";
    dragon.style.display = "none";
    balloon.style.display = "none";
    fire.classList.remove("active");

    // =========================
    // BURBUJA
    // =========================

    if (currentMode === 0) {

        bubble.style.display = "flex";

        document.getElementById("message").innerHTML = `
            🫧 Observa cómo la burbuja crece
            al inhalar y se hace pequeña al exhalar.
        `;
    }

    // =========================
    // DRAGÓN
    // =========================

    if (currentMode === 1) {

        dragon.style.display = "block";

        document.getElementById("message").innerHTML = `
            🐲 El dragón expulsa fuego lentamente
            cuando exhalas.
        `;
    }

    // =========================
    // GLOBO
    // =========================

    if (currentMode === 2) {

        balloon.style.display = "block";

        document.getElementById("message").innerHTML = `
            🎈 El globo sube al inhalar
            y baja al exhalar.
        `;
    }
}

applyMode();