function init(interval) {
  grid.drawGrid();
  grid.updateDiameter(250);

  window.setInterval(function(){
    for (var i = 1; i < grid.amount*grid.amount+1; i++) {
      grid.checkNeighbours(grid.cells[i]);
      grid.nextStates(grid.cells[i]);
    } // end of for loop
    grid.gameStep();
  },interval); // end of interval
} // end of function

$(document).ready(function(){
  init(200);
});

// --- THE RULES ---
// Any live cell with fewer than two live neighbours dies (referred to as underpopulation or exposure[1]).
// Any live cell with more than three live neighbours dies (referred to as overpopulation or overcrowding).
// Any live cell with two or three live neighbours lives, unchanged, to the next generation.
// Any dead cell with exactly three live neighbours will come to life.
