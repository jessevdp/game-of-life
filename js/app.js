$(document).ready(function() {
  grid.drawGrid();
  grid.updateDiameter(250);

  var YX = grid.YX;
  //YX[1][1].addClass('test');

  grid.YX[2][2].setState(0)
  grid.cells[90].setState(0)

  console.log('state1: '+grid.YX[2][2].state);
  console.log('state2: '+grid.cells[90].state);

  $(document).click(function() {
    grid.YX[2][2].setState(1)
    grid.cells[90].setState(1)
    console.log('newState1: '+grid.YX[2][2].state);
    console.log('newState2: '+grid.cells[90].state);
  });

  function checkNeighbours(cell) {
    var x = cell.x;
    var y = cell.y;
    var aliveNeighbours = 0;

    // Determining the right neighbour.
    if (x == grid.amount) {
      var right = grid.YX[y][1];
    }else{
      var right = grid.YX[y][x+1];
    }
    // Determining the left neighbour.
    if (x == 1) {
      var left = grid.YX[y][grid.amount];
    }else{
      var left = grid.YX[y][x-1];
    }
    // Determining the top neighbour
    if (y == 1) {
      var top = grid.YX[grid.amount][x];
    }else{
      var top = grid.YX[y-1][x];
    }
    // Determining the bottom neighbour.
    if(y == grid.amount){
      var bottom = grid.YX[1][x];
    }else {
      var bottom = grid.YX[y+1][x];
    }
    // Determining top right neighbour.
    if (top.x == grid.amount) {
      var topRight = grid.YX[top.y][1];
    }else{
      var topRight = grid.YX[top.y][top.x+1];
    }
    // Determining top left neighbour.
    if(top.x == 1){
      var topLeft = grid.YX[top.y][grid.amount];
    }else {
      var topLeft = grid.YX[top.y][top.x-1]
    }
    // Determining bottom right neighbour.
    if (bottom.x == grid.amount) {
      var bottomRight = grid.YX[bottom.y][1]
    }else {
      var bottomRight = grid.YX[bottom.y][bottom.x+1]
    }
    // Determining top left neighbour.
    if(bottom.x == 1){
      var bottomLeft = grid.YX[bottom.y][grid.amount];
    }else {
      var bottomLeft = grid.YX[bottom.y][bottom.x-1]
    }

    // If a neighbours' state is alive the amount of alive neighbours =+1
    if(right.state == 1){
      aliveNeighbours = aliveNeighbours+1;
    }
    if (left.state == 1) {
      aliveNeighbours = aliveNeighbours+1;
    }
    if(top.state == 1){
      aliveNeighbours = aliveNeighbours+1;
    }
    if(bottom.state == 1){
      aliveNeighbours = aliveNeighbours+1;
    }
    if(topRight.state == 1){
      aliveNeighbours = aliveNeighbours+1;
    }
    if(topLeft.state == 1){
      aliveNeighbours = aliveNeighbours+1;
    }
    if(bottomRight.state == 1){
      aliveNeighbours = aliveNeighbours+1;
    }
    if(bottomLeft.state == 1){
      aliveNeighbours = aliveNeighbours+1;
    }
    // Adding the amount of living neighbours to the cells object
    cell.aliveNeighbours = aliveNeighbours;

  } // end of function
  for (var i = 1; i < grid.amount*grid.amount+1; i++) {
    checkNeighbours(grid.cells[i]);
    console.log(i+': '+grid.cells[i].aliveNeighbours);
  }

});
// --- THE RULES ---
// Any live cell with fewer than two live neighbours dies (referred to as underpopulation or exposure[1]).
// Any live cell with more than three live neighbours dies (referred to as overpopulation or overcrowding).
// Any live cell with two or three live neighbours lives, unchanged, to the next generation.
// Any dead cell with exactly three live neighbours will come to life.
