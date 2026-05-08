
/* =========================
   ELEMENTS
========================= */

const mazeElement =
    document.getElementById("maze");

const levelText =
    document.getElementById("levelText");

const movesText =
    document.getElementById("movesText");

const feedback =
    document.getElementById("feedback");

const scoreText =
    document.getElementById("score");

const bar =
    document.getElementById("bar");

/* =========================
   GAME STATE
========================= */

let level = 1;
let score = 0;
let moves = 0;

let player = { x: 1, y: 1 };

let maze = [];

/* =========================
   LEVELS
========================= */

const levels = [

    [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 2, 1],
        [1, 0, 1, 1, 0, 1, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
    ],

    [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 2, 1],
        [1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ],

    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 2, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]

];

/* =========================
   INIT LEVEL
========================= */

function loadLevel() {

    maze =
        JSON.parse(
            JSON.stringify(
                levels[level - 1]
            )
        );

    player = { x: 1, y: 1 };

    moves = 0;

    feedback.innerHTML = "";

    renderMaze();

    updateUI();
}

/* =========================
   RENDER
========================= */

function renderMaze() {

    mazeElement.innerHTML = "";

    mazeElement.style.gridTemplateColumns =
        `repeat(${maze[0].length},1fr)`;

    maze.forEach((row, y) => {

        row.forEach((cell, x) => {

            const div =
                document.createElement("div");

            div.classList.add("cell");

            if (cell === 1) {

                div.classList.add("wall");

            } else {

                div.classList.add("path");
            }

            if (cell === 3) {

                div.classList.add("visited");
            }

            if (cell === 2) {

                div.classList.add("goal");

                div.innerHTML = "⭐";
            }

            if (
                player.x === x &&
                player.y === y
            ) {

                div.classList.add("player");

                div.innerHTML = "🧒";
            }

            mazeElement.appendChild(div);

        });

    });
}

/* =========================
   MOVE
========================= */

function movePlayer(dx, dy) {

    const nx =
        player.x + dx;

    const ny =
        player.y + dy;

    const cell =
        maze[ny][nx];

    if (cell === 1) {

        playFail();

        return;
    }

    maze[player.y][player.x] = 3;

    player.x = nx;
    player.y = ny;

    moves++;

    renderMaze();

    updateUI();

    playMove();

    if (navigator.vibrate) {

        navigator.vibrate(25);
    }

    if (cell === 2) {

        winLevel();
    }
}

/* =========================
   WIN
========================= */

function winLevel() {

    feedback.innerHTML =
        "🎉 ¡Nivel completado!";

    feedback.style.color =
        "var(--success)";

    score += 100;

    updateUI();

    playSuccess();

    if (navigator.vibrate) {

        navigator.vibrate([60, 40, 60]);
    }

    setTimeout(() => {

        if (level < levels.length) {

            level++;

            loadLevel();

        } else {

            feedback.innerHTML =
                "🏆 ¡Completaste todos los niveles!";

        }

    }, 1400);
}

/* =========================
   UI
========================= */

function updateUI() {

    levelText.innerHTML =
        `Nivel ${level}`;

    movesText.innerHTML =
        `Movimientos: ${moves}`;

    scoreText.innerHTML =
        score;

    const percent =
        Math.min(
            (score / 300) * 100,
            100
        );

    bar.style.width =
        percent + "%";
}

/* =========================
   AUDIO
========================= */

function playMove() {

    const ctx =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    const osc =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    osc.frequency.value = 280;

    osc.type = "triangle";

    osc.connect(gain);

    gain.connect(ctx.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + .1
    );

    osc.stop(
        ctx.currentTime + .1
    );
}

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
        ctx.currentTime + .5
    );

    osc.stop(
        ctx.currentTime + .5
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

    osc.frequency.value = 120;

    osc.type = "sine";

    osc.connect(gain);

    gain.connect(ctx.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + .3
    );

    osc.stop(
        ctx.currentTime + .3
    );
}

/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    e => {

        if (e.key === "ArrowUp") {

            movePlayer(0, -1);
        }

        if (e.key === "ArrowDown") {

            movePlayer(0, 1);
        }

        if (e.key === "ArrowLeft") {

            movePlayer(-1, 0);
        }

        if (e.key === "ArrowRight") {

            movePlayer(1, 0);
        }

    });

/* =========================
   RESET
========================= */

function nextLevel() {

    if (level < levels.length) {

        level++;

    } else {

        level = 1;
    }

    loadLevel();
}

function resetGame() {

    level = 1;

    score = 0;

    moves = 0;

    loadLevel();
}

/* =========================
   INIT
========================= */

loadLevel();

