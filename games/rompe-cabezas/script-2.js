
const board = document.getElementById("board");
const timeText = document.getElementById("time");
const correctText = document.getElementById("correct");
const message = document.getElementById("message");
const levelText = document.getElementById("levelText");
const preview = document.getElementById("preview");
const guideImage = document.getElementById("guideImage");

let size = 3;
let draggedPiece = null;
let correct = 0;
let time = 0;
let timer;

// Touch drag state
let touchClone = null;
let touchOffsetX = 0;
let touchOffsetY = 0;
let touchSourceSlot = null;

const images = [
    "https://picsum.photos/id/237/600",
    "https://picsum.photos/id/1025/600",
    "https://picsum.photos/id/1069/600",
    "https://picsum.photos/id/1074/600",
    "https://picsum.photos/id/1084/600"
];

let currentImage = "";

function setLevel(value, el) {
    size = value;
    document.querySelectorAll(".level")
        .forEach(btn => btn.classList.remove("active"));
    el.classList.add("active");
    levelText.innerHTML =
        value === 3 ? "Fácil" :
            value === 4 ? "Medio" :
                "Difícil";
    startGame();
}

function startGame() {
    clearInterval(timer);
    correct = 0;
    time = 0;
    updateUI();
    message.innerHTML = "";
    currentImage = images[Math.floor(Math.random() * images.length)];
    guideImage.src = currentImage;
    createBoard();
    timer = setInterval(() => {
        time++;
        timeText.innerHTML = time;
    }, 1000);
}

function createBoard() {
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${size},1fr)`;

    let positions = [];
    for (let i = 0; i < size * size; i++) {
        positions.push(i);
    }
    positions.sort(() => Math.random() - 0.5);

    positions.forEach((randomPos, index) => {
        const slot = document.createElement("div");
        slot.className = "slot";
        slot.dataset.index = index;

        // Desktop drag-and-drop events
        slot.addEventListener("dragover", e => e.preventDefault());
        slot.addEventListener("drop", dropPiece);

        const piece = document.createElement("div");
        piece.className = "piece";
        piece.draggable = true;
        piece.dataset.correct = index;
        piece.dataset.current = randomPos;
        piece.style.backgroundImage = `url(${currentImage})`;
        piece.style.backgroundSize = `${size * 100}% ${size * 100}%`;

        const x = randomPos % size;
        const y = Math.floor(randomPos / size);
        piece.style.backgroundPosition =
            `${(x / (size - 1)) * 100}% ${(y / (size - 1)) * 100}%`;

        // Desktop events
        piece.addEventListener("dragstart", () => {
            draggedPiece = piece;
            piece.classList.add("dragging");
        });
        piece.addEventListener("dragend", () => {
            piece.classList.remove("dragging");
        });

        // ── Mobile touch events ──────────────────────────────────────
        piece.addEventListener("touchstart", onTouchStart, { passive: false });
        piece.addEventListener("touchmove", onTouchMove, { passive: false });
        piece.addEventListener("touchend", onTouchEnd, { passive: false });

        slot.appendChild(piece);
        board.appendChild(slot);
    });

    checkBoard();
}

// ── Touch handlers ───────────────────────────────────────────────────────────

function onTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const piece = e.currentTarget;

    touchSourceSlot = piece.parentNode;
    draggedPiece = piece;

    // Create a visual clone that follows the finger
    touchClone = piece.cloneNode(true);
    const rect = piece.getBoundingClientRect();

    touchOffsetX = touch.clientX - rect.left;
    touchOffsetY = touch.clientY - rect.top;

    touchClone.style.cssText = `
        position: fixed;
        width: ${rect.width}px;
        height: ${rect.height}px;
        left: ${touch.clientX - touchOffsetX}px;
        top: ${touch.clientY - touchOffsetY}px;
        opacity: 0.75;
        pointer-events: none;
        z-index: 9999;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        background-image: ${piece.style.backgroundImage};
        background-size: ${piece.style.backgroundSize};
        background-position: ${piece.style.backgroundPosition};
        transition: none;
    `;
    document.body.appendChild(touchClone);
    piece.style.opacity = "0.3";
}

function onTouchMove(e) {
    e.preventDefault();
    if (!touchClone) return;
    const touch = e.touches[0];
    touchClone.style.left = `${touch.clientX - touchOffsetX}px`;
    touchClone.style.top = `${touch.clientY - touchOffsetY}px`;
}

function onTouchEnd(e) {
    e.preventDefault();
    if (!touchClone || !draggedPiece) return;

    const touch = e.changedTouches[0];

    // Clean up clone before hit-testing (so it doesn't block elementFromPoint)
    touchClone.remove();
    touchClone = null;
    draggedPiece.style.opacity = "";

    // Find which slot is under the finger
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    let targetSlot = null;
    if (target) {
        if (target.classList.contains("slot")) {
            targetSlot = target;
        } else if (target.classList.contains("piece")) {
            targetSlot = target.parentNode;
        }
    }

    if (targetSlot && targetSlot !== touchSourceSlot) {
        const targetPiece = targetSlot.querySelector(".piece");
        if (targetPiece) {
            // Swap the two pieces
            touchSourceSlot.appendChild(targetPiece);
            targetSlot.appendChild(draggedPiece);
        }
    }

    draggedPiece = null;
    touchSourceSlot = null;
    checkBoard();
}

// ── Core game logic ──────────────────────────────────────────────────────────

function dropPiece() {
    const targetPiece = this.querySelector(".piece");
    if (!targetPiece || !draggedPiece) return;

    const parent1 = draggedPiece.parentNode;
    const parent2 = targetPiece.parentNode;

    parent1.appendChild(targetPiece);
    parent2.appendChild(draggedPiece);

    checkBoard();
}

function checkBoard() {
    correct = 0;
    const pieces = document.querySelectorAll(".piece");

    pieces.forEach(piece => {
        const slotIndex = parseInt(piece.parentNode.dataset.index);
        const correctIndex = parseInt(piece.dataset.current);

        if (slotIndex === correctIndex) {
            piece.classList.add("correct");
            correct++;
        } else {
            piece.classList.remove("correct");
        }
    });

    updateUI();

    if (correct === size * size) {
        clearInterval(timer);
        message.innerHTML = `🏆 ¡Excelente trabajo! Completaste el rompecabezas.`;
    }
}

function shufflePieces() {
    createBoard();
}

function toggleGuide() {
    preview.style.display = preview.style.display === "none" ? "block" : "none";
}

function updateUI() {
    correctText.innerHTML = `${correct}/${size * size}`;
    timeText.innerHTML = time;
}

startGame();
