const circle = document.getElementById('breath-circle');
const instruction = document.getElementById('instruction');

function breathe() {
    // Inhalar (Crecer)
    instruction.innerText = "Inhala profundo...";
    circle.className = "circle grow";
    
    setTimeout(() => {
        // Exhalar (Encoger)
        instruction.innerText = "Exhala suavemente...";
        circle.className = "circle shrink";
    }, 4000); // 4 segundos inhalando
}

// Iniciar ciclo: 4s inhala + 4s exhala = 8 segundos totales
breathe();
setInterval(breathe, 8000);