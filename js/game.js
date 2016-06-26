/**
 * Conway's Game of Life in JS
 * https://git.io/gameoflife
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
 */
Game.switchMode = function () {
  var controls = $('.controls');

  if (controls.hasClass('edit')) {
    // Removing the edit class and adding the save class.
    controls.removeClass('edit');
    controls.addClass('save');
    // Emptying the div.
    controls.empty();
    // Adding the save icon.
    controls.append($('<i class="fa fa-play fa-2x"></i>'));
    $('.trash').append($('<i class="fa fa-trash fa-2x"></i>'));

    return 'clear';
  } else {
    // Removing the save class and adding the edit class
    controls.removeClass('save');
    controls.addClass('edit');
    // Emptying the div.
    controls.empty();
    // Adding the pencil icon.
    controls.append($('<i class="fa fa-pencil-square fa-2x"></i>'))
    $('.trash').empty();

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
 * Initialize the game.
 * @param Object settings
 * @param Function callback
 */
Game.init = function (settings, callback) {

  // Set default values if no setting is defined.
  if (!settings.gameInterval) settings.gameInterval = 200;
  if (!settings.diameterInterval) settings.diameterInterval = 250;
  if (!settings.width) settings.width = 50;
  if (!settings.height) settings.height = 50;

  // Put settings in Game object.
  Game.settings.gameInterval = settings.gameInterval;
  Game.settings.diameterInterval = settings.diameterInterval;
  Game.settings.width = settings.width;
  Game.settings.height = settings.height;

  // Initialize the Grid.
  Grid.drawGrid();
  Grid.randomGrid();
  Grid.updateDiameter();

  // Initialize Game tick.
  Game.interval = window.setInterval( () => {
    Game.play();
  }, this.settings.gameInterval);

  // Return to callback.
  callback();
}

/**
 * Stop the Game.
 */
Game.stop = function () {

  clearInterval(Game.interval);
  clearInterval(Grid.interval);

  Grid.clearGrid();
  Grid.cells = {};
  Grid.YX = {};
  Grid.diameter = null;

  $("#grid").html("");

  console.log("Game has been stopped.");

}

/**
 * Register all event listeners.
 * Returns all listener objects.
 * @return Object
 */
Game.registerEvents = function () {

  // Switch between edit and play modes.
  $('.controls').click( () => {
    if (Game.switchMode() === 'clear') {
      clearInterval(Game.interval);
    } else {
      Game.interval = window.setInterval( () => {
        Game.play();
      }, Game.settings.gameInterval);
    }
  });

  // Switch cell state on click.
  $('.cell').click( (e) => {
    console.log(e.target);
    var thisCell = e.target;
    Game.switchState(thisCell);
  });

  // Trash game grid on click.
  $('.trash').click( () => {
    Game.trash();
  });

  // Check if the mouse button is down or not.
  Game.isMouseDown = false;
  $(document).mousedown( () => {
    Game.isMouseDown = true;
  })
  .mouseup( () => {
    Game.isMouseDown = false;
  })

  // Trigger click event if the mouse enters the
  // cell while the mouse button is down.
  $(".cell").mouseenter((e) => {
    if (Game.isMouseDown) $(e.target).click();
  });

}
