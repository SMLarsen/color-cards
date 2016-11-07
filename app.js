var card = {};
var inputArray = [];
var cardArray = [];
var position = 0;

function Card(position, color, timerSeconds, showTimer) {
  this.position = position;
  this.color = color;
  this.timerSeconds = timerSeconds;
  this.showTimer = showTimer;
}

$(document).ready(function() {

  $("#add-button").on("click", function(event) {
    event.preventDefault();
    addCard();
  });

function addCard() {
  inputArray = $(".config-form").serializeArray();
  $.each(inputArray, function(i, field){
    $("#results").append(field.name + ":" + field.value + " ");
  });
  var color = '';
  var timerSeconds = 0;
  var showTimer = false;
  cardValues = {};
  inputArray.forEach(function (element, index, array) {
    cardValues[element.name] = element.value;
  });
  position++;
  color = cardValues.color;
  timerSeconds = cardValues.duration;
  showTimer = false;
  if (cardValues.countdown === 'true') {
    showTimer = true;
  }
  card = new Card(position, color, timerSeconds, showTimer);
  cardArray.push(card);
  displayCard(card);
  console.log(cardArray);
}

function displayCard (card) {
  var string = '<tr class="cardRow">';
  string += '<td>' + card.position + '</td>';
  string += '<td>' + card.color + '</td>';
  string += '<td>' + card.timerSeconds + '</td>';
  string += '<td>' + card.showTimer + '</td>';
  string += '</tr>';
  $('#card-table').append(string);
  console.log(1234);
}


});
