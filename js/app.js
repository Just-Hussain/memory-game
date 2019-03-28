/*
 * Create a list that holds all of your cards
 */


let cards = Array.from(document.getElementsByClassName("card"));


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffleHtml();


// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffleArray(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }

function shuffleHtml() {
    
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

 let openCards = [];
 let movesCount = 0;
 let starsCount = document.getElementsByClassName("fa fa-star").length;


 document.querySelector(".deck").addEventListener("click", function(event) {
    const parentClass = event.target.className; 
    

    if (parentClass == "card") {
        const childClass = event.target.children[0].className;

        
        if (openCards.length == 0) {
            let info = {
                child: childClass,
                parent: event.target
            };
            openCards.push(info);
            
            showCard(event);
        }
        else if (openCards.length > 0) {
            let info = {
                child: childClass,
                parent: event.target
            };
            openCards.push(info);
            
                        
            if (openCards[0].child == openCards[1].child) {
                matchCards(openCards);
            }
            else {
                hideCards(openCards);
            }
            updateMoves();
            updateStars();


            openCards.length = 0;

            
            
        }

        if (allMatch(cards)) {
            document.querySelector("h1").textContent = "YOU WON! with " + movesCount
             + " moves and " + starsCount + " stars! play again using the restart symbol";
        }
        
    }
 });

    
 document.querySelector(".restart").addEventListener("click", function(event) {
     
    if (event.target.className == "fa fa-repeat") {
        shuffleHtml();
        document.querySelector(".moves").textContent = "0";
        
        starsCount = document.getElementsByClassName("fa fa-star").length;
        for (let i = 0; i < starsCount; i++) {
            document.getElementsByClassName("fa fa-star")[i].setAttribute("style", "color: black;");
        }

        document.querySelector("h1").textContent = "Matching Game";
    }
 });

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
    if (movesCount === 9) {
         starsCount--;
         document.getElementsByClassName("fa fa-star")[starsCount].setAttribute("style", "color: gray;");
     }
     else if (movesCount === 15) {
         starsCount--;
         document.getElementsByClassName("fa fa-star")[starsCount].setAttribute("style", "color: gray;");
     }
 }
 
 function showCard(event) {
    event.target.className = "card open show";
 }

 function matchCards(openCards) {
    for (let i = 0; i < openCards.length; i++) {
        openCards[i].parent.className = "card match";
     }
 }

 function hideCards(openCards) {
     for (let i = 0; i < openCards.length; i++) {
        openCards[i].parent.className = "card";
     }
 }


 

