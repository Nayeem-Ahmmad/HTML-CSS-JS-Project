
//finding elements

const form = document.querySelector('form');
const cardBody = document.querySelector('.card-body');
const guessNumber = form.querySelector('.guessNumber');
const checkButton = form.querySelector('.btn');
const resultText = cardBody.querySelector('.showResult');
const attampText = cardBody.querySelector('.attamp');
const resetButton = form.querySelector('.resetbtn');

const lostWin = document.createElement("p");

//initilization...

let Attamp = 0;
let totalwon = 0;
let totalLost = 0;


form.addEventListener("submit", function(event){
    event.preventDefault();
    
    Attamp++;

        resetButton.addEventListener("click", function(){
            Attamp = 0;
            checkButton.disabled = false;
            guessNumber.disabled = false;
            resultText.innerHTML = ``;
            attampText.innerHTML = `Again Try.Reamming attempts : ${ 5 - Attamp}`;
            lostWin.innerHTML = ``;
            totalLost = 0;
            totalwon = 0;
        })

    if( Attamp == 6 ){
        guessNumber.disabled = true;
        checkButton.disabled = true;
    }else if( Attamp < 6 ){
        checkResult(guessNumber.value);
        attampText.innerHTML = `Reamming attempts : ${ 5 - Attamp}`;
    }
    guessNumber.value = "";
});

function checkResult(guessNumber){
    const randomNumber = getRandom(5);

    if( guessNumber == randomNumber ){
        resultText.innerHTML = `You have won`;
        totalwon++;
    }else{
        totalLost++;
        resultText.innerHTML = `You have lost, random number was : ${randomNumber}`;
    }

    lostWin.innerHTML = `Won : ${totalwon}, and Total lost : ${totalLost}`;
    lostWin.classList.add("large-text");
    cardBody.appendChild(lostWin);

}

function getRandom(limit){
    let randomNumber = Math.floor(Math.random() * limit ) + 1;
    return randomNumber;
}