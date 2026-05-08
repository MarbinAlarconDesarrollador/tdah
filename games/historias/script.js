
const characters = [

    {
        emoji: "🧙",
        text: "Un mago distraído"
    },

    {
        emoji: "🦸",
        text: "Una superheroína valiente"
    },

    {
        emoji: "🤖",
        text: "Un robot curioso"
    },

    {
        emoji: "🐉",
        text: "Un dragón amistoso"
    },

    {
        emoji: "🧒",
        text: "Un niño explorador"
    }

];

const places = [

    {
        emoji: "🌋",
        text: "Un volcán misterioso"
    },

    {
        emoji: "🏝",
        text: "Una isla perdida"
    },

    {
        emoji: "🌌",
        text: "Una galaxia lejana"
    },

    {
        emoji: "🏰",
        text: "Un castillo encantado"
    },

    {
        emoji: "🌳",
        text: "Un bosque mágico"
    }

];

const objects = [

    {
        emoji: "💎",
        text: "Una piedra brillante"
    },

    {
        emoji: "🗝",
        text: "Una llave dorada"
    },

    {
        emoji: "📖",
        text: "Un libro antiguo"
    },

    {
        emoji: "🧭",
        text: "Una brújula mágica"
    },

    {
        emoji: "🎒",
        text: "Una mochila misteriosa"
    }

];

const character =
    document.getElementById("character");

const place =
    document.getElementById("place");

const object =
    document.getElementById("object");

const characterEmoji =
    document.getElementById("characterEmoji");

const placeEmoji =
    document.getElementById("placeEmoji");

const objectEmoji =
    document.getElementById("objectEmoji");

const start =
    document.getElementById("start");

const middle =
    document.getElementById("middle");

const end =
    document.getElementById("end");

const bar =
    document.getElementById("bar");

const progressText =
    document.getElementById("progressText");

const saveMessage =
    document.getElementById("saveMessage");

/* =========================
   GENERATE ELEMENTS
========================= */

function randomItem(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];
}

function generateStoryElements() {

    const char =
        randomItem(characters);

    const pla =
        randomItem(places);

    const obj =
        randomItem(objects);

    character.innerHTML =
        char.text;

    characterEmoji.innerHTML =
        char.emoji;

    place.innerHTML =
        pla.text;

    placeEmoji.innerHTML =
        pla.emoji;

    object.innerHTML =
        obj.text;

    objectEmoji.innerHTML =
        obj.emoji;
}

/* =========================
   PROGRESS
========================= */

function updateProgress() {

    let progress = 0;

    if (start.value.trim() !== "") {
        progress += 33;
    }

    if (middle.value.trim() !== "") {
        progress += 33;
    }

    if (end.value.trim() !== "") {
        progress += 34;
    }

    bar.style.width =
        progress + "%";

    progressText.innerHTML =
        progress + "%";
}

/* =========================
   CLEAR
========================= */

function clearStory() {

    start.value = "";
    middle.value = "";
    end.value = "";

    updateProgress();

    saveMessage.innerHTML = "";
}

/* =========================
   SAVE
========================= */

function saveStory() {

    if (
        start.value.trim() === "" ||
        middle.value.trim() === "" ||
        end.value.trim() === ""
    ) {

        saveMessage.innerHTML =
            "⚠️ Completa toda la historia.";

        saveMessage.style.color =
            "var(--danger)";

        return;
    }

    saveMessage.innerHTML =
        "✅ Historia guardada correctamente.";

    saveMessage.style.color =
        "var(--success)";
}

/* =========================
   EVENTS
========================= */

[start, middle, end].forEach(field => {

    field.addEventListener(
        "input",
        updateProgress
    );

});

/* =========================
   INIT
========================= */

generateStoryElements();

updateProgress();
