/**
 * Conway's Game of Life in JS
 * https://git.io/gol
 * MIT Licensed - GoL.js (c) 2016
 */

var Game = {};
Game.settings = {};

/**
 * Play a game step.
 */
Game.play = function () {
  for (var i = 1; i < Grid.amount * Grid.amount + 1; i++) {
    Grid.checkNeighbours(Grid.cells[i]);
    Grid.nextStates(Grid.cells[i]);
  } // end of for loop
  Grid.gameStep();
}

/**
 * Switch between edit and play modes.
 * @param String, 'pause' or 'play'
 * optional, only if a specific task needs to be done.
 */
Game.switchMode = function (mode) {
  var controls = $('.controls');

  // Emptying .trash, .random, .share and .size Div.
  $('.trash').empty();
  $('.random').empty();
  $('.share').empty();
  $('.size').empty();

  if (controls.hasClass('edit') || mode == 'pause') {
    // Removing the edit class and adding the save class.
    controls.removeClass('edit');
    controls.addClass('save');
    // Emptying the div.
    controls.empty();
    // Adding the save icon.
    controls.append($('<i class="fa fa-play fa-2x"></i>'));
    // Adding all the option's icons.
    $('.trash').append($('<i class="fa fa-trash fa-2x"></i>'));
    $('.random').append($('<i class="fa fa-random fa-2x"></i>'));
    $('.share').append($('<i class="fa fa-share-square-o fa-2x"></i>'));
    $('.size').append($('<i class="fa fa-expand fa-2x"></i>'));

    return 'clear';
  } else if (controls.hasClass('save') || mode == 'play') {
    // Removing the save class and adding the edit class
    controls.removeClass('save');
    controls.addClass('edit');
    // Emptying the div.
    controls.empty();
    // Adding the pencil icon.
    controls.append($('<i class="fa fa-pencil-square fa-2x"></i>'));

    // Other 'option' icons don't need to be deleted,
    // since this has been done at the start of the function.

    return 'set';
  }
}

/**
 * Switch the state of the given cell.
 * @param Element thisCell
 */
Game.switchState = function (thisCell) {
  var id = $(thisCell).attr('id');
  var gcell = Grid.cells[id];

  if ($('.controls').hasClass('save')) {
    if (gcell.state == 1) {
      Grid.setState(gcell, 0);
    }else {
      Grid.setState(gcell, 1);
    }
  }
}

/**
 * Clear the grid if edit mode is active.
 */
Game.trash = function () {
  if ($('.controls').hasClass('save')) {
    Grid.clearGrid();
  }
}

/**
 * Draw a random grid if edit mode is active.
 */
Game.randomGrid = function () {
  if ($('.controls').hasClass('save')) {
    Grid.randomGrid();
  }
}

/**
 * Initialize the game.
 * @param Object settings
 * @param Function callback
 */
Game.init = function (settings, callback) {

  // Set default values if no setting is defined.
  if (!settings) settings = {};
  if (!settings.gameInterval) settings.gameInterval = 200;
  if (!settings.diameterInterval) settings.diameterInterval = 250;
  if (!settings.width) settings.width = 50;
  if (!settings.height) settings.height = 50;
  if (!settings.type) settings.type = "random";

  // Put settings in Game object.
  Game.settings.gameInterval = settings.gameInterval;
  Game.settings.diameterInterval = settings.diameterInterval;
  Game.settings.mode = settings.mode;
  Game.settings.width = settings.width;
  Game.settings.height = settings.height;
  Game.settings.type = settings.type;

  // Initialize the Grid.
  Grid.drawGrid();


  // Check what game type was requested.
  if (this.settings.type == 'random') {
    Grid.randomGrid();
  }
  else if (this.settings.type == 'hash') {
    Codes.importFromURL();
  } else if (this.settings.type == 'empty') {
    Grid.emptyGrid();
  }
  else {
    throw "Unknown game type for settings.type";
  }

  // Update the cell diameter on window width change.
  Grid.updateDiameter();

  if (this.settings.type != 'empty'){
    // Initialize Game tick.
    Game.interval = window.setInterval(function() {
      Game.play();
    }, this.settings.gameInterval);
  }


  // Return to callback.
  if (callback) callback();
}

/**
 * Stop the Game.
 */
Game.stop = function () {

  clearInterval(Game.interval);
  clearInterval(Grid.interval);

  Game.switchMode();

  Grid.clearGrid();
  Grid.cells = {};
  Grid.YX = {};
  Grid.diameter = null;

  $("#grid").html("");

}

/**
 * Pause or un-pause the Game.
 * @param String, 'pause' or 'play'
 * Optional, only if a specific task needs to be done.
 */
Game.togglePause = function (mode) {
  if (Game.switchMode(mode) === 'clear') {
    clearInterval(Game.interval);
  } else {
    Game.interval = window.setInterval(function () {
      Game.play();
    }, Game.settings.gameInterval);
  }
}

/**
 * Request user input for a new gird size.
 * Makes sure this input is a number between (1< number <= 75).
 * Returns to callback. (only if the input passes the conditions listed above)
 */
Game.getNewSize = function(callback) {
  var newSize = prompt('Please enter a grid size!', 'Grid size');
  var number = Number(newSize);
  if (isNaN(newSize)) {
    alert('"'+newSize+'"'+' is not a number.\nPlease try again!');
    var returnValue = false;
  }else if (!isInt(number)) {
    alert(newSize+' is not a round number.\nPlease try again!');
    var returnValue = false;
  }else if (number > 75) {
    alert('Sorry '+newSize+' is too big!\nPlease try again!');
    var returnValue = false;
  }else if (number <= 1) {
    alert('Please enter a number greather than 1!\nPlease try again!');
    var returnValue = false;
  } else {
    var returnValue = number;
  }
  callback(returnValue);
}

/**
 * Register all event listeners.
 * Returns all listener objects.
 * @return Object
 */
Game.registerEvents = function () {

  $(window).blur(function () {
     Game.togglePause('pause');
  });

  // Switch between edit and play modes.
  $('.controls').click(function () {
    Game.togglePause();
  });

  // Switch cell state on click.
  $(document).on('click','.cell', function (e) {
    var thisCell = e.target;
    Game.switchState(thisCell);
  });

  // Check if the mouse button is down or not.
  Game.isMouseDown = false;
  $(document).mousedown(function () {
    Game.isMouseDown = true;
  })
  .mouseup(function () {
    Game.isMouseDown = false;
  })

  // Trigger click event if the mouse enters the
  // cell while the mouse button is down.
  $(document).on('mouseenter', '.cell', function(e) {
    if (Game.isMouseDown) $(e.target).click();
  });

  // Trash game grid on click.
  $('.trash').click(function () {
    Game.trash();
  });

  // Randomize game grid on click.
  $('.random').click(function () {
    Game.randomGrid();
  });

  $('.size').click(function () {
    Game.getNewSize(function (newSize) {
      if (!newSize === false) {
        Game.newAmount(newSize, true);
      }
    });
  });

  // Copy sharable 'grid' link to clipboard on click.
  $('.share').click(function () {
    Codes.generateURL(function (url) {
      copyToClipboard(url);
    });
  });

}

/**
 * Set the game to a new Amount of cells.
 */
Game.newAmount = function (amount) {

  if (typeof(amount) != "number") {
    throw amount+' is not a valid amount'
  }
  if (Grid.amount == undefined) {
    Grid.amount = amount;
  }else {
    if (Grid.amount != amount) {
      this.stop();
      Game.init({width: amount, type:'empty'})
      Game.togglePause();
    }
  }
}
