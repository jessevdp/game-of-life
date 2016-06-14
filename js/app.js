$(document).ready(function() {
  grid.drawGrid();
  grid.updateDiameter(250);

  var YX = grid.YX;
  YX[1][1].addClass('test');

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

});
