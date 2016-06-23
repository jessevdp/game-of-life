var grid = {

  // Empty objects for use later on.
  cells: {},
  YX: {},

  setAmount: function(amount) {
    // This statement will make sure that if amount is not
    // put in there will still be a deafault value.
    var a = amount || 50;
    this.amount = a;
  }, // end

  setDiameter: function() {
    // Checking if the amount is defined. Ifnot it runs the
    // function, giving amount the default value of 50;
    if (this.amount == undefined || this.amount == null) {
      this.setAmount();
    }
    // Checking which is smaller, the windows height or width.
    // The smallest one determines the diameter of the cells.
    if ($(window).height() > $(window).width()) {
      this.diameter = ($(window).width()-($(window).width() / 10)) /  this.amount;
    }else{
      this.diameter = ($(window).height()-($(window).width() / 10)) /  this.amount;
    }

  }, // end

  randomState: function() {
    // Rounding off a random number between 0 and 1 and multiplying
    // it by 1000. Then we see if the number is odd or even.
    // If its even the random state will be 1 else it will be 0

    // This is because just rounding off a random number gives more one's then
    // zero's.
    var randomNum = Math.round(Math.random()*1000);
    if (randomNum%2 == 0) {
      var state = 1;
    }else {
      var state = 0;
    }
    return state;
  }, // end

  setState: function(cell, newState) {
    if (newState == 0 || newState == 1) {
      var $cell = $('#'+cell.number)

      // Removing dead/alive class if it either.
      if ($cell.hasClass('dead')) {
        $cell.removeClass('dead');
      }else if ($cell.hasClass('alive')) {
        $cell.removeClass('alive')
      }

      // Setting the objects newState.
      cell.state = newState;

      // Adding the dead or alive class acordingly.
      if (cell.state == 1) {
        $cell.addClass('alive');
      }else if (cell.state == 0) {
        $cell.addClass('dead');
      }

    }else {
      // If newState != 1 or 0 then this error is thrown.
      throw newState+ ' is not a valid state.'
    }
  },

  drawGrid: function() {

    // some local variables needed:
    var number = 0;
    var y = 1;

    // If the diameter has not yet been set it runs the
    // function and sets it.
    if (this.diameter == undefined || this.diameter == null) {
      this.setDiameter();
    }

    for (var i = 1; i < this.amount+1; i++) {

      // Declaring the x var inside the first loop so
      // it's reset with every line.
      var x = 1;
      // Creating an empty object for every line or y coordinate.
      this.YX[i] = {};

      for (var j = 1; j < this.amount+1; j++) {

        // This number is used in making the 'cells' object,
        // no number can be the same. Soo +1;
        number = number + 1;

        // A variable set equal to a jquery object for a div
        // with a class of .cell, an id of #'number' and a set height and width.
        var $cell = $('<div />')
        .addClass('cell')
        .attr('id', number)
        .height(this.diameter)
        .width(this.diameter);

        // Creating a new empty object inside of the cells object for
        // each number.
        this.cells[number] = {};
        // Addings this cells number to the object for use later on.
        this.cells[number].number = number;
        // Adding this cells X and Y coordinates to the object for use later on.
        this.cells[number].y = y;
        this.cells[number].x = x;

        // Adding a reference to the object we just created but with a diferent
        // way of accesing it. Making it easier to acces the cell by using
        // its Y and X coordinates.
        this.YX[i][j] = this.cells[number];

        // Adding the div with all its classes to
        // the #grid div in the html page.
        $('#grid').append($cell);

        // End of the loop. The next cells' x will be x+1
        x = x + 1;
      } // end of for loop (j)

      // After adding 'amount' divs to the page we add a line breaker to make sure
      // it goes to the next row.
      $('#grid').append($('<br>'));

      // End of the loop. Next row's y will be y+1
      y = y + 1;
    } // end of for loop (i)

  }, // end

  randomGrid: function() {
    for (var i = 1; i < (this.amount*this.amount)+1; i++) {
      this.setState(this.cells[i], this.randomState());
    }
  }, // end

  updateDiameter: function(interval) {
    // SAFETY!, inside the interval 'this' becomes the window
    // object instead of the grid object. We can now use 'self'.
    var self = this;

    window.setInterval(function () {

      var oldDiameter = self.diameter;
      self.setDiameter();

      // The for loop runs a lot of times, this if statement prevents it
      // from running if the diameter does NOT change.
      if (oldDiameter !== self.diameter) {
        for (var i = 1; i < (self.amount*self.amount)+1; i++) {
          var $cell = $('#'+self.cells[i].number)
          $cell.height(self.diameter).width(self.diameter);
        }
      }

    }, interval); // end of interval

  }, // end

  checkNeighbours: function(cell) {
    var x = cell.x;
    var y = cell.y;
    var aliveNeighbours = 0;

    // Determining the right neighbour.
    if (x == this.amount) {
      var right = this.YX[y][1];
    }else{
      var right = this.YX[y][x+1];
    }
    // Determining the left neighbour.
    if (x == 1) {
      var left = this.YX[y][this.amount];
    }else{
      var left = this.YX[y][x-1];
    }
    // Determining the top neighbour
    if (y == 1) {
      var top = this.YX[this.amount][x];
    }else{
      var top = this.YX[y-1][x];
    }
    // Determining the bottom neighbour.
    if(y == this.amount){
      var bottom = this.YX[1][x];
    }else {
      var bottom = this.YX[y+1][x];
    }
    // Determining top right neighbour.
    if (top.x == this.amount) {
      var topRight = this.YX[top.y][1];
    }else{
      var topRight = this.YX[top.y][top.x+1];
    }
    // Determining top left neighbour.
    if(top.x == 1){
      var topLeft = this.YX[top.y][this.amount];
    }else {
      var topLeft = this.YX[top.y][top.x-1]
    }
    // Determining bottom right neighbour.
    if (bottom.x == this.amount) {
      var bottomRight = this.YX[bottom.y][1]
    }else {
      var bottomRight = this.YX[bottom.y][bottom.x+1]
    }
    // Determining top left neighbour.
    if(bottom.x == 1){
      var bottomLeft = this.YX[bottom.y][this.amount];
    }else {
      var bottomLeft = this.YX[bottom.y][bottom.x-1]
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

  }, // end

  nextStates: function(cell) {
    /*=====================================================================
                                    THE RULES
      =====================================================================*/
    // Any live cell with fewer than two live neighbours dies (referred to as underpopulation or exposure).
    // Any live cell with more than three live neighbours dies (referred to as overpopulation or overcrowding).
    // Any live cell with two or three live neighbours lives, unchanged, to the next generation.
    // Any dead cell with exactly three live neighbours will come to life.
    if(cell.state == 1 && cell.aliveNeighbours < 2) {
      cell.nextState = 0;
    }
    else if(cell.state == 1 && cell.aliveNeighbours > 3) {
      cell.nextState = 0;
    }

    else if(cell.state == 1 && cell.aliveNeighbours == 2) {
      cell.nextState = 1;
    }
    else if (cell.state == 1 && cell.aliveNeighbours == 3) {
      cell.nextState = 1;
    }
    else if(cell.state == 0 && cell.aliveNeighbours == 3) {
      cell.nextState = 1;
    }
    else{
      cell.nextState = cell.state;
    }
  }, //end

  gameStep: function() {
    for (var i = 1; i < this.amount*this.amount+1; i++) {
      // Preventing the function from running if the state stays the same.
      if (this.cells[i].nextState != this.cells[i].state) {
        this.setState(this.cells[i], this.cells[i].nextState);
      }
    }
  } // end

}; // end of the grid object
