
const patternContainer =
    document.getElementById("pattern");

const optionsContainer =
    document.getElementById("options");

const feedback =
    document.getElementById("feedback");

const scoreText =
    document.getElementById("score");

const levelText =
    document.getElementById("level");

const bar =
    document.getElementById("bar");

const stars =
    document.querySelectorAll(".star");

const livesText =
    document.getElementById("lives");

const tip =
    document.getElementById("tip");

let score = 0;
let level = 1;
let total = 0;
let lives = 3;

let currentAnswer = null;

const levels = [

    {
        tip: "🔵 Los patrones simples repiten elementos.",

        patterns: [
            {
                seq: ["🔵", "🔴", "🔵", "🔴", "?"],
                answer: "🔵",
                options: ["🔵", "🟢", "🟡", "🔴"]
            },

            {
                seq: ["🟩", "🟨", "🟩", "🟨", "?"],
                answer: "🟩",
                options: ["🟩", "🟥", "🟦", "🟨"]
            }
        ]
    },

    {
        tip: "🧠 Observa cambios dobles en la secuencia.",

        patterns: [
            {
                seq: ["⭐", "⭐", "🌙", "⭐", "⭐", "🌙", "?"],
                answer: "⭐",
                options: ["⭐", "🌙", "☀️", "🌈"]
            },

            {
                seq: ["🟢", "🔵", "🟢", "🔵", "🟢", "?"],
                answer: "🔵",
                options: ["🟣", "🔵", "🟢", "🔴"]
            }
        ]
    },

    {
        tip: "🚀 Los niveles avanzados combinan lógica y memoria.",

        patterns: [
            {
                seq: ["🍎", "🍌", "🍇", "🍎", "🍌", "🍇", "?"],
                answer: "🍎",
                options: ["🍇", "🍎", "🍉", "🍌"]
            },

            {
                seq: ["1️⃣", "2️⃣", "3️⃣", "1️⃣", "2️⃣", "?"],
                answer: "3️⃣",
                options: ["4️⃣", "2️⃣", "3️⃣", "1️⃣"]
            }
        ]
    }

];

function nextPattern() {

    feedback.innerHTML = "";

    patternContainer.innerHTML = "";

    optionsContainer.innerHTML = "";

    const currentLevel =
        levels[level - 1];

    tip.innerHTML =
        currentLevel.tip;

    const pattern =
        currentLevel.patterns[
        Math.floor(
            Math.random() *
            currentLevel.patterns.length
        )
        ];

    currentAnswer =
        pattern.answer;

    pattern.seq.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "item";

        if (item === "?") {

            div.classList.add("question");
        }

        div.innerHTML = item;

        patternContainer.appendChild(div);

    });

    shuffle(pattern.options)
        .forEach(option => {

            const btn =
                document.createElement("div");

            btn.className = "option";

            btn.innerHTML = option;

            btn.onclick = () =>
                checkAnswer(btn, option);

            optionsContainer.appendChild(btn);

        });

    levelText.innerHTML =
        `Nivel ${level}`;
}

function checkAnswer(element, answer) {

    const all =
        document.querySelectorAll(".option");

    all.forEach(btn =>
        btn.style.pointerEvents = "none"
    );

    total++;

    if (answer === currentAnswer) {

        element.classList.add("correct");

        feedback.innerHTML =
            "🎉 ¡Excelente!";

        playSuccess();

        score += 10;

        if (score % 30 === 0 && level < 3) {

            level++;

            updateStars();
        }

    } else {

        element.classList.add("wrong");

        feedback.innerHTML =
            "💛 Intenta observar mejor";

        playFail();

        lives--;

        updateLives();

        all.forEach(btn => {

            if (btn.innerHTML === currentAnswer) {

                btn.classList.add("correct");
            }

        });

        if (lives <= 0) {

            setTimeout(() => {

                alert("🎮 Juego terminado");

                resetGame();

            }, 500);
        }
    }

    scoreText.innerHTML = score;

    updateProgress();
}

function updateProgress() {

    const percent =
        Math.min((score / 90) * 100, 100);

    bar.style.width =
        percent + "%";
}

function updateStars() {

    stars.forEach((star, index) => {

        if (index < level) {

            star.classList.add("active");

        } else {

            star.classList.remove("active");
        }
    });
}

function updateLives() {

    let hearts = "";

    for (let i = 0; i < lives; i++) {

        hearts += "❤️ ";
    }

    livesText.innerHTML = hearts;
}

function resetGame() {

    score = 0;
    level = 1;
    total = 0;
    lives = 3;

    scoreText.innerHTML = "0";

    updateProgress();
    updateStars();
    updateLives();

    nextPattern();
}

function shuffle(array) {

    return [...array].sort(() =>
        Math.random() - 0.5
    );
}

function playSuccess() {

    const ctx =
        new (window.AudioContext ||
            window.webkitAudioContext)();

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
        ctx.currentTime + .5
    );

    osc.stop(ctx.currentTime + .5);
}

function playFail() {

    const ctx =
        new (window.AudioContext ||
            window.webkitAudioContext)();

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
        ctx.currentTime + .5
    );

    osc.stop(ctx.currentTime + .5);
}

nextPattern();