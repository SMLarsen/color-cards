var card = {};
var inputArray = [];
var cardArray = [];
var position = 0;
var interval;
var currentCard = 0;
var totalCards = 0;
var color="";

var colorStyles = [
  {name: 'red', font: 'white'},
  {name: 'orange', font: 'black'},
  {name: 'yellow', font: 'black'},
  {name: 'green', font: 'white'},
  {name: 'blue', font: 'white'},
  {name: 'purple', font: 'white'},
  {name: 'white', font: 'black'},
  {name: 'black', font: 'white'}];

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

//====================  Events  =========================

  $(".color").on("click", function(event) {
    event.preventDefault();
    color = $(this).data("color");
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });

  $("#add-button").on("click", function(event) {
    event.preventDefault();
    $(".color").siblings().removeClass('active');
    addCard();
  });

    $("#play-btn").on("click", function() {
      console.log('play');
      startDisplay();
    });

    $("#stop-btn").on("click", function() {
      console.log('stop');
      stopBtn();
    });
//==================  Functions  ===================

// Adds color cards to playlist
  function addCard() {
    inputArray = $(".config-form").serializeArray();
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
    timerSeconds = cardValues.duration;
    showTimer = 'No';
    if (cardValues.countdown === 'true') {
      showTimer = 'Yes';
    }

    card = new Card(position, color, timerSeconds, showTimer);
    cardArray.push(card);
    totalCards = cardArray.length;

    displayCard(card);
  }

// Adds color card as a row in the playlist table
  function displayCard (card) {
    var string = '<tr class="cardRow"' + getColorStyle(card.color) + '>';
    string += '<td>' + card.position + '</td>';
    // string += '<td>' + card.color + '</td>';
    string += '<td>' + card.timerSeconds + '</td>';
    string += '<td>' + card.showTimer + '</td>';
    string += '</tr>';
    console.log(string);
    $('#card-table').append(string);
  }

// Starts the playlist and hides the configuration section
  function startDisplay() {
    card = cardArray[currentCard];
    currentCard++;
    $('.config-container').css("visibility", "hidden");
    $('.display-container').css("visibility", "visible");
    $('body').css("background-color", card.color);
    setTimeout(setCardCSS, card.timerSeconds * 1000);
  }

// Changes display per playlist timings
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

// Formats html styling based on selected color
  function getColorStyle(color) {
      for (var i = 0; i < colorStyles.length; i++) {
        if (colorStyles[i].name === color) {
          string = ' style="background-color: ' +  color +
          '; color: ' + colorStyles[i].font + '">';
          return string;
        }
      }
  }

});
