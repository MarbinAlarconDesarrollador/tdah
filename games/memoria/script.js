// Lista ampliada de emojis
const allEmojis = ['🐶', '🐱', '🚀', '⭐', '🍎', '🚗', '🐸', '🐼', '🎈', '🍕', '🎸', '⚽', '🦋', '🌻', '🦖'];

let flippedCards = [];
let matched = 0;
let currentLevel = 1;
let emojisForLevel = [];

function initLevel() {
    // 1. Reiniciar variables para el nuevo nivel
    flippedCards = [];
    matched = 0;
    const board = document.getElementById('game-board');
    board.innerHTML = ''; // Limpiar tablero
    document.getElementById('level-indicator').innerText = `Nivel ${currentLevel}`;

    // 2. Lógica de progresión (Nivel 1 = 3 pares, Nivel 2 = 4 pares, etc.)
    let pairs = 2 + currentLevel; 
    
    // Evitar pedir más pares de los emojis que tenemos disponibles
    if (pairs > allEmojis.length) pairs = allEmojis.length;

    // 3. Preparar las cartas del nivel
    let selectedEmojis = allEmojis.slice(0, pairs);
    emojisForLevel = [...selectedEmojis, ...selectedEmojis]; // Duplicarlos para hacer pares
    
    // 4. Ajustar el diseño del tablero dinámicamente según la cantidad de cartas
    let columns = 3; 
    if (emojisForLevel.length >= 8 && emojisForLevel.length <= 12) columns = 4;
    if (emojisForLevel.length > 12) columns = 5;
    board.style.gridTemplateColumns = `repeat(${columns}, 70px)`;

    // 5. Barajar y dibujar cartas
    emojisForLevel.sort(() => 0.5 - Math.random()).forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = emoji;
        card.innerHTML = emoji;
        card.onclick = () => flipCard(card);
        board.appendChild(card);
    });
}

function flipCard(card) {
    // Evitar que el niño voltee más de 2 cartas rápido o toque cartas ya volteadas/emparejadas
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        flippedCards.push(card);
        if (flippedCards.length === 2) checkMatch();
    }
}

function checkMatch() {
    const [c1, c2] = flippedCards;
    
    if (c1.dataset.value === c2.dataset.value) {
        // ¡Hay coincidencia!
        matched += 2;
        flippedCards = [];
        
        // Refuerzo visual inmediato
        c1.classList.add('matched');
        c2.classList.add('matched');

        // ¿Terminó el nivel?
        if (matched === emojisForLevel.length) {
            setTimeout(() => {
                currentLevel++;
                initLevel(); // Carga el siguiente nivel automáticamente
            }, 1000); // Pequeña pausa para que vea que ganó
        }
    } else {
        // No coinciden, se voltean de nuevo tras 1 segundo
        setTimeout(() => {
            c1.classList.remove('flipped');
            c2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Arrancar el juego en el nivel 1
initLevel();