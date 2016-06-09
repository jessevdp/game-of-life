  var amount = 50;

  // Checking which is smaller, the windows height or width.
  // The smallest one determines the diameter of the cells.
  if ($(window).height() > $(window).width()) {
    var diameter = ($(window).width()-30) /  amount;
  }else{
    var diameter = ($(window).height()-30) /  amount;
  }

  var cells = {};

  var number = 0;
  var y = 1;

$(document).ready(function() {
  for (var i = 0; i < amount; i++) {
      var x = 1;
    for (var j = 0; j < amount; j++) {

      // Rounding off a random number between 0 and 1 to get 0 or 1 as a result.
      var state = Math.round(Math.random());

      // A variable set equal to a jquery object for a div with a class
      // of .cell and a set height and width.
      var $cell = $('<div />')
      .addClass('cell')
      .height(diameter)
      .width(diameter);

      number = number+1;

      // Adding a reference to this particular cell inside of the cells object
      // so we can change its classes later on.
      cells[number] = $cell;

      // Adding the state of the cell to the cell object.
      cells[number]['state'] = state;

      // Adding the dead or alive class.
      if (cells[number]['state'] === 1) {
        $cell.addClass('alive');
      }else if (cells[number]['state'] === 0){
        $cell.addClass('dead');
      }

      // Adding the div with all its classes to the #grid div in the html page.
      $('#grid').append($cell);

      // Adding the cells x value to the cells object.
      cells[number]['x'] = x;

      x = x+1

    };
    // After adding 'amount' divs to the page we add a line breaker to make sure
    // it goes to the next row.
    $('#grid').append($('<br>'));

    cells[number]['y'] = y;
    //console.log('y: ' + cells[number]['y']);
    y = y+1;
  };

  // Constantly running function to adjust the height and width of the cells.
  window.setInterval(function() {
    // setting a variable equal to the previous value of diameter for later use.
    var oldDiameter = diameter;

    // Checking which is smaller, the windows height or width.
    // The smallest one determines the diameter of the cells.
    if ($(window).height() > $(window).width()) {
      diameter = ($(window).width()-30) /  amount;
    }else{
      diameter = ($(window).height()-30) /  amount;
    }

    // The for loop runs a lot of times, this if statement prevents it
    // from running if the diameter does NOT change.
    if (oldDiameter !== diameter) {
      for (var i = 1; i < (amount*amount)+1; i++) {
        cells[i].height(diameter).width(diameter);
      }
    }
  }, 250);

  // Putting all the values of the cells object into the YX object to make searching the cells by
  // only X and Y values way easier.
  var YX = {};
  var a = 0;
  for (var i = 1; i < amount+1; i++) {
    YX[i] = {};
    for (var j = 1; j < amount+1; j++) {
      a = a+1;
      YX[i][j] = cells[a];
    }
  }
  console.log(YX);

  // testing if it works
  // IT DOES ;)

  // Y  X
  // ^  ^
  //YX[2][8].addClass('test');

  /*
  // Returns a random number between min (inclusive) and max (exclusive)
  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  var randomCell = getRandomArbitrary(1, (amount*amount)+1);
  console.log(randomCell);
  cells[randomCell].addClass('test')
  */


});



// Below there's a setup of what the YX object would look like to help understand it better.
/*
var YX = {
  // y = 1
  1: {
    // x = 1
    1:  $('<div />'),
    // x = 2
    2: $('<div />'),
    // etc.
    50: $('<div />')
  },
  // y = 2
  2: {
    // x = 1
    1:  $('<div />'),
    // x = 2
    2: $('<div />'),
    // etc.
    50: $('<div />')
  },
  // etc.
  50: {
    // x = 1
    1:  $('<div />'),
    // x = 2
    2: $('<div />'),
    // etc.
    50: $('<div />')
  }
};
*/
