document.addEventListener('DOMContentLoaded', () => {
    const boardEl = document.getElementById('sudoku-board');
    const checkBtn = document.getElementById('check-btn');
    const newGameBtn = document.getElementById('new-game-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const levelSelect = document.getElementById('level-select');
    const timerDisplay = document.getElementById('timer-display');
    const messageEl = document.getElementById('message');
    const hintBtn = document.getElementById('hint-btn');

    let currentLevel = 1;
    let solution = [];
    let currentBoard = [];
    let userBoard = [];

    // Variables del Cronómetro
    let secondsElapsed = 0;
    let timerInterval = null;

    // --- 1. Lógica del Cronómetro ---
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const startTimer = () => {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            secondsElapsed++;
            timerDisplay.textContent = formatTime(secondsElapsed);
            // Guardamos el tiempo cada segundo para que no se pierda al recargar
            saveGame();
        }, 1000);
    };

    const stopTimer = () => clearInterval(timerInterval);
    const resetTimer = () => {
        stopTimer();
        secondsElapsed = 0;
        timerDisplay.textContent = "00:00";
    };

    // --- 2. Lógica del Modo Oscuro ---
    const toggleTheme = () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.body.removeAttribute('data-theme');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    };
    if (localStorage.getItem('theme') === 'dark') toggleTheme();
    themeToggle.addEventListener('click', toggleTheme);

    // --- 3. Lógica de Autoguardado ---
    const saveGame = () => {
        const gameState = {
            level: currentLevel,
            solution: solution,
            initialBoard: currentBoard,
            userBoard: userBoard,
            time: secondsElapsed // Guardamos los segundos
        };
        localStorage.setItem('sudokuSave', JSON.stringify(gameState));
    };

    const loadGame = () => {
        const saved = localStorage.getItem('sudokuSave');
        if (saved) {
            const gameState = JSON.parse(saved);
            currentLevel = gameState.level;
            solution = gameState.solution;
            currentBoard = gameState.initialBoard;
            userBoard = gameState.userBoard;
            secondsElapsed = gameState.time || 0; // Cargamos los segundos

            levelSelect.value = currentLevel;
            timerDisplay.textContent = formatTime(secondsElapsed);
            return true;
        }
        return false;
    };

    // --- 4. Lógica del Sudoku ---
    const generateSolution = () => {
        const base = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const shift = (arr, k) => [...arr.slice(k), ...arr.slice(0, k)];
        const grid = [];
        for (let i = 0; i < 9; i++) {
            const k = (i % 3) * 3 + Math.floor(i / 3);
            grid.push(shift(base, k));
        }
        return grid;
    };

    const generatePuzzle = (level) => {
        solution = generateSolution();
        const cellsToRemove = Math.min(20 + (level * 10), 64);
        currentBoard = JSON.parse(JSON.stringify(solution));
        let removed = 0;
        while (removed < cellsToRemove) {
            const r = Math.floor(Math.random() * 9);
            const c = Math.floor(Math.random() * 9);
            if (currentBoard[r][c] !== 0) {
                currentBoard[r][c] = 0;
                removed++;
            }
        }
        userBoard = JSON.parse(JSON.stringify(currentBoard));
    };

    const renderBoard = () => {
        boardEl.innerHTML = '';
        messageEl.textContent = '';

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.classList.add('cell');
                input.dataset.row = r;
                input.dataset.col = c;

                // 1. Lógica de valores iniciales
                if (currentBoard[r][c] !== 0) {
                    input.value = currentBoard[r][c];
                    input.readOnly = true;
                } else {
                    if (userBoard[r][c] !== 0) {
                        input.value = userBoard[r][c];
                    }

                    // 2. Evento de entrada de datos
                    input.addEventListener('input', (e) => {
                        if (e.target.value.length > 1) e.target.value = e.target.value.slice(0, 1);
                        const val = parseInt(e.target.value) || 0;
                        userBoard[r][c] = val;

                        // Si borra el número, quitamos el color de error
                        e.target.style.color = 'var(--cell-text)';
                        saveGame();
                    });
                }

                // 3. EFECTO VISUAL: Resaltado de Fila y Columna
                input.addEventListener('focus', (e) => {
                    const row = e.target.dataset.row;
                    const col = e.target.dataset.col;

                    // Limpiar resaltados previos en todo el tablero
                    document.querySelectorAll('.cell').forEach(cell => {
                        cell.classList.remove('highlight');
                    });

                    // Añadir clase highlight a la fila y columna actual
                    document.querySelectorAll(`.cell[data-row="${row}"], .cell[data-col="${col}"]`).forEach(cell => {
                        cell.classList.add('highlight');
                    });
                });

                // 4. Limpiar resaltado al perder el foco (opcional, da limpieza)
                input.addEventListener('blur', () => {
                    // No limpiamos inmediatamente para permitir ver errores, 
                    // o puedes dejarlo para que se limpie al tocar fuera.
                    // document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('highlight'));
                });

                boardEl.appendChild(input);
            }
        }
    };

    const checkWin = () => {
        const inputs = document.querySelectorAll('.cell');
        let isCorrect = true;
        let isFull = true;

        inputs.forEach(input => {
            const r = input.dataset.row, c = input.dataset.col;
            const val = parseInt(input.value);
            if (!val) isFull = false;
            else if (val !== solution[r][c]) {
                isCorrect = false;
                input.style.color = 'red';
            }
        });

        if (isFull && isCorrect) {
            stopTimer(); // ¡Detenemos el tiempo!
            messageEl.textContent = `¡Ganaste en ${formatTime(secondsElapsed)}!`;
            messageEl.style.color = 'green';

            setTimeout(() => {
                if (currentLevel < 5) currentLevel++;
                levelSelect.value = currentLevel;
                localStorage.removeItem('sudokuSave');
                resetTimer();
                generatePuzzle(currentLevel);
                renderBoard();
                startTimer();
                saveGame();
            }, 3000);
        } else {
            messageEl.textContent = isFull ? "Hay errores en el tablero." : "Faltan casillas.";
            messageEl.style.color = "orange";
        }
    };

    // --- 5. Eventos y Arranque ---
    levelSelect.addEventListener('change', (e) => {
        if (confirm('¿Reiniciar con este nivel?')) {
            currentLevel = parseInt(e.target.value);
            localStorage.removeItem('sudokuSave');
            resetTimer();
            generatePuzzle(currentLevel);
            renderBoard();
            startTimer();
            saveGame();
        } else { levelSelect.value = currentLevel; }
    });

    newGameBtn.addEventListener('click', () => {
        if (confirm('¿Nueva partida?')) {
            localStorage.removeItem('sudokuSave');
            resetTimer();
            generatePuzzle(currentLevel);
            renderBoard();
            startTimer();
            saveGame();
        }
    });

    checkBtn.addEventListener('click', checkWin);

    const initGame = () => {
        if (loadGame()) {
            renderBoard();
            startTimer(); // Reanuda desde donde quedó
        } else {
            currentLevel = parseInt(levelSelect.value);
            resetTimer();
            generatePuzzle(currentLevel);
            renderBoard();
            startTimer();
            saveGame();
        }
    };

    initGame();

    const giveHint = () => {
        // 1. Encontrar todas las posiciones (r, c) que el usuario no ha resuelto correctamente
        let emptyCells = [];
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                // Si la celda es editable Y (está vacía O tiene un valor incorrecto)
                if (currentBoard[r][c] === 0 && userBoard[r][c] !== solution[r][c]) {
                    emptyCells.push({ r, c });
                }
            }
        }

        if (emptyCells.length === 0) {
            messageEl.textContent = "¡Ya no quedan pistas que dar!";
            return;
        }

        // 2. Elegir una celda aleatoria de las disponibles
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const { r, c } = randomCell;

        // 3. Aplicar penalización de 10 segundos
        secondsElapsed += 10;
        timerDisplay.textContent = formatTime(secondsElapsed);

        // Efecto visual de castigo en el cronómetro
        timerDisplay.classList.remove('penalty');
        void timerDisplay.offsetWidth; // Truco para reiniciar animación CSS
        timerDisplay.classList.add('penalty');

        // 4. Rellenar la celda con la solución correcta
        userBoard[r][c] = solution[r][c];

        // 5. Actualizar el tablero visualmente
        const input = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
        input.value = solution[r][c];
        input.style.color = 'var(--primary-btn)'; // Color especial para identificar que fue una pista

        messageEl.textContent = "Pista usada: +10 segundos";
        messageEl.style.color = "orange";

        saveGame();
    };
    hintBtn.addEventListener('click', giveHint);
});