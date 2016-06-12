var grid = {

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
      grid.setAmount();
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
    // Rounding off a random number between 0 and 1 to
    // get 0 or 1 as a result.
    var state = Math.round(Math.random());
    return state;
  }, // end

  setState: function(newState, NUMBERorY, x) {
    if (newState == 0 || newState == 1) {
      // if x !== undefined it means an x value is put in. So we
      // change the state using the YX[y][x] object rather than the
      // cells[number] object.
      if (x !== undefined) {
        var y = NUMBERorY;

        // Removing the old dead/alive class.
        if (this.YX[y][x].state == 1) {
          this.YX[y][x].removeClass('alive');
        }else if (this.YX[y][x].state == 0) {
          this.YX[y][x].removeClass('dead');
        }

        // Setting it's state equal to the newState.
        this.YX[y][x].state = newState;

        // Adding the dead/alive class.
        if (this.YX[y][x].state == 1) {
          this.YX[y][x].addClass('alive');
        }else if (this.YX[y][x].state == 0) {
          this.YX[y][x].addClass('dead');
        }

        // If x == undefined it means there was no x value put in. So the
        // NUMBERorY value is used as number in cells[number] to change its state
      }else if (x == undefined) {
        var number = NUMBERorY;

        // Removing the old dead/alive class.
        if (this.cells[number].state == 1) {
          this.cells[number].removeClass('alive');
        }else if (this.cells[number].state == 0) {
          this.cells[number].removeClass('dead');
        }

        // Setting it's state equal to the newState.
        this.cells[number].state = newState;

        // Adding the dead/alive class.
        if (this.cells[number]['state'] === 1) {
          this.cells[number].addClass('alive');
        }else if (this.cells[number]['state'] === 0){
          this.cells[number].addClass('dead');
        }

      } // end elseif

    }else{
      throw 'State should be either 1 or 0';
    }

  }, // end

  drawGrid: function() {
    // This function draws the grid and creates the objects
    // used to indevidually adress all the cells (cells & YX).

    // Creating an empty object for use later on.
    this.cells = {};
    this.YX = {};
    // Some variables needed.
    var number = 0;
    var y = 1;

    // If the diameter has not yet been set it runs the
    // function and sets it.

    if (this.diameter == undefined || this.diameter == null) {
      this.setDiameter();
    }

    // Two for loops, each runnin 'amount' times.
    // The inside for loop creates 'amount' div's and
    // adds them to the HTML page. The outside loop
    // runs the inner one and adds a line breaker (<br>)
    // at the end, making sure there's no more than
    // 'amount' div's on one line
    for (var i = 1; i < this.amount+1; i++) {
        // Declaring the x var inside the first loop so
        // it's reset with every line.
        var x = 1;
        this.YX[i] = {};
      for (var j = 1; j < this.amount+1; j++) {
        // A variable set equal to a jquery object for a div
        // with a class of .cell and a set height and width.
        var $cell = $('<div />')
        .addClass('cell')
        .height(this.diameter)
        .width(this.diameter);

        // This number is used in making the 'cells' object,
        // no number can be the same. Soo +1;
        number = number + 1;

        // Adding a reference to this particular cell inside of
        // the cells object so we can change its classes later on.
        this.cells[number] = $cell;
        // Adding the value of 'number' to the object
        this.cells[number]['number'] = number;
        // Adding the X and Y coordinate
        this.cells[number]['y'] = y;
        this.cells[number]['x'] = x;

        this.setState(this.randomState(), number);

        // Adding the div with all its classes to
        // the #grid div in the html page.
        $('#grid').append($cell);

        this.YX[i][j] = this.cells[number];

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

  updateDiameter: function(interval) {
    // SAFETY!, inside the interval 'this' becomes the window
    // object instead of the grid object. We can now use 'self'.
    var self = this;
    window.setInterval(function () {

      var oldDiameter = self.diameter;
      grid.setDiameter();

      // The for loop runs a lot of times, this if statement prevents it
      // from running if the diameter does NOT change.
      if (oldDiameter !== self.diameter) {
        for (var i = 1; i < (self.amount*self.amount)+1; i++) {
          self.cells[i].height(self.diameter).width(self.diameter);
        }
      }

    }, interval);
  } // end

}; // end of object
