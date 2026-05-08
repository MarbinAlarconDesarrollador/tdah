
/* =========================
   ELEMENTS
========================= */

const actionZone =
    document.getElementById("actionZone");

const commandText =
    document.getElementById("command");

const feedback =
    document.getElementById("feedback");

const scoreText =
    document.getElementById("score");

const levelText =
    document.getElementById("levelText");

const modeText =
    document.getElementById("modeText");

const bar =
    document.getElementById("bar");

/* =========================
   GAME STATE
========================= */

let score = 0;
let level = 1;

let currentAnswer = "";

const modes = [
    "colors",
    "animals",
    "poses"
];

/* =========================
   DATA
========================= */

const colors = [

    {
        name: "azul",
        class: "blue",
        emoji: "🔵"
    },

    {
        name: "rojo",
        class: "red",
        emoji: "🔴"
    },

    {
        name: "verde",
        class: "green",
        emoji: "🟢"
    },

    {
        name: "amarillo",
        class: "yellow",
        emoji: "🟡"
    }

];

const animals = [

    {
        emoji: "🐶",
        name: "perro"
    },

    {
        emoji: "🐱",
        name: "gato"
    },

    {
        emoji: "🐵",
        name: "mono"
    },

    {
        emoji: "🦁",
        name: "león"
    },

    {
        emoji: "🐸",
        name: "rana"
    },

    {
        emoji: "🐰",
        name: "conejo"
    }

];

const poses = [

    {
        emoji: "🧘",
        text: "Imita la pose de meditación"
    },

    {
        emoji: "🦅",
        text: "Abre los brazos como un ave"
    },

    {
        emoji: "🦘",
        text: "Salta como un canguro"
    },

    {
        emoji: "💪",
        text: "Haz pose de superhéroe"
    }

];

/* =========================
   NEW CHALLENGE
========================= */

function newChallenge() {

    feedback.innerHTML = "";

    actionZone.innerHTML = "";

    const mode =
        modes[
        Math.floor(
            Math.random() *
            modes.length
        )
        ];

    if (mode === "colors") {

        renderColors();

    } else if (mode === "animals") {

        renderAnimals();

    } else {

        renderPose();
    }
}

/* =========================
   COLORS
========================= */

function renderColors() {

    modeText.innerHTML =
        "🎨 Modo Colores";

    const target =
        colors[
        Math.floor(
            Math.random() *
            colors.length
        )
        ];

    currentAnswer =
        target.name;

    commandText.innerHTML =
        `Toca el color ${target.name}`;

    const grid =
        document.createElement("div");

    grid.className =
        "color-grid pop";

    shuffle(colors).forEach(color => {

        const btn =
            document.createElement("div");

        btn.className =
            `color-btn ${color.class}`;

        btn.onclick = () => {

            checkAnswer(
                color.name
            );
        };

        grid.appendChild(btn);

    });

    actionZone.appendChild(grid);
}

/* =========================
   ANIMALS
========================= */

function renderAnimals() {

    modeText.innerHTML =
        "🐶 Modo Animales";

    const target =
        animals[
        Math.floor(
            Math.random() *
            animals.length
        )
        ];

    currentAnswer =
        target.name;

    commandText.innerHTML =
        `Toca el ${target.name}`;

    const zone =
        document.createElement("div");

    zone.className =
        "animal-zone pop";

    shuffle(animals).forEach(animal => {

        const card =
            document.createElement("div");

        card.className =
            "animal";

        card.innerHTML = `

            <div class="animal-emoji">
                ${animal.emoji}
            </div>

            <div class="animal-name">
                ${animal.name}
            </div>

        `;

        card.onclick = () => {

            checkAnswer(
                animal.name
            );
        };

        zone.appendChild(card);

    });

    actionZone.appendChild(zone);
}

/* =========================
   POSES
========================= */

function renderPose() {

    modeText.innerHTML =
        "🧍 Modo Poses";

    const pose =
        poses[
        Math.floor(
            Math.random() *
            poses.length
        )
        ];

    currentAnswer = "pose";

    commandText.innerHTML =
        pose.text;

    const zone =
        document.createElement("div");

    zone.className =
        "pose-zone pop";

    zone.innerHTML = `

        <div class="pose-emoji">
            ${pose.emoji}
        </div>

        <div class="pose-text">
            Haz la pose y luego toca abajo
        </div>

        <button
            class="primary"
            onclick="completePose()"
        >
            ✅ Ya hice la pose
        </button>

    `;

    actionZone.appendChild(zone);
}

/* =========================
   CHECK
========================= */

function checkAnswer(answer) {

    if (answer === currentAnswer) {

        success();

    } else {

        fail();
    }
}

function completePose() {

    success();
}

function success() {

    feedback.innerHTML =
        "🎉 ¡Excelente!";

    feedback.style.color =
        "var(--success)";

    score += 10;

    if (score % 50 === 0) {

        level++;
    }

    updateUI();

    playSuccess();

    if (navigator.vibrate) {

        navigator.vibrate(60);
    }

    setTimeout(() => {

        newChallenge();

    }, 1000);
}

function fail() {

    feedback.innerHTML =
        "💛 Intenta nuevamente";

    feedback.style.color =
        "var(--danger)";

    playFail();

    if (navigator.vibrate) {

        navigator.vibrate(20);
    }
}

/* =========================
   UI
========================= */

function updateUI() {

    scoreText.innerHTML =
        score;

    levelText.innerHTML =
        `Nivel ${level}`;

    const percent =
        Math.min(
            (score / 200) * 100,
            100
        );

    bar.style.width =
        percent + "%";
}

/* =========================
   AUDIO
========================= */

function playSuccess() {

    const ctx =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    const osc =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    osc.frequency.value = 520;

    osc.type = "triangle";

    osc.connect(gain);

    gain.connect(ctx.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + .4
    );

    osc.stop(
        ctx.currentTime + .4
    );
}

function playFail() {

    const ctx =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    const osc =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    osc.frequency.value = 180;

    osc.type = "sine";

    osc.connect(gain);

    gain.connect(ctx.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + .4
    );

    osc.stop(
        ctx.currentTime + .4
    );
}

/* =========================
   HELPERS
========================= */

function shuffle(array) {

    return [...array].sort(() =>
        Math.random() - 0.5
    );
}

function resetGame() {

    score = 0;

    level = 1;

    updateUI();

    feedback.innerHTML = "";

    newChallenge();
}

/* =========================
   INIT
========================= */

newChallenge();

updateUI();
