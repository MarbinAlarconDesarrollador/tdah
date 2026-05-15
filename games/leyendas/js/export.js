function downloadStory(){

html2canvas(
document.getElementById(
"captureArea"
)
).then(canvas=>{

const link =
document.createElement("a");

link.download =
"mi-historia.png";

link.href =
canvas.toDataURL();

link.click();

});

}