function generateStory(){

const head =
headSelect.options[
headSelect.selectedIndex
].text;

const eyes =
eyesSelect.options[
eyesSelect.selectedIndex
].text;

const mouth =
mouthSelect.options[
mouthSelect.selectedIndex
].text;

const accessory =
accessorySelect.options[
accessorySelect.selectedIndex
].text;

const background =
backgroundSelect.options[
backgroundSelect.selectedIndex
].text;

const object =
getSelectedObject();

const start =
document.getElementById(
"storyStart"
).value;

const middle =
document.getElementById(
"storyMiddle"
).value;

const end =
document.getElementById(
"storyEnd"
).value;

const finalStory =

`
Había una vez un personaje tipo
${head},
con ojos ${eyes},
boca ${mouth}
y usando ${accessory}.

Vivía en
${background}.

Siempre llevaba consigo:
${object}.

${start}

${middle}

${end}
`;

document.getElementById(
"storyResult"
).innerHTML =
finalStory;

}