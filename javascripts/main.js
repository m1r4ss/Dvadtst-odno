$(document).ready(function() {
    $('#question1').on('click', function () {
        $('#viewDetails').toggle()
    })
})

// $("#elem").show('slow');
// setTimeout(function() { $("#elem").hide('slow'); }, 2000);

let blackjackGame =  {
    you : {
        scoreSpan : '#your-blackjack-result',
        div : "#your-box",
        boxSize : '.flex-blackjack-row-2 div',
        score: 0,
    },
    dealer : {
        scoreSpan : '#dealer-blackjack-result',
        div : "#dealer-box",
        boxSize : '.flex-blackjack-row-2 div',
        score: 0,
    },

    cards: ["2","3","4","5","6","7","8","9","10","K","J","Q","A"],

    cardsMap : {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        K: 10,
        J: 10,
        Q: 10,
        A: [1,11],
    },

    wins: 0,
    losses: 0,
    draws: 0,
    isStand: false,
    isTurnOver: false,
    pressOnce: false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer']

const hitSound = new Audio("sounds/Swoosh.mp3")
const winSound = new Audio("sounds/cash.mp3")
const loseSound = new Audio("sounds/aww.mp3")

let windowWidth = window.screen.width
let windowHeight = window.screen.height
let winner;
document
    .querySelector("#blackjack-hit-button")
    .addEventListener("click", blackjackHit);

document
    .querySelector("#blackjack-stand-button")
    .addEventListener("click",blackjackStand);

function blackjackHit(){
    if(blackjackGame["isStand"] === false) {
        let card = randomCard();
        console.log(card)
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        let tempCard = card.toString();
        //cardImage.src = "images/{temp}.png";
        cardImage.src = "images/" + tempCard + ".png";
        cardImage.style.height = '40vh'
        cardImage.style.width = '35vw'
        cardImage.style.position = 'relative'
        cardImage.style.marginRight = '-20vw'
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        hitSound.play();
    }
}

// function widthSize(){
//     if(windowWidth > 1000){
//         let newWidthSize = window.screen.width * 0.1;
//         return newWidthSize;
//     } else {
//         return window.screen.width * 0.18;
//     }
// }
// function heightSize(){
//     if(windowHeight > 700){
//         let newHeightSize = window.screen.Height * 0.18;
//         return newHeightSize;
//     } else {
//         return window.screen.Height * 0.15;
//     }
// }

function updateScore(card, activePlayer){
    if(card === "A"){
        if( activePlayer["score"] + blackjackGame["cardsMap"][card][1] <=21){
            activePlayer["score"] += blackjackGame["cardsMap"][card][1];
        } else {
            activePlayer["score"] += blackjackGame["cardsMap"][card][0];
        }
    } else {
        activePlayer["score"] += blackjackGame["cardsMap"][card];
    }
    console.log(activePlayer["score"]);
}
function showScore(activePlayer){
    if (activePlayer["score"] > 21){
        document.querySelector(activePlayer["scoreSpan"]).textContent = "Проигрыш!";
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
    }
    else{
        document.querySelector(activePlayer["scoreSpan"]).textContent =
            activePlayer["score"];
    }
}
//одинаковое кол-во выдача карт
function blackjackStand(){
    if(blackjackGame.pressOnce === false) {
        blackjackGame['isStand'] = true;
        let yourImages = document
            .querySelector("#your-box")
            .querySelectorAll("img");

        for (let i = 0; i < yourImages.length; i++) {
            let card = randomCard();
            showCard(card, DEALER);
            updateScore(card, DEALER);
            showScore(DEALER);

            blackjackGame['isTurnsOver'] = true;
        }
    }
    blackjackGame.pressOnce = true;
}