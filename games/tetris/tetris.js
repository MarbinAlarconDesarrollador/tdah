const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const nextCanvas = document.getElementById('next');
const nextContext = nextCanvas.getContext('2d');

// Escala 30px por bloque (El CSS se encarga de adaptarlo a la pantalla)
const SCALE = 30;
context.scale(SCALE, SCALE);
nextContext.scale(SCALE, SCALE);

// --- ESTADO DEL JUEGO ---
let isPaused = false;

// --- SONIDOS ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(freq, type = 'square', duration = 0.1) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

// --- PIEZAS ---
function createPiece(type) {
    if (type === 'I') return [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]];
    if (type === 'L') return [[0,2,0],[0,2,0],[0,2,2]];
    if (type === 'J') return [[0,3,0],[0,3,0],[3,3,0]];
    if (type === 'O') return [[4,4],[4,4]];
    if (type === 'Z') return [[5,5,0],[0,5,5],[0,0,0]];
    if (type === 'S') return [[0,6,6],[6,6,0],[0,0,0]];
    if (type === 'T') return [[0,7,0],[7,7,7],[0,0,0]];
}

const colors = [null, '#00f2ff', '#ff007a', '#00ff41', '#fefe33', '#ff8d00', '#7a00ff', '#ff0000'];

// --- LÓGICA DE TABLERO ---
function createMatrix(w, h) {
    return Array.from({length: h}, () => new Array(w).fill(0));
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) return true;
        }
    }
    return false;
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) arena[y + player.pos.y][x + player.pos.x] = value;
        });
    });
    playSound(120, 'sine', 0.1);
}

function arenaSweep() {
    let rowCount = 1;
    let linesCleared = 0;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) continue outer;
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        player.score += rowCount * 10;
        rowCount *= 2;
        linesCleared++;
    }
    
    if (linesCleared > 0) {
        player.lines += linesCleared;
        if (player.lines >= player.level * 10) {
            player.level++;
            dropInterval = Math.max(100, 1000 - (player.level * 100)); 
            playSound(800, 'sine', 0.4);
        }
        updateScore();
        playSound(440, 'triangle', 0.3);
    }
}

// --- JUGADOR ---
const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    next: null,
    score: 0,
    lines: 0,
    level: 1
};

function playerReset() {
    const pieces = 'ILJOTSZ';
    if (!player.next) player.next = createPiece(pieces[pieces.length * Math.random() | 0]);
    
    player.matrix = player.next;
    player.next = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
    
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        player.level = 1;
        player.lines = 0;
        dropInterval = 1000;
        updateScore();
    }
    drawNext();
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
    if (dir > 0) matrix.forEach(row => row.reverse());
    else matrix.reverse();
}

function playerRotate(dir) {
    if (isPaused) return;
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function playerDrop() {
    if (isPaused) return;
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
    }
    dropCounter = 0;
}

function playerMove(dir) {
    if (isPaused) return;
    player.pos.x += dir;
    if (collide(arena, player)) player.pos.x -= dir;
}

// --- RENDERING ---
function drawMatrix(matrix, offset, ctx, isGhost = false) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.globalAlpha = isGhost ? 0.2 : 1;
                ctx.fillStyle = colors[value];
                ctx.fillRect(x + offset.x, y + offset.y, 0.95, 0.95);
                ctx.globalAlpha = 1;
            }
        });
    });
}

function drawNext() {
    nextContext.fillStyle = '#000';
    nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    const offX = (nextCanvas.width / SCALE - player.next[0].length) / 2;
    const offY = (nextCanvas.height / SCALE - player.next.length) / 2;
    drawMatrix(player.next, {x: offX, y: offY}, nextContext);
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x:0, y:0}, context);
    
    if (!isPaused) {
        // Ghost (Sombra de dónde caerá la pieza)
        let ghostPos = { x: player.pos.x, y: player.pos.y };
        while (!collide(arena, { pos: { x: ghostPos.x, y: ghostPos.y + 1 }, matrix: player.matrix })) {
            ghostPos.y++;
        }
        drawMatrix(player.matrix, ghostPos, context, true);
        
        // Pieza real
        drawMatrix(player.matrix, player.pos, context);
    } else {
        // Texto de Pausa
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#fff';
        context.font = '2px Arial';
        context.textAlign = 'center';
        context.fillText('PAUSA', 6, 10);
    }
}

function updateScore() {
    document.getElementById('score').innerText = player.score;
    document.getElementById('level').innerText = player.level;
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('btn-pause').innerText = isPaused ? '▶️ Reanudar' : '⏸️ Pausa';
    if (!isPaused) {
        lastTime = performance.now();
    }
}

// --- CONTROLES (PC y MÓVIL) ---

// Teclado
document.addEventListener('keydown', event => {
    if (event.keyCode === 37) playerMove(-1); // Izquierda
    else if (event.keyCode === 39) playerMove(1); // Derecha
    else if (event.keyCode === 40) playerDrop(); // Abajo
    else if (event.keyCode === 81) playerRotate(-1); // Q
    else if (event.keyCode === 87 || event.keyCode === 38) playerRotate(1); // W o Arriba
    else if (event.keyCode === 80) togglePause(); // P para Pausa
});

// Botones Móviles (Touch y Mouse)
function setupButton(id, action) {
    const btn = document.getElementById(id);
    // Usamos touchstart para evitar el retraso del clic en móviles
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); action(); });
    btn.addEventListener('mousedown', (e) => { e.preventDefault(); action(); });
}

setupButton('btn-left', () => playerMove(-1));
setupButton('btn-right', () => playerMove(1));
setupButton('btn-rotate', () => playerRotate(1));
setupButton('btn-down', () => playerDrop());
document.getElementById('btn-pause').addEventListener('click', togglePause);

// --- GAME LOOP ---
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
    if (!isPaused) {
        const deltaTime = time - lastTime;
        lastTime = time;
        dropCounter += deltaTime;
        if (dropCounter > dropInterval) {
            playerDrop();
        }
    }
    draw();
    requestAnimationFrame(update);
}

const arena = createMatrix(12, 20);
playerReset();
updateScore();
update();