 /*
if(isLetter(event.key)){     
boxes.forEach(box => {
    box.innerText = event.key.toUpperCase();
})
}else{
    event.preventDefault();
  }
 */

//Enter handling

//Row Switch handling
//API handling
//Changing Color depending on situation

const boxes = document.querySelectorAll('.first-row .box')
const box1 = document.querySelector('.fr1')
let currentIndex = 0;

//Letter Handling
function initiate(){
    document
        .addEventListener("keydown",(event)=>{
           if(isLetter(event.key) && currentIndex < 5){
                boxes[currentIndex].innerText = event.key.toUpperCase();
                currentIndex++;
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
            if(currentIndex === 0 && event.key === "Backspace"){
                currentIndex = 0;

            }else if(currentIndex <= 5 && event.key === "Backspace"){
                currentIndex--;
                boxes[currentIndex].innerText = null;
            };
        });
}


initiate();
Del();