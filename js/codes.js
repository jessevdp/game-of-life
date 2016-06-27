var codes = {};

var makeCode = function() {
  var c = '';
  for (var i = 1; i < (Grid.amount*Grid.amount)+1; i++) {
    c = c+Grid.cells[i].state.toString()
  }
  return c;
}

var readCode =  function(code) {
  
  var amount = Math.sqrt(code.length);
  // Setting the grids amount to the needed amount.
  Game.newAmount(amount);

  var codeArr = code.split('');

  for (var i = 0; i < codeArr.length; i++) {
    var j = i+1;
    Grid.setState(Grid.cells[j], codeArr[i])
  }
}
