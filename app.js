var card = {};
var inputArray = [];
var cardArray = [];
var position = 0;
var interval;
var currentCard = 0;
var totalCards = 0;

function Card(position, color, timerSeconds, showTimer) {
  this.position = position;
  this.color = color;
  this.timerSeconds = timerSeconds;
  this.showTimer = showTimer;
}

// create card deck for testing purposes
// var card = new Card(0, 'orange', 2, false);
// cardArray.push(card);
// var card = new Card(0, 'red', 2, false);
// cardArray.push(card);
// var card = new Card(0, 'blue', 2, false);
// cardArray.push(card);
// var card = new Card(0, 'green', 2, false);
// cardArray.push(card);

$(document).ready(function() {
//-------------------
  $("#start-btn").on("click", function(event) {
    event.preventDefault();
    startBtn();
  });

  $("#stop-btn").on("click", function(event) {
    event.preventDefault();
    stopBtn();
  });
  //-------------------


  $("#add-button").on("click", function(event) {
    event.preventDefault();
    addCard();
  });

  $("#start-button").on("click", function(event) {
    event.preventDefault();
    startDisplay();
  });

  function addCard() {
    inputArray = $(".config-form").serializeArray();

    var color = '';
    var timerSeconds = 0;
    var showTimer = false;
    cardValues = {};

    $.each(inputArray, function(i, field){
      $("#results").append(field.name + ":" + field.value + " ");
    });

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

    totalCards = cardArray.length;

    displayCard(card);
  }

  function displayCard (card) {
    var string = '<tr class="cardRow">';
    string += '<td>' + card.position + '</td>';
    string += '<td>' + card.color + '</td>';
    string += '<td>' + card.timerSeconds + '</td>';
    string += '<td>' + card.showTimer + '</td>';
    string += '</tr>';
    $('#card-table').append(string);
  }

  function startDisplay() {
    card = cardArray[currentCard];
    currentCard++;
    $('.config-container').css("visibility", "hidden");
    $('.display-container').css("visibility", "visible");
    $('body').css("background-color", card.color);
    setTimeout(setCardCSS, card.timerSeconds * 1000);
  }

  function setCardCSS() {
    if (currentCard < totalCards) {
      card = cardArray[currentCard];
      currentCard++;
      $('body').css("background-color", card.color);
      setTimeout(setCardCSS, card.timerSeconds * 1000);
    } else {
      $('body').css("background-color", 'white');
      $('.display-container').css("visibility", "hidden");
      $('.config-container').css("visibility", "visible");
    }
  }
});
