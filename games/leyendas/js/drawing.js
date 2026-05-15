const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => { drawing = true; });
canvas.addEventListener("mouseup", () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener("mousemove", draw);

// Touch events
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  drawing = true;
}, { passive: false });

canvas.addEventListener("touchend", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  drawTouch(e);
}, { passive: false });

function getPos(canvas, touch) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
}

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function drawTouch(e) {
  if (!drawing) return;
  const pos = getPos(canvas, e.touches[0]);
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}