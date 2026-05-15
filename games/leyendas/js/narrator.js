function speakStory(){

const text =
document.getElementById(
"storyResult"
).innerText;

if(text.trim() === ""){

alert(
"Primero genera la historia"
);

return;

}

const speech =
new SpeechSynthesisUtterance(
text
);

speech.lang = "es-ES";

speech.rate = 0.9;

speech.pitch = 1;

speechSynthesis.speak(
speech
);

}