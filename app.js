var card = {};
var inputArray = [];
var cardArray = [];
var position = 0;
var timeout;
var counter;
var currentCard = 0;
var totalCards = 0;
var color="";
var seconds=0;
var delBtnEl = '<button type="button" class="card-button delete-button" name="delete-button">' +
  '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
  '</button>';
var upBtnEl = '<button type="button" class="card-button up-button" name="up-button">' +
  '<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>' +
  '</button>';
var downBtnEl = '<button type="button" class="card-button down-button" name="down-button">' +
  '<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>' +
  '</button>';

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
    cardButtonAbilifier();
  });

  $("#trash-button").on("click", function(event) {
    event.preventDefault();
    $('#cardHeader').siblings().remove();
  });

  $("#card-table").on("click", ".delete-button", function(event) {
    event.preventDefault();
    deleteCard($(this));
    cardButtonAbilifier();
  });

  $("#card-table").on("click", ".up-button", function(event) {
    event.preventDefault();
    moveCardUp($(this));
    cardButtonAbilifier();
  });

  $("#card-table").on("click", ".down-button", function(event) {
    event.preventDefault();
    moveCardDown($(this));
    cardButtonAbilifier();
  });

  $("#play-btn").on("click", function() {
    startDisplay();
  });

  $("#stop-btn").on("click", function() {
    stopDisplay();
  });

  $("#repeat-btn").on("click", function() {
    startDisplay();
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
    showTimer = cardValues.countdown;
    card = new Card(position, color, timerSeconds, showTimer);
    cardArray.push(card);
    totalCards = cardArray.length;
    displayCard(card);
  }

// Adds color card as a row in the playlist table
  function displayCard (card) {
    var string = '<tr class="cardRow"' + getColorStyle(card.color) + '>';
    string += '<td>' + card.position + '</td>';
    string += '<td>' + card.timerSeconds + '</td>';
    string += '<td>' + card.showTimer + '</td>';
    string += '<td>' + upBtnEl + delBtnEl + downBtnEl + '</td>';
    string += '</tr>';
    $('#card-table').append(string);
    cardButtonAbilifier();
  }

// enable and disable card movement buttons
function cardButtonAbilifier() {
  $('.cardRow').find('.up-button').prop("disabled", false);
  $('.cardRow').find('.down-button').prop("disabled", false);

  $('.cardRow').find('.up-button').first().prop("disabled", true);
  $('.cardRow').find('.down-button').last().prop("disabled", true);
}

// delete card from playlist
  function deleteCard($this) {
    var $el = $this.parent().parent();
    $el.remove();
  }

// move card up one row in playlist
  function moveCardUp($this) {
    var $el = $this.parent().parent();
    $el.insertBefore($el.prev('.cardRow'));
  }

// move card down one row in playlist
  function moveCardDown($this) {
    var $el = $this.parent().parent();
    $el.insertAfter($el.next('.cardRow'));
  }

// Starts the playlist and hides the configuration section
  function startDisplay() {
    card = cardArray[currentCard];
    currentCard++;
    $('.config-container').css("visibility", "hidden");
    $('#display-container').css("visibility", "visible");
    $('body').css("background-color", card.color);
    if (card.showTimer === 'On') {setTimer();}
    timeout = setTimeout(setCardCSS, card.timerSeconds * 1000);
  }

// Changes display per playlist timings
  function setCardCSS() {
    if (currentCard < totalCards) {
      card = cardArray[currentCard];
      currentCard++;
      $('body').css("background-color", card.color);
      console.log('timerSeconds', card.timerSeconds);
      if (card.showTimer === 'On') {
        setTimer();
      }
      timeout = setTimeout(setCardCSS, card.timerSeconds * 1000);
    } else {
      $('body').css("background-color", 'white');
      $('#display-container').css("visibility", "hidden");
      $('.config-container').css("visibility", "visible");
      $('#counter-seconds').text('');
    }
  }

// Stops display of playlist
function stopDisplay () {
  clearInterval(timeout);
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

// Countdown timer
  function setTimer() {
    seconds = card.timerSeconds;
    counter=setInterval(timer, 1000); //1000 will  run it every 1 second
    console.log('set', seconds, counter);
  }

  function timer() {
    seconds--;
    console.log('timer', seconds, counter);
    if (seconds <= 0)
    {
       clearInterval(counter);
       return;
    }
    $('#counter-holder').text(seconds);
  }

});
