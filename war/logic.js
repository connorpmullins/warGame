const suits = ["heart", "club", "diamond", "spade"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const deck = [];
let computerDeck = [];
let playerDeck = [];
let cardStack = [];
let playerStack = [];
let computerStack = [];
let computerCard;
let playerCard;

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
};

function deckBuilder() {
  for (const suit of suits) {
    for (const value of values) {
      deck.push(new Card(suit, value));
    }
  }
};

function deckDivider() {
  shuffle(deck);
  const halfDeck = Math.ceil(deck.length / 2);
  computerDeck = deck.splice(0, halfDeck);
  playerDeck = deck;
};


function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }
  return array;
};

function reshuffle(user) {
  if (user === "player") {
    shuffle(playerStack);
    playerDeck = playerStack.splice(0);
  } else {
    shuffle(computerStack);
    computerDeck = computerStack.splice(0);
  }
  console.log("RESHUFFLE         playerDeck: ", playerDeck, " playerStack: ", playerStack);
  console.log("computerDeck: ", computerDeck, " computerStack: ", computerStack);
}

function setCardValues() {
  computerCard = computerDeck.splice(0,1);
  playerCard = playerDeck.splice(0,1);
  playerCard = playerCard[0];
  computerCard = computerCard[0];
}

$(document).ready(() => {
  deckBuilder();
  deckDivider();

  $("#num1").html(computerDeck.length);
  $("#num2").html(playerDeck.length);

  // when player clicks their deck...
  $("#d2").click(() => {

    // handle when player deck is out of cards
    if (playerDeck.length === 0 && playerStack.length === 0) {
      // display game over text, disable button
      $("#d2").prop("disabled", true);
      $("#gameResults").html("Game Over. Refresh to restart");
      return;
    }
    i
    if (playerDeck.length === 0) { reshuffle("player"); }
    if (computerDeck.length === 0) { reshuffle("computer"); }

    setCardValues();

    $("#c2").html("Suit: " + playerCard.suit + " Rank: " + playerCard.value);
    $("#c1").html("Suit: " + computerCard.suit + " Rank: " + computerCard.value);
    $("#num1").html(computerDeck.length);
    $("#num2").html(playerDeck.length);

    // case if cards are equal
    if (playerCard.value === computerCard.value) {
      cardStack.push(playerCard, computerCard);
    }
    // case once cards aren't equal
    if (playerCard.value > computerCard.value) {
      playerStack.push(computerCard);
      playerStack.concat(cardStack);
    } else if (computerCard.value > playerCard.value) {
      computerStack.push(computerCard);
      computerStack.concat(cardStack);
    }
    cardStack = [];

    console.log("playerCard: ", playerCard, " playerStack: ", playerStack);
    console.log("computerCard: ", computerCard, " computerStack: ", computerStack);
  });
});


