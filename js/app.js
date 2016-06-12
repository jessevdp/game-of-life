
$(document).ready(function() {
  grid.drawGrid();
  grid.updateDiameter(250);

  var YX = grid.YX;
  YX[1][1].addClass('test');

  grid.setState(0,2,2);
  grid.setState(0,90);

  console.log('state1: '+grid.YX[2][2].state);
  console.log('state2: '+grid.cells[90].state);

  $(document).click(function() {
    grid.setState(1, 2, 2)
    grid.setState(1, 90)
    console.log('newState1: '+grid.YX[2][2].state);
    console.log('newState2: '+grid.cells[90].state);
  });


});
