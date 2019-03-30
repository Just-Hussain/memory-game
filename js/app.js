
    //Data structue to hold all the cards.
let cards = Array.from(document.getElementsByClassName("card"));

initDeck();

    //Randomizes html elements (cards) symbols (children). 
function initDeck() {
    
    let cardsNames = [
        "fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
        "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt",
        "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
        "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"
    ];

    for (let i = 15; i > -1; i--) {
        const random = Math.floor(Math.random() * i);  
        
        cards[i].children[0].className = "fa " + cardsNames[random];
        cards[i].className = "card";
        
        cardsNames.splice(random, 1);
    }
}


 let openCards = []; //To hold currently opend cards (Not matched).
 let movesCount = 0;
    
    //This gets the initial number of stars from HTML.
 let starsCount = document.getElementsByClassName("fa fa-star").length;

    //To calculate when the player started and finished.
 let startTime = 0;
 let finishTime = 0;
 let isStart = true;
 let playTime = 0;
 let timerKey;


 //Listener for clicks on cards.
 document.querySelector(".deck").addEventListener("click", function(event) {
    const parentClass = event.target.className; 

    /*Check difentions of getInfo(), showCard(), matchCards(), 
    hideCards(), updateMoves(), updateStars(), allMatch() below. */
    if (parentClass == "card") {
            
            //Starting the timer.
        if (isStart) {
            timerKey = setInterval(function() {
                playTime++;
                document.querySelector(".time").textContent = playTime;
    
            }, 1000);
            isStart = false;
        }

        

            //Checking, comparing, clearing currenlty opened cards.
        if (openCards.length == 0) {
            openCards.push(getInfo(event));
            showCard(event);
        }
        else if (openCards.length > 0) {
            openCards.push(getInfo(event));
            showCard(event);
            
            if (openCards[0].symbolName == openCards[1].symbolName) {
                matchCards(openCards);
            }
            else {
                setTimeout(function() {
                    hideCards(openCards);
                }, 1000);
            }
            updateMoves();
            updateStars();     
        }

        if (allMatch(cards)) {
            clearInterval(timerKey);
            if (confirm(`YOU WON! with ${movesCount} moves and ${starsCount} stars in ${playTime} seconds! play again by cliking OK!`)) {
                restart();
              }
        }
        
    }
 });


    //Listener for the restart button.
 document.querySelector(".restart").addEventListener("click", function(event) {
     
    //Check setStarColor difention below.

        //Checks and resets everything.
    if (event.target.className == "fa fa-repeat") {
        restart();
        
    }
 });

 function restart() {
    initDeck();
    isStart = true;
    playTime = 0;
    document.querySelector(".time").textContent = playTime;
    openCards.length = 0;

    movesCount = 0;
    document.querySelector(".moves").textContent = movesCount;
    
    starsCount = document.getElementsByClassName("fa fa-star").length;
    for (let i = 0; i < starsCount; i++) {
        setStarColor(i, "black");
    }
 }

    //Comapers cards to check if the game is done using "match" class.
 function allMatch(cards) {
    let flag =  false;

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].className == "card match") {
            flag = true;
        }
        else {
            flag = false;
            break;
        }
    }
    return flag;
 }

 function updateMoves() {
    movesCount++;
    document.querySelector(".moves").textContent = movesCount;
 }

 function updateStars() {
    if (movesCount === 9 || movesCount === 15) {
        starsCount--;
        setStarColor(starsCount, "gray")
    }
 }

    //Simplfies changing a star`s color.
 function setStarColor(pos, color) {
    document.getElementsByClassName("fa fa-star")[pos].setAttribute("style", `color: ${color};`);
     
 }

    //Showig. matching and hiding all using class names.
 function showCard(event) {
    event.target.className = "card open show";
 }

 function matchCards(openCards) {
    for (let i = 0; i < openCards.length; i++) {
        openCards[i].card.className = "card match";
     }
     openCards.length = 0;
    }

 function hideCards(openCards) {
     for (let i = 0; i < openCards.length; i++) {
        openCards[i].card.className = "card";
     }
     openCards.length = 0;
 }

    //To encapsulate the informaion of the event on click and store in the opendCards array.
function getInfo(event) {
    let info = {
        symbolName: event.target.children[0].className,
        card: event.target
    };
    return info;
}
 

