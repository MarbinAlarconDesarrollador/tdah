function saveProject(){

const data = {

story:
document.getElementById(
"storyResult"
).innerHTML,

start:
document.getElementById(
"storyStart"
).value,

middle:
document.getElementById(
"storyMiddle"
).value,

end:
document.getElementById(
"storyEnd"
).value

};

localStorage.setItem(
"storyGame",
JSON.stringify(data)
);

alert(
"Proyecto guardado"
);

}

function loadProject(){

const data =
JSON.parse(
localStorage.getItem(
"storyGame"
)
);

if(!data) return;

document.getElementById(
"storyResult"
).innerHTML =
data.story;

document.getElementById(
"storyStart"
).value =
data.start;

document.getElementById(
"storyMiddle"
).value =
data.middle;

document.getElementById(
"storyEnd"
).value =
data.end;

alert(
"Proyecto cargado"
);

}