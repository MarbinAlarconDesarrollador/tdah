const pads = document.querySelectorAll(".pad");

const levelText = document.getElementById("levelText");
const levelNumber = document.getElementById("levelNumber");
const message = document.getElementById("message");
const bestScore = document.getElementById("bestScore");
const speedText = document.getElementById("speedText");

let sequence = [];
let playerSequence = [];
let level = 1;
let playing = false;
let playerTurn = false;
let speed = 700;

const colors = ["green","red","yellow","blue"];

const sounds = {
    green:261,
    red:329,
    yellow:392,
    blue:523
};

function setSpeed(value,el){

    speed = value;

    document.querySelectorAll(".mode")
        .forEach(btn=>btn.classList.remove("active"));

    el.classList.add("active");

    speedText.innerHTML =
        value === 700 ? "Lenta" :
        value === 450 ? "Normal" :
        "Rápida";
}

function startGame(){

    resetGame();

    playing = true;

    nextRound();
}

function resetGame(){

    sequence = [];
    playerSequence = [];
    level = 1;
    playerTurn = false;

    updateUI();

    message.innerHTML =
        "🎮 Observa la secuencia...";
}

function nextRound(){

    playerTurn = false;

    playerSequence = [];

    const randomColor =
        colors[Math.floor(Math.random()*colors.length)];

    sequence.push(randomColor);

    updateUI();

    playSequence();
}

async function playSequence(){

    message.innerHTML =
        "👀 Mira atentamente";

    for(let color of sequence){

        await flash(color);

        await wait(speed/2);
    }

    playerTurn = true;

    message.innerHTML =
        "🖱 Tu turno";
}

function flash(color){

    return new Promise(resolve=>{

        const pad =
            document.querySelector(
                `[data-color="${color}"]`
            );

        playSound(color);

        pad.classList.add("active");

        setTimeout(()=>{

            pad.classList.remove("active");

            resolve();

        },speed);
    });
}

function wait(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));
}

function playSound(color){

    const audioCtx =
        new(window.AudioContext ||
        window.webkitAudioContext)();

    const oscillator =
        audioCtx.createOscillator();

    const gain =
        audioCtx.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value =
        sounds[color];

    oscillator.connect(gain);

    gain.connect(audioCtx.destination);

    oscillator.start();

    gain.gain.exponentialRampToValueAtTime(
        0.00001,
        audioCtx.currentTime + 0.5
    );

    oscillator.stop(audioCtx.currentTime + 0.5);
}

pads.forEach(pad=>{

    pad.addEventListener("click",()=>{

        if(!playerTurn) return;

        const color =
            pad.dataset.color;

        playerSequence.push(color);

        flash(color);

        checkMove();
    });
});

function checkMove(){

    const currentIndex =
        playerSequence.length - 1;

    if(
        playerSequence[currentIndex] !==
        sequence[currentIndex]
    ){

        gameOver();

        return;
    }

    if(
        playerSequence.length ===
        sequence.length
    ){

        playerTurn = false;

        message.innerHTML =
            "✅ ¡Muy bien!";

        level++;

        updateUI();

        setTimeout(()=>{

            nextRound();

        },1000);
    }
}

function gameOver(){

    playing = false;

    message.innerHTML =
        "❌ Fin del juego";

    const best =
        Math.max(
            parseInt(bestScore.innerHTML),
            level - 1
        );

    bestScore.innerHTML = best;

    navigator.vibrate?.(300);

    pads.forEach(pad=>{

        pad.classList.add("active");

        setTimeout(()=>{
            pad.classList.remove("active");
        },400);
    });
}

function updateUI(){

    levelText.innerHTML = level;
    levelNumber.innerHTML = level;
}
