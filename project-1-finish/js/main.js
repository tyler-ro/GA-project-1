const playingDeck = [];
let winner = "";
let dealerValue = 0;
let playerValue = 0;
const message = document.querySelector("h1");
const suit = ["h", "s", "c", "d"];
const numValue = [
  "A",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "J",
  "Q",
  "K",
];
let deck = [];
let tempDeck = [];

const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");

const playerScore = document.querySelector(".yourScore");
const dealerScore = document.querySelector(".dealerScore");
const playerHand = document.querySelector(".player-hand");
const dealerHand = document.querySelector(".dealer-hand");

hitButton.addEventListener("click", playerHit);
standButton.addEventListener("click", playerStay);

function createDeck() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 13; j++) {
      let card = suit[i] + numValue[j];
      tempDeck.push(card);
    }
  }
}

initialize();

function initialize() {
  createDeck();
  shuffleDeck();
  dealDeck();
}

function shuffleDeck() {
  for (let k = 0; k < 52; k++) {
    let randomIdx = Math.floor(Math.random() * 52);
    deck.push(tempDeck[randomIdx]);
  }
}
function dealDeck() {
  const cardEl1 = document.createElement("div");
  cardEl1.classList.add("card", deck[0]);
  playerHand.appendChild(cardEl1);
  playerValue += checkValue(deck[0]);
  const cardEl2 = document.createElement("div");
  cardEl2.classList.add("card", deck[1]);
  playerHand.appendChild(cardEl2);
  playerValue += checkValue(deck[1]);
  const cardEl3 = document.createElement("div");
  cardEl3.classList.add("card", "back-blue", deck[2]);
  cardEl3.setAttribute("id", "reveal");
  dealerHand.appendChild(cardEl3);
  dealerValue += checkValue(deck[3]);
  const cardEl4 = document.createElement("div");
  cardEl4.classList.add("card", deck[3]);
  dealerHand.appendChild(cardEl4);
  dealerValue += checkValue(deck[4]);
  deck.splice(0, 4);
}

function playerHit() {
  playerValue += checkValue(deck[0]);
  const cardEl = document.createElement("div");
  cardEl.classList.add("card", deck[0]);
  playerHand.appendChild(cardEl);
  deck.shift();
  if (playerValue > 21) {
    document.getElementById("hitButton").disabled = true;
    return "Bust";
  }
}

function checkValue(card) {
  console.log(card);
  if (parseInt(card.split("").splice(1).join(""))) {
    return parseInt(card.split("").splice(1).join(""));
  } else if (card.split("").splice(1).join("") === "A") {
    return 11;
  } else {
    return 10;
  }
}

function checkWinner() {
  if (dealerValue > 21) {
    return "Win";
  } else if (playerValue > dealerValue) {
    return "Win";
  } else {
    return "Lose";
  }
}

function playerStay() {
  document.getElementById("hitButton").disabled = true;
  const revealCard = document.getElementById("reveal");
  revealCard.classList.remove("back-blue");
  dealerHit();
}

function dealerHit() {
  for (let i = dealerValue; i < 17; i = dealerValue) {
    dealerValue += checkValue(deck[0]);
    const cardEl = document.createElement("div");
    cardEl.classList.add("card", deck[0]);
    dealerHand.appendChild(cardEl);
    deck.shift();
  }
  resultMessage();
  checkWinner();
}

function resultMessage() {
  if (dealerValue >= 22) {
    message.innerHTML = "Win! Refresh to play again!";
  } else if (playerValue > dealerValue && playerValue < 22) {
    message.innerHTML = "Win! Refresh to play again!";
  } else {
    message.innerHTML = "Lose! Refresh to play Again!";
  }
}
