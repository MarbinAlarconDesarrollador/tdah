const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 'red'; // 'red' o 'yellow'
let gameOver = false;

function initGame() {
    const boardElement = document.getElementById('c4-board');

    // Limpia el HTML existente para asegurar que el tablero aparezca desde cero
    boardElement.innerHTML = '';

    // Reinicia la matriz lógica
    board = Array(ROWS).fill().map(() => Array(COLS).fill(null));
    gameOver = false;
    currentPlayer = 'red';

    // Actualiza el texto del turno
    updateStatus();

    // Crea las celdas físicamente
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.onclick = () => dropPiece(c);
            boardElement.appendChild(cell);
        }
    }
}

function dropPiece(col) {
    if (gameOver) return;

    // Lógica de "gravedad": busca el hueco libre más bajo
    for (let r = ROWS - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            renderBoard();

            if (checkWin(r, col)) {
                gameOver = true;
                // Mensaje de victoria muy visual
                document.getElementById('status').innerHTML = `🎉 ¡GANÓ EL EQUIPO ${currentPlayer === 'red' ? 'ROJO' : 'AMARILLO'}!`;
                return;
            }

            // Cambiar turno
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            updateStatus();
            return;
        }
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const r = cell.dataset.row;
        const c = cell.dataset.col;
        cell.className = 'cell'; // Reset
        if (board[r][c]) cell.classList.add(board[r][c]);
    });
}

function updateStatus() {
    const span = document.getElementById('current-player');
    span.innerText = currentPlayer === 'red' ? 'Rojo' : 'Amarillo';
    span.style.color = currentPlayer === 'red' ? 'var(--player1)' : 'var(--player2)';
}

function checkWin(r, c) {
    const directions = [
        [[0, 1], [0, -1]], // Horizontal
        [[1, 0], [-1, 0]], // Vertical
        [[1, 1], [-1, -1]], // Diagonal \
        [[1, -1], [-1, 1]]  // Diagonal /
    ];

    for (let dir of directions) {
        let count = 1;
        for (let [dr, dc] of dir) {
            let nr = r + dr;
            let nc = c + dc;
            while (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === currentPlayer) {
                count++;
                nr += dr;
                nc += dc;
            }
        }
        if (count >= 4) return true;
    }
    return false;
}

function resetGame() {
    // 1. Resetear el estado visual del panel de estado
    const statusPanel = document.getElementById('status');
    statusPanel.innerHTML = 'Es el turno de: <span id="current-player">Rojo</span>';

    // 2. Volver a inicializar toda la lógica y el DOM
    initGame();
}

window.onload = initGame;


