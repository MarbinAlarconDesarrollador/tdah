const backgroundSelect =
document.getElementById("backgroundSelect");

backgroundSelect.addEventListener("change",()=>{

document.getElementById("backgroundLayer").src =
`assets/backgrounds/${backgroundSelect.value}`;

});