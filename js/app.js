function playGame() {
  for (var i = 1; i < grid.amount*grid.amount+1; i++) {
    grid.checkNeighbours(grid.cells[i]);
    grid.nextStates(grid.cells[i]);
  } // end of for loop
  grid.gameStep();
}
function switchMode(game, interval) {
  var controls = $('.controls');

  if (controls.hasClass('edit')) {
    // Pausing the game by clearing the interval.
    clearInterval(game);

    // Removing the edit class and adding the save class.
    controls.removeClass('edit');
    controls.addClass('save');
    // Emptying the div.
    controls.empty();
    // Adding the save icon.
    controls.append($('<i class="fa fa-play fa-2x"></i>'));
    $('.trash').append($('<i class="fa fa-trash fa-2x"></i>'));
  }else {
    // Starting the game again by re-setting the interval.
    game = window.setInterval(function() {
      playGame();
    },interval); // end of interval

    // Removing the save class and adding the edit class
    controls.removeClass('save');
    controls.addClass('edit');
    // Emptying the div.
    controls.empty();
    // Adding the pencil icon.
    controls.append($('<i class="fa fa-pencil-square fa-2x"></i>'))
    $('.trash').empty();
  }
}
function switchState(thisCell) {
  var id = $(thisCell).attr('id');
  var gcell = grid.cells[id];

  if ($('.controls').hasClass('save')) {
    if (gcell.state == 1) {
      grid.setState(gcell, 0);
    }else {
      grid.setState(gcell, 1);
    }
  }
}
function trash() {
  if ($('.controls').hasClass('save')) {
    grid.clearGrid();
  }
}

<<<<<<< HEAD
function init(interval) {

  grid.setAmount(30);
  grid.drawGrid();
  grid.randomGrid();
  grid.updateDiameter(250);

  var game = window.setInterval(function() {
    playGame();
  },interval);
=======
  $('.cell').click( (event) => {

    var id = $(event.target).attr('id');
    var gcell = grid.cells[id];

    if ($('.controls').hasClass('save')) {
      if (gcell.state == 1) {
        grid.setState(gcell, 0);
      } else {
        grid.setState(gcell, 1);
      }
    }
>>>>>>> origin/development

  $('.controls').click(function() {
    switchMode(game, interval)
  });
  $('.cell').click(function(){
    var thisCell = this;
    switchState(thisCell);
  });

  // Check if the mouse button is down or not.
  var isMouseDown = false;
  $(document).mousedown( () => {
    isMouseDown = true;
  })
  .mouseup( () => {
    isMouseDown = false;
  })

  // Trigger click event if the mouse enters the
  // cell while the mouse button is down.
  $(".cell").mouseenter((e) => {
    if (isMouseDown) $(e.target).click();
  })

  $('.trash').click(function() {
    trash();
  });

} // end of function

$(document).ready(function(){

  init(200);

});

// --- THE RULES ---
// Any live cell with fewer than two live neighbours dies (referred to as underpopulation or exposure[1]).
// Any live cell with more than three live neighbours dies (referred to as overpopulation or overcrowding).
// Any live cell with two or three live neighbours lives, unchanged, to the next generation.
// Any dead cell with exactly three live neighbours will come to life.
