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

        // setState() function on the cells/YX object so we can call
        // grid.YX[y][x].setState(state) || grid.cells[number].setState(state)
        this.cells[number].setState = function(newState) {
          if (newState == 0 || newState == 1) {
            // Removing dead/alive class if it either.
            if (this.hasClass('dead')) {
              this.removeClass('dead');
            }else if (this.hasClass('alive')) {
              this.removeClass('alive')
            }
            // Setting the objects newState.
            this.state = newState;

            if (this.state == 1) {
              this.addClass('alive');
            }else if (this.state == 0) {
              this.addClass('dead');
            }
          }else {
            // If newState != 1 or 0 then this error is thrown.
            throw newState + ' is not a valid state!'
          }
        }; // end of function

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
