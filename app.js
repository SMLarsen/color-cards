var card = {};

function Card(color, timerSeconds, showTimer) {
  this.color = color;
  this.timerSeconds = timerSeconds;
  this.showTimer = showTimer;
}

var cardArray = [];

for (var i = 0; i < 3; i++) {
  card = new Card('red', 1000, false);
  cardArray.push(card);
}

console.log(cardArray);
