
/* =========================
   ELEMENTS
========================= */

const breathCircle =
    document.getElementById(
        "breathCircle"
    );

const exerciseText =
    document.getElementById(
        "exerciseText"
    );

const calmText =
    document.getElementById(
        "calmText"
    );

const bar =
    document.getElementById(
        "bar"
    );

const rain =
    document.getElementById(
        "rain"
    );

/* =========================
   BREATHING
========================= */

let breathing = false;

let breathInterval;

function toggleBreathing() {

    if (breathing) {

        clearInterval(
            breathInterval
        );

        breathing = false;

        breathCircle.innerHTML =
            "INHALA";

        breathCircle.classList.remove(
            "expand"
        );

        return;
    }

    breathing = true;

    startBreathing();
}

function startBreathing() {

    let inhale = true;

    breathCircle.innerHTML =
        "INHALA";

    breathCircle.classList.add(
        "expand"
    );

    breathInterval = setInterval(() => {

        inhale = !inhale;

        if (inhale) {

            breathCircle.innerHTML =
                "INHALA";

            breathCircle.classList.add(
                "expand"
            );

        } else {

            breathCircle.innerHTML =
                "EXHALA";

            breathCircle.classList.remove(
                "expand"
            );
        }

    }, 4000);
}

/* =========================
   EXERCISES
========================= */

const exercises = [

    "Aprieta las manos y luego relájalas lentamente.",

    "Cierra los ojos y cuenta hasta 5.",

    "Respira profundo 3 veces.",

    "Imagina una nube suave flotando.",

    "Relaja hombros y cuello lentamente.",

    "Escucha los sonidos a tu alrededor.",

    "Abraza tus piernas durante 5 segundos.",

    "Sonríe lentamente y respira."
];

function nextExercise() {

    const random =
        exercises[
        Math.floor(
            Math.random() *
            exercises.length
        )
        ];

    exerciseText.innerHTML =
        random;

    playSoftTone();

    updateCalm();
}

/* =========================
   RAIN
========================= */

for (let i = 0; i < 80; i++) {

    const drop =
        document.createElement("div");

    drop.classList.add("drop");

    drop.style.left =
        Math.random() * 100 + "%";

    drop.style.animationDuration =
        1 + Math.random() * 2 + "s";

    drop.style.animationDelay =
        Math.random() * 2 + "s";

    rain.appendChild(drop);
}

/* =========================
   AUDIO
========================= */

function playTone(freq, duration = 2) {

    const ctx =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    const osc =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    osc.type = "sine";

    osc.frequency.value = freq;

    osc.connect(gain);

    gain.connect(ctx.destination);

    gain.gain.value = 0.03;

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
    );

    osc.stop(
        ctx.currentTime + duration
    );
}

function playRain() {

    playTone(180, 3);

    updateCalm();
}

function playWhiteNoise() {

    playTone(120, 4);

    updateCalm();
}

function playSoftTone() {

    playTone(260, .8);
}

/* =========================
   AMBIENT SOUNDS
========================= */

function playSound(type, card) {

    document
        .querySelectorAll(".sound-card")
        .forEach(c => {

            c.classList.remove("active");
        });

    card.classList.add("active");

    if (type === "rain") {

        playTone(180, 3);

    } else if (type === "forest") {

        playTone(260, 3);

    } else if (type === "ocean") {

        playTone(140, 3);

    } else {

        playTone(220, 3);
    }

    updateCalm();
}

/* =========================
   CALM LEVEL
========================= */

let calm = 40;

function updateCalm() {

    calm += 10;

    if (calm > 100) {

        calm = 100;
    }

    bar.style.width =
        calm + "%";

    if (calm < 40) {

        calmText.innerHTML =
            "Inquieto ⚡";

    } else if (calm < 70) {

        calmText.innerHTML =
            "Relajándose 🌤️";

    } else {

        calmText.innerHTML =
            "Tranquilo 🌙";
    }
}
