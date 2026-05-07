
const stories = [

    {
        emoji: "🦊",

        title: "El Zorro Curioso",

        text: `
        Un pequeño zorro caminaba por el bosque.
        Escuchó un sonido extraño detrás de un árbol
        y encontró una <span class="highlight">llave dorada</span>.
    `,

        narration: `
        Un pequeño zorro caminaba por el bosque.
        Escuchó un sonido extraño detrás de un árbol
        y encontró una llave dorada.
    `,

        question: "¿Qué encontró el zorro?",

        options: [
            "Una llave dorada",
            "Una bicicleta",
            "Un pescado",
            "Una pelota"
        ],

        answer: "Una llave dorada",

        tip: "🧠 Recordar pequeños detalles mejora la memoria."
    },

    {
        emoji: "🐧",

        title: "El Pingüino Valiente",

        text: `
        Un pingüino quería cruzar el hielo.
        Primero observó con atención,
        luego caminó lentamente
        y finalmente llegó al otro lado.
    `,

        narration: `
        Un pingüino quería cruzar el hielo.
        Primero observó con atención,
        luego caminó lentamente
        y finalmente llegó al otro lado.
    `,

        question: "¿Qué hizo primero el pingüino?",

        options: [
            "Corrió rápido",
            "Observó con atención",
            "Saltó al agua",
            "Se durmió"
        ],

        answer: "Observó con atención",

        tip: "🎯 Observar antes de actuar ayuda a tomar mejores decisiones."
    },

    {
        emoji: "🚀",

        title: "Viaje Espacial",

        text: `
        Sofía viajó al espacio en un cohete azul.
        Allí vio estrellas brillantes
        y un planeta rojo enorme.
    `,

        narration: `
        Sofía viajó al espacio en un cohete azul.
        Allí vio estrellas brillantes
        y un planeta rojo enorme.
    `,

        question: "¿De qué color era el planeta?",

        options: [
            "Verde",
            "Azul",
            "Rojo",
            "Amarillo"
        ],

        answer: "Rojo",

        tip: "🚀 Tu imaginación también fortalece la comprensión lectora."
    }

];

const storyEmoji =
    document.getElementById("storyEmoji");

const storyTitle =
    document.getElementById("storyTitle");

const storyText =
    document.getElementById("storyText");

const question =
    document.getElementById("question");

const options =
    document.getElementById("options");

const feedback =
    document.getElementById("feedback");

const scoreText =
    document.getElementById("score");

const tip =
    document.getElementById("tip");

const bar =
    document.getElementById("bar");

let currentStory = null;
let score = 0;
let total = 0;

function nextStory() {

    feedback.innerHTML = "";

    options.innerHTML = "";

    currentStory =
        stories[Math.floor(
            Math.random() * stories.length
        )];

    storyEmoji.innerHTML =
        currentStory.emoji;

    storyTitle.innerHTML =
        currentStory.title;

    storyText.innerHTML =
        currentStory.text;

    question.innerHTML =
        currentStory.question;

    tip.innerHTML =
        currentStory.tip;

    currentStory.options.forEach(option => {

        const btn =
            document.createElement("div");

        btn.className = "option";

        btn.innerHTML = option;

        btn.onclick = () =>
            checkAnswer(btn, option);

        options.appendChild(btn);

    });
}

function checkAnswer(element, answer) {

    const all =
        document.querySelectorAll(".option");

    all.forEach(btn =>
        btn.style.pointerEvents = "none"
    );

    total++;

    if (answer === currentStory.answer) {

        element.classList.add("correct");

        feedback.innerHTML =
            "🎉 ¡Excelente comprensión!";

        score++;

        playSuccess();

    } else {

        element.classList.add("wrong");

        feedback.innerHTML =
            "💛 Sigue intentando";

        playFail();

        all.forEach(btn => {

            if (btn.innerHTML === currentStory.answer) {

                btn.classList.add("correct");
            }

        });
    }

    scoreText.innerHTML = score;

    updateProgress();
}

function updateProgress() {

    const percent =
        total === 0
            ? 0
            : (score / total) * 100;

    bar.style.width = percent + "%";
}

function resetGame() {

    score = 0;
    total = 0;

    scoreText.innerHTML = 0;

    updateProgress();

    nextStory();
}

function playNarration() {

    const speech =
        new SpeechSynthesisUtterance(
            currentStory.narration
        );

    speech.lang = "es-ES";

    speech.rate = 0.9;

    speech.pitch = 1;

    speechSynthesis.cancel();

    speechSynthesis.speak(speech);
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
        ctx.currentTime + 0.5
    );

    osc.stop(ctx.currentTime + 0.5);
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
        ctx.currentTime + 0.5
    );

    osc.stop(ctx.currentTime + 0.5);
}

nextStory();