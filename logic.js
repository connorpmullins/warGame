const suits = ["heart", "club", "diamond", "spade"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const deck = [];
let p1 = [];
let p2 = [];
let cardStack = [];

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

function deckBuilder() {
  for (const suit of suits) {
    for (const value of values) {
      deck.push(new Card(suit, value));
    }
  }
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
}

function deckDivider() {
  shuffle(deck);
  const halfDeck = Math.ceil(deck.length / 2);
  p1 = deck.splice(0, halfDeck);
  p2 = deck;
}

$(document).ready(() => {
  deckBuilder();
  deckDivider();
  $("#num1").html(p1.length);
  $("#num2").html(p2.length);
  console.log("p1: ", p1, " p2: ", p2);

  // can I extract logic to helper functions? Clean up later.
  // when player clicks their deck...
  $("#d2").click(() => {
    let computerCard = p1.splice(0,1);
    let playerCard = p2.splice(0,1);
    playerCard = playerCard[0];
    computerCard = computerCard[0]
    console.log("playerCard: ", playerCard);
    $("#c2").html("Suit: " + playerCard.suit + " Rank: " + playerCard.value);
    $("#c1").html("Suit: " + computerCard.suit + " Rank: " + computerCard.value);
    $("#num1").html(p1.length);
    $("#num2").html(p2.length);

    // case if cards are equal
    if (playerCard.value === computerCard.value) {
      cardStack.push(playerCard)
    }
    // case if cards aren't equal
    else {

    }

    if (p2.length === 0) {
      // display game over text, disable button
      $("#d2").prop("disabled", true);
      $("#gameResults").html("Game Over. Refresh to restart");
    }
  });
});



