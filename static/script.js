// Access elements similarly to pointers/references in C++ or table lookups in Lua
const button = document.getElementById("myButton");
const body = document.body;
const box = document.getElementById("box1");
const element_name = document.getElementById("element_name");
const mistakes_text = document.getElementById("mistakes");
const correct_text = document.getElementById("correct");
const score_text = document.getElementById("score");
const elements_container = document.getElementById("ellements_container");

const elementValencies = [
  { H: "+1, -1" },
  { Li: "+1" },
  { Be: "+2" },
  { Na: "+1" },
  { Mg: "+2" },
  { K: "+1" },
  { Ca: "+2" },
  { Rb: "+1" },
  { Sr: "+2" },
  { Cs: "+1" },
  { Ba: "+2" },
  { Cr: "+2, +3, +6" },
  { Mn: "+2, +3, +6, +7" },
  { Fe: "+2, +3" },
  { Co: "+2, +3" },
  { Ni: "+2, +3" },
  { Cu: "+1, +2" },
  { Zn: "+2" },
  { Pd: "+2, +4" },
  { Ag: "+1" },
  { Cd: "+2" },
  { Pt: "+2, +4" },
  { Au: "+1, +3" },
  { Hg: "+1, +2" },
  { B: "+3" },
  { Al: "+3" },
  { C: "+2, +4, -4" },
  { Si: "+2, +4, -4" },
  { N: "+3, +5, -3" },
  { P: "+3, +5, -3" },
  { As: "+3, +5, -3" },
  { Sb: "+3, +5, -3" },
  { Bi: "+3, +5" },
  { O: "-2" },
  { S: "+2, +4, +6, -2" },
  { Se: "+2, +4, +6, -2" },
  { Te: "+2, +4, +6, -2" },
  { F: "-1" },
  { Cl: "+1, +3, +5, +7, -1" },
  { Br: "+1, +3, +5, +7, -1" },
  { I: "+1, +3, +5, +7, -1" },
  { Sn: "+2, +4" },
  { Pb: "+2, +4" }
];

let availableIndexes = elementValencies.map((_, index) => index);

let isNewRoundNeeded = false;

let valencies_buttons_array = []
let passed_ellements_array = []

let leftPosition = 0;
let c_e_correct_answers = 0;
let c_e_valencies_number = 0;
let current_index = 0;
let score = 0;
let mistakes = 0;
let no_mistakes = true;
let corrects = 0;
let currentElement = null;


function show_passed_ellement(object_element, correct){

  let element_box = document.createElement("div");

  element_box.className = "element_box";
  element_box.id = "element_box";

  element_box.textContent = object_element.symbol;

  passed_ellements_array.push(element_box);

  elements_container.appendChild(element_box);

  element_box.style.color = "white";

  if (correct){
    element_box.style.backgroundColor = "green";
  }
  else {
    element_box.style.backgroundColor = "red";
  }
  let valencies_box = null;

  element_box.addEventListener("mouseenter", () => {
    // console.log(object_element.valencies);
    valencies_box = document.createElement("div");
    const rect = element_box.getBoundingClientRect();
    const center = rect.left + rect.width / 2;

    valencies_box.style.left = center + "px";
    valencies_box.style.top = (rect.top - 35) + "px"
    body.appendChild(valencies_box)
    valencies_box.className = "valencies_display_box";
    valencies_box.textContent = object_element.valencies;
    valencies_box.style.position = element_box.style.position;
    
  });

  element_box.addEventListener("mouseleave", () => {
      if (valencies_box){
        valencies_box.remove();
      }
      // console.log("Cursor left the button");
  });

}

function washup_passed_elements(){
  for (const element_box of passed_ellements_array){
    element_box.remove();
  }
  // console.log( passed_ellements_array.length());
  passed_ellements_array = [];

}

document.addEventListener("DOMContentLoaded", () => {
  for (let i = -4; i < 8; i++) {
    const btn = document.getElementById(String(i));
    if (btn) {
      btn.addEventListener("click", () => {
        checkAnswer(i, btn);
      });
      valencies_buttons_array.push(btn);
    }
  }
  currentElement = pickRandomElement();
  availableIndexes = elementValencies.map((_, index) => index);
  element_name.textContent = currentElement.symbol;
});
// heading.textContent = "New Heading Text"

