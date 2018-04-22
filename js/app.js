import '../css/app.scss';

const startValue = 0;
const endValue = 8;

let cardList = ['sasha','riley','nicole','miamalkova','mia','madison','lana','johnny'];
cardList = cardList.concat(cardList);
let moves, matched, star, i, removedStar;
const cards = document.querySelectorAll('.card');
const restart = document.querySelector('.restart');
let stars = document.querySelectorAll('.stars li');
let cloneStar = [];
for(i=0;i<3;i++){
 cloneStar[i] = stars[i].cloneNode(true);
}
const scorePanel = document.querySelector('.score-panel');
const time = document.querySelector('.time');
const movesDiv = document.querySelector('.moves');
const startButton = document.querySelector('#startButton');
restart.addEventListener('click', startGame);
startButton.addEventListener('click',function start(){
    this.removeEventListener('click',start);
    this.parentElement.classList.add('out');
    setTimeout(()=>{this.parentElement.classList.add('hidden');}, 2000)
    startGame();
})

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
let timer= 0
function startGame(){
    reset()
    clearsmt();
    set();
    if (document.querySelectorAll('.end-game').length){
        let modal = document.querySelectorAll('.end-game');
        modal[modal.length-1].style.display="none";
    }
    const newCardList = shuffle(cardList);
    for ( const [index,card] of cards.entries()){
        card.setAttribute("data-img", newCardList[index]);
        card.style.background = "#fff";
        card.addEventListener('click', checkCard);
    }
}

function reset(){
    moves = matched = star = i = startValue;
    time.textContent = i;
    movesDiv.textContent = moves;
    const list = document.querySelector('.stars');
    list.innerHTML="";
    cloneStar.forEach((el)=>{
        list.appendChild(el);
    })
    removedStar = 2;
  
}
function checkCard(){
    this.style.background=`url("./img/${this.dataset.img}.jpg")`;
    this.classList.add('matching');
    let matchedCard = document.querySelectorAll('.matching');
    if(matchedCard.length==2){
        var blocker = document.createElement("div");        
        blocker.classList.add("block-click");                            
        document.body.appendChild(blocker);              
        matchedCard[0].classList.remove('matching');
        matchedCard[1].classList.remove('matching');
        moves++; 
        movesDiv.textContent=moves;
        if(matchedCard[0].dataset.img===matchedCard[1].dataset.img){
            matched++;
            matchedCard[0].removeEventListener('click',checkCard);
            matchedCard[1].removeEventListener('click',checkCard);
            document.body.removeChild(blocker);
            if (matched === endValue) endGame();
        }
        else{
            setTimeout(()=>{
                matchedCard[0].style.background="#fff";
                matchedCard[1].style.background="#fff";
                document.body.removeChild(blocker);
            },500)
        }
        removeStar();
       
    }   
}

function endGame(){
    const endGameModal = document.createElement("div");
    const scorePanelClone = scorePanel.cloneNode(true);
    clearsmt();  
    endGameModal.classList.add("block-click", "end-game");
    const text = document.createTextNode('Score:');
    endGameModal.appendChild(text);
    endGameModal.appendChild(scorePanelClone); 
    document.body.appendChild(endGameModal);
    endGameModal.querySelector('.restart')
    .addEventListener('click', startGame);                      
}
function set(){
    timer = setInterval(changeTime, 1000);
}
function clearsmt(){
    clearInterval(timer);
}
function changeTime(){
        i++;
        time.textContent=i;
        removeStar();
    }

function removeStar(){
    stars = document.querySelectorAll('.stars li');
        if( (moves === 18 || i === 41) && removedStar === 2){
            stars[0].parentNode.removeChild(stars[0]);
            removedStar--; 
        
        }
        if( (moves === 20 || i === 51) && removedStar === 1){
            stars[0].parentNode.removeChild(stars[0]); 
            removedStar--;  
        }
        if( (moves === 25 || i === 120) && removedStar === 0){
            stars[0].parentNode.removeChild(stars[0]);
            removedStar--;   
        } 
}
