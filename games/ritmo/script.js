
/* =========================
   ELEMENTS
========================= */

const board =
    document.getElementById("board");

const scoreText =
    document.getElementById("score");

const comboText =
    document.getElementById("comboValue");

const levelText =
    document.getElementById("level");

const combo =
    document.getElementById("combo");

const message =
    document.getElementById("message");

const buttons =
    document.querySelectorAll(".btn");

/* =========================
   GAME STATE
========================= */

let score = 0;
let comboCount = 0;
let level = 1;

let speed = 4200;

let gameStarted = false;

let touchLocked = false;

/* =========================
   LANES
========================= */

const laneData = [

    {
        color: "red",
        x: 2
    },

    {
        color: "orange",
        x: 27
    },

    {
        color: "green",
        x: 52
    },

    {
        color: "blue",
        x: 77
    }

];

/* =========================
   CREATE NOTE
========================= */

function createNote() {

    const lane =
        Math.floor(Math.random() * 4);

    const note =
        document.createElement("div");

    note.classList.add(
        "note",
        laneData[lane].color
    );

    note.dataset.lane = lane;

    note.style.left =
        laneData[lane].x + "%";

    note.style.animationDuration =
        speed + "ms";

    board.appendChild(note);

    setTimeout(() => {

        if (note.parentNode) {

            note.remove();

            comboCount = 0;

            comboText.innerHTML = 0;
        }

    }, speed + 100);

}

/* =========================
   HIT NOTE
========================= */

function hitLane(lane) {

    const notes =
        document.querySelectorAll(".note");

    let hit = false;

    notes.forEach(note => {

        const rect =
            note.getBoundingClientRect();

        const boardRect =
            board.getBoundingClientRect();

        const noteY =
            rect.top - boardRect.top;

        const hitZone =
            window.innerWidth <= 768
                ? board.offsetHeight - 210
                : board.offsetHeight - 240;

        if (
            parseInt(note.dataset.lane)
            === lane &&
            noteY > hitZone &&
            noteY < hitZone + 120
        ) {

            note.classList.add("hit");

            setTimeout(() => {

                note.remove();

            }, 200);

            hit = true;

            score += 10;

            comboCount++;

            if (comboCount % 10 === 0) {

                level++;

                levelText.innerHTML =
                    level;

                speed =
                    Math.max(
                        1800,
                        speed - 250
                    );
            }

            scoreText.innerHTML =
                score;

            comboText.innerHTML =
                comboCount;

            showCombo();

            playTone(lane);

            if (navigator.vibrate) {

                navigator.vibrate(40);
            }

        }

    });

    if (!hit) {

        comboCount = 0;

        comboText.innerHTML = 0;

        showMiss();

        if (navigator.vibrate) {

            navigator.vibrate(20);
        }
    }
}

/* =========================
   EFFECTS
========================= */

function showCombo() {

    combo.classList.remove("show");

    void combo.offsetWidth;

    combo.classList.add("show");

    message.innerHTML = randomMessage();

    message.classList.remove("show");

    void message.offsetWidth;

    message.classList.add("show");
}

function showMiss() {

    message.innerHTML = "💛 Intenta otra vez";

    message.classList.remove("show");

    void message.offsetWidth;

    message.classList.add("show");
}

function randomMessage() {

    const messages = [

        "🎯 PERFECTO",
        "🔥 GENIAL",
        "⭐ SUPER",
        "🎵 RITMO",
        "🚀 EXCELENTE"
    ];

    return messages[
        Math.floor(
            Math.random() *
            messages.length
        )
    ];
}

/* =========================
   AUDIO
========================= */

function playTone(lane) {

    const frequencies = [
        261,
        329,
        392,
        523
    ];

    const ctx =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    const osc =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    osc.type = "triangle";

    osc.frequency.value =
        frequencies[lane];

    osc.connect(gain);

    gain.connect(ctx.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 0.3
    );

    osc.stop(
        ctx.currentTime + 0.3
    );
}

/* =========================
   GAME LOOP
========================= */

function startGame() {

    if (gameStarted) return;

    gameStarted = true;

    setInterval(() => {

        createNote();

    }, 900);
}

/* =========================
   MOBILE + TOUCH
========================= */

buttons.forEach(btn => {

    btn.addEventListener(
        "touchstart",
        e => {

            e.preventDefault();

            if (touchLocked) return;

            touchLocked = true;

            setTimeout(() => {

                touchLocked = false;

            }, 80);

            startGame();

            const lane =
                parseInt(
                    btn.dataset.lane
                );

            btn.classList.add("active");

            setTimeout(() => {

                btn.classList.remove("active");

            }, 120);

            hitLane(lane);

        });

    btn.addEventListener(
        "click",
        () => {

            startGame();

            const lane =
                parseInt(
                    btn.dataset.lane
                );

            btn.classList.add("active");

            setTimeout(() => {

                btn.classList.remove("active");

            }, 120);

            hitLane(lane);

        });

});

/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    e => {

        const map = {

            a: 0,
            s: 1,
            d: 2,
            f: 3
        };

        const lane =
            map[e.key.toLowerCase()];

        if (lane === undefined) return;

        startGame();

        const btn =
            document.querySelector(
                `.btn[data-lane="${lane}"]`
            );

        btn.classList.add("active");

        setTimeout(() => {

            btn.classList.remove("active");

        }, 120);

        hitLane(lane);

    });