function pickRandomElement() {
  
  const randomPosition = Math.floor(Math.random() * availableIndexes.length);
  const chosenIndex = availableIndexes.splice(randomPosition, 1)[0];
  // console.log("removed index: ", chosenIndex);
  const randomObj = elementValencies[chosenIndex];
  const symbol = Object.keys(randomObj)[0];
  const valencyStr = randomObj[symbol];
  console.log("indexes left: " + availableIndexes.length)
  console.log("displaying elements: "+ passed_ellements_array.length)
  return { symbol, valencies: valencyStr };
}

function load_new_element(random) {
  if (!random) {
    if (no_mistakes === true) {
      corrects++;
    } else {
      mistakes++;
    }
  }

  c_e_correct_answers = 0;
  no_mistakes = true;

  for (let i = 0; i < 12; i++) {
    if (valencies_buttons_array[i]) {
      valencies_buttons_array[i].style.color = "black";
      valencies_buttons_array[i].style.backgroundColor = "white";
    }
  }

  currentElement = pickRandomElement();

      element_name.textContent = currentElement.symbol;

  
}

function displayStats(){
  correct_text.textContent = "Correctos: " + String(corrects);
  mistakes_text.textContent = "Fallos: " + String(mistakes);
  let score = corrects + mistakes === 0
    ? 0
    : corrects / (corrects + mistakes) * 100;

  score_text.textContent = "Score: " + String(Math.floor(score)) + "%";
}

function checkAnswer(valencie, btn) {
  if (currentElement){

    
    
    const cleanValencies = currentElement.valencies
    .split(",")
    .map(item => item.trim())
    .filter(item => item !== "");
    c_e_valencies_number = cleanValencies.length;

    // Format integer i to match "+1" or "-1"
    let formattedInput;

    if (valencie > 0) {
        formattedInput = "+" + String(valencie);
    } else {
        formattedInput = String(valencie);
    }
    
    if (cleanValencies.includes(formattedInput)) {
      btn.style.backgroundColor = "green";
      btn.style.color = "white"
      c_e_correct_answers++;
    } else {
      btn.style.backgroundColor = "red";
      btn.style.color = "white"
      no_mistakes = false;
    }
    if (c_e_correct_answers == c_e_valencies_number){

      if (availableIndexes.length === 0) {
        washup_passed_elements();
        availableIndexes = [];
        availableIndexes = elementValencies.map((_, index) => index);
      }
      show_passed_ellement(currentElement, no_mistakes)
      
      load_new_element(false);

      displayStats()
    }

  }
}

button.addEventListener("click", () => {
  console.log("Button clicked!");

  // leftPosition += 10;
  load_new_element(true);
  displayStats()
  // test_passed_elements_list(100);
});


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// async function test_passed_elements_list(MsDelay){
//     for(let i = 0; i < 42; i++){
//         await delay(MsDelay);

//         if (availableIndexes.length === 0) {
//             washup_passed_elements();
//         }

//         show_passed_ellement(currentElement, no_mistakes);
//         load_new_element(false);
        
//     }
// }

async function autotest(MsDelay = 100) {
    for (let i = 0; i < 43; i++) {

        // Get the current element's correct valencies
        const correctValencies = currentElement.valencies
            .split(",")
            .map(item => item.trim());

        // Click the actual buttons for each correct valency
        for (const valency of correctValencies) {

            // Convert "+1" -> "1", "-2" -> "-2"
            const buttonId = valency.startsWith("+")
                ? valency.substring(1)
                : valency;

            const btn = document.getElementById(buttonId);

            if (btn) {
                btn.click();
                await delay(MsDelay);
            }
        }
    }

    console.log("Autotest finished!");
}

// window.addEventListener("keydown", (event) => {
//     switch(event.key) {
//         case (a)
//     }
//     event.preventDefault();
// });