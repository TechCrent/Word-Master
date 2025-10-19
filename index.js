
//Changing Color depending on situation

//Declarations
const row1 = document.querySelectorAll('.first-row .box');
const row2 = document.querySelectorAll('.second-row .box');
const row3 = document.querySelectorAll('.third-row .box');
const row4 = document.querySelectorAll('.fourth-row .box');
const row5 = document.querySelectorAll('.fifth-row .box');
const row6 = document.querySelectorAll('.sixth-row .box');

const WORD_URL = "https://words.dev-apis.com/word-of-the-day";
const VALID_URL = "https://words.dev-apis.com/validate-word";

let currentLetters = [];
let guessWord = "";
let wordOfTheDay = "";

const boxes = [row1,row2,row3,row4,row5,row6]
let currentRow = 0;
let currentBox = 0;


//API Handling // Getting Word of the day
async function getWord(){
    //First API (Get) Getting word of the Day
    const promise = await fetch(WORD_URL,{
            headers:{
                "Content-Type": "application/json",
            },
    }
    );
    const ProcessedResponse = await promise.json();
    wordOfTheDay = ProcessedResponse.word.toLowerCase();

    return wordOfTheDay;
}



//Letter Handling
function initiate(){
    document
        .addEventListener("keydown",(event)=>{
           if(isLetter(event.key) && currentBox < 5){
                boxes[currentRow][currentBox].innerText = event.key.toUpperCase();
                currentLetters.push(event.key.toUpperCase());
                currentBox++;
           }else{

           }
        });

}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

//Del Handling
function Del(){
    document
        .addEventListener("keydown",(event)=>{
            if(currentBox === 0 && event.key === "Backspace"){
                currentBox = 0;
            }else if(currentBox <= 5 && event.key === "Backspace"){
                currentLetters.pop();
                currentBox--;
                boxes[currentRow][currentBox].innerText = null;
            };
        });
}

//Enter handling & Row Switch handling
function Enter(){
    document
        .addEventListener("keydown",async (event)=>{
            if(currentRow === 5 && currentBox === 5 && event.key === "Enter"){
                alert('This is the end!')
            }else if(currentBox === 5 && event.key === "Enter"){
                guessWord = currentLetters.join("").toLowerCase();
                console.log(guessWord);

                const validWord = await validateWord(guessWord);


                ToF(validWord)
            }
        });
}



//API Handling // Is-Word Validation
async function validateWord(guessWord){
    //Second API(Post) Validating if its a word
    const promise2 = await fetch(VALID_URL ,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: guessWord}),
    });
    const ProcessedResponse2 = await promise2.json()
    return ProcessedResponse2.validWord;
}
    //Getting True or False Statement
function ToF(validWord){
    if(!validWord){
        alert("Not a real Word!")
    }else if(guessWord === wordOfTheDay){
        alert("Correct answer")
    }else{
        alert("Wrong word, try again.")
        currentLetters = [];
        currentRow ++;
        currentBox = 0;
    }
}

getWord();
initiate();
Del();
Enter();
