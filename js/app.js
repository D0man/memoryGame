import '../css/app.scss'
/*
 * Create a list that holds all of your cards
 */
let cardList =['sasha','riley','nicole','miamalkova','mia','madison','lana','johnny']
cardList = cardList.concat(cardList);
let counter = 0;
let points = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
const newCardList = shuffle(cardList);
const cards = document.querySelectorAll('.card');
cards.forEach(function letnameitlater(card,index){
    card.setAttribute("data-img", newCardList[index]);
    card.style.background="#fff";
    card.addEventListener('click', checkCard)
    
});

function checkCard(){
    this.style.background=`url("./img/${this.dataset.img}.jpg")`;
    this.classList.add('matching');
    let matchedCard = document.querySelectorAll('.matching');
    if(matchedCard.length==2){
        var blocker = document.createElement("div");        
        blocker.classList.add("block-click");
        console.log(blocker);                               
        document.body.appendChild(blocker);              
        matchedCard[0].classList.remove('matching');
        matchedCard[1].classList.remove('matching');
        console.log('matching...')
        if(matchedCard[0].dataset.img===matchedCard[1].dataset.img){
            points++;
            matchedCard[0].removeEventListener('click',checkCard);
            matchedCard[1].removeEventListener('click',checkCard);
            document.body.removeChild(blocker);
            if (points === 8) endGame();
        }
        else{
            setTimeout(()=>{
                matchedCard[0].style.background="#fff";
                matchedCard[1].style.background="#fff";
                document.body.removeChild(blocker);
            },1500)
        }
        counter++;
        document.querySelector('.moves').textContent=counter;
    }   
}
function endGame(){
    var endGame = document.createElement("div");        
    endGame.classList.add("block-click", "end-game");
    var text = document.createTextNode(`Koniec: ${points} points`);
    endGame.appendChild(text) 
    document.body.appendChild(endGame);                      
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
