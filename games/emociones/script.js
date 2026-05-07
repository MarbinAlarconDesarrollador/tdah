
const emotions = [

    {
        name: "Feliz",
        emoji: "😊",
        mouth: "happy",
        color: "#FFD166",

        question: "¿Cómo se siente este personaje?",

        options: [
            "Feliz",
            "Triste",
            "Enojado",
            "Asustado"
        ],

        correct: "Feliz",

        tip: "😊 Cuando estamos felices podemos compartir alegría con otros."
    },

    {
        name: "Triste",
        emoji: "😢",
        mouth: "sad",
        color: "#A0C4FF",

        question: "¿Qué emoción muestra esta cara?",

        options: [
            "Emocionado",
            "Triste",
            "Feliz",
            "Sorprendido"
        ],

        correct: "Triste",

        tip: "😢 Está bien sentirse triste. Hablar ayuda mucho."
    },

    {
        name: "Enojado",
        emoji: "😠",
        mouth: "angry",
        color: "#FFADAD",

        question: "¿Qué harías si te sientes así?",

        options: [
            "Respirar profundo",
            "Gritar a todos",
            "Romper cosas",
            "Empujar"
        ],

        correct: "Respirar profundo",

        tip: "😮‍💨 Respirar y contar hasta 10 ayuda a calmarse."
    },

    {
        name: "Asustado",
        emoji: "😨",
        mouth: "fear",
        color: "#CDB4DB",

        question: "¿Cómo podrías ayudar a este personaje?",

        options: [
            "Escuchándolo",
            "Burlándote",
            "Ignorándolo",
            "Asustándolo más"
        ],

        correct: "Escuchándolo",

        tip: "🤝 Escuchar y acompañar ayuda cuando alguien tiene miedo."
    }

];

const answersDiv = document.getElementById("answers");
const emotionName = document.getElementById("emotionName");
const question = document.getElementById("question");
const feedback = document.getElementById("feedback");
const scoreText = document.getElementById("score");
const tip = document.getElementById("tip");
const face = document.getElementById("face");
const mouth = document.getElementById("mouth");

let score = 0;
let currentEmotion = null;

function drawFace(type) {

    mouth.innerHTML = "";

    if (type === "happy") {

        mouth.style.width = "90px";
        mouth.style.height = "45px";
        mouth.style.borderBottom = "8px solid #333";
        mouth.style.borderRadius = "0 0 80px 80px";
        mouth.style.top = "130px";
    }

    if (type === "sad") {

        mouth.style.width = "90px";
        mouth.style.height = "45px";
        mouth.style.borderTop = "8px solid #333";
        mouth.style.borderRadius = "80px 80px 0 0";
        mouth.style.top = "150px";
    }

    if (type === "angry") {

        mouth.style.width = "70px";
        mouth.style.height = "0";
        mouth.style.borderTop = "8px solid #333";
        mouth.style.top = "150px";
    }

    if (type === "fear") {

        mouth.style.width = "45px";
        mouth.style.height = "70px";
        mouth.style.border = "8px solid #333";
        mouth.style.borderRadius = "50%";
        mouth.style.top = "120px";
    }
}

function nextQuestion() {

    feedback.innerHTML = "";

    answersDiv.innerHTML = "";

    currentEmotion =
        emotions[Math.floor(Math.random() * emotions.length)];

    emotionName.innerHTML =
        currentEmotion.name;

    question.innerHTML =
        currentEmotion.question;

    face.style.background =
        currentEmotion.color;

    drawFace(currentEmotion.mouth);

    currentEmotion.options.forEach(option => {

        const btn = document.createElement("div");

        btn.className = "answer";

        btn.innerHTML = option;

        btn.onclick = () => checkAnswer(btn, option);

        answersDiv.appendChild(btn);
    });
}

function checkAnswer(element, answer) {

    const all =
        document.querySelectorAll(".answer");

    all.forEach(btn => btn.style.pointerEvents = "none");

    if (answer === currentEmotion.correct) {

        element.classList.add("correct");

        feedback.innerHTML =
            "🎉 ¡Muy bien!";

        score++;

        tip.innerHTML =
            currentEmotion.tip;

    } else {

        element.classList.add("wrong");

        feedback.innerHTML =
            "💛 Intentemos nuevamente";

        all.forEach(btn => {

            if (btn.innerHTML === currentEmotion.correct) {

                btn.classList.add("correct");
            }
        });
    }

    scoreText.innerHTML = score;
}

function resetGame() {

    score = 0;

    scoreText.innerHTML = score;

    nextQuestion();
}

nextQuestion();