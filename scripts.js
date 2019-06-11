const cards = document.querySelectorAll('.memory-card');

let boardLocked = false;
let hasFlippedCard = false;
let firstCard, secondCard;

function flip () {
    if (boardLocked) return;
    // prevent doubleclick
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }    
    //second click
    secondCard = this;
    
    checkMatch();           
}

// function checkMatch() {
//     // do the cards match?
//     if (firstCard.dataset.club === secondCard.dataset.club){
//         // match - remove ability to flip 
//         disableFlip();
//     } else {
//         unFlip();
//     }
// }

// if else ES6 
// condition ? expr1 (true) : expr2 (false)
function checkMatch() {
    let isMatch = firstCard.dataset.club === secondCard.dataset.club;

    isMatch ? disableFlip() : unFlip();
}



function disableFlip() {
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);

    reset();
}

function unFlip() {
    boardLocked = true;

    // not a match - flip to back
    // add timout to view cards
    setTimeout(()  =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        reset();
    }, 1350);
}

function reset() {
    [hasFlippedCard, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// IIFE shuffle cards
(function shuffle() {
    cards.forEach(card => {
        let ranPos = Math.floor(Math.random() * 12);
        card.style.order = ranPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flip));