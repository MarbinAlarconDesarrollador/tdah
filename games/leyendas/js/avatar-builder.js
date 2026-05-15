const headSelect =
document.getElementById("headSelect");

const eyesSelect =
document.getElementById("eyesSelect");

const mouthSelect =
document.getElementById("mouthSelect");

const accessorySelect =
document.getElementById("accessorySelect");

headSelect.addEventListener("change",()=>{

document.getElementById("headLayer").src =
`assets/heads/${headSelect.value}`;

});

eyesSelect.addEventListener("change",()=>{

document.getElementById("eyesLayer").src =
`assets/eyes/${eyesSelect.value}`;

});

mouthSelect.addEventListener("change",()=>{

document.getElementById("mouthLayer").src =
`assets/mouths/${mouthSelect.value}`;

});

accessorySelect.addEventListener("change",()=>{

document.getElementById("accessoryLayer").src =
`assets/accessories/${accessorySelect.value}`;

});