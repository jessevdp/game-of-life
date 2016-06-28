var codes = {};


/**
 * Checks if the input is an integer.
 * Returns true or false.
 */
function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

/**
 * Makes a code representing the grids values, creating a long string.
 * Returns this string.
 */
codes.makeCode = function() {
  var c = '';
  for (var i = 1; i < (Grid.amount*Grid.amount)+1; i++) {
    c = c+Grid.cells[i].state.toString()
  }
  return c;
}

/**
 * Compresses the code into a string of base64 chars.
 * Returns the compressed string.
 */
codes.compress = function(code) {
  return LZString.compressToBase64(code);
}

/**
 * decompresses the compressed code from a string of base64 chars.
 * Returns the decompressed string.
 */
codes.decompress = function(compressedCode) {
  return LZString.decompressFromBase64(compressedCode)
}

/**
 * Reads a code (representing the grids values) and puts these values back
 * Into a grid object.
 * Also checks if this new grids amount of cells == the current grids amount
 * And if this isn't true then a new grid will be made. (using newAmount function)
 */
codes.readCode =  function(code) {
  // Making sure the code is a string not a number.
  code = code.toString();
  var amount = Math.sqrt(code.length);
  // checking if the square root of the codes lenght is an integer.
  // If not an error is thrown because we can't make half cells
  if (!isInt(amount)) {
    throw code.length + ' is not an acceptable length'
  }
  // Setting the grids amount to the needed amount.
  Game.newAmount(amount);

  var codeArr = code.split('');

  for (var i = 0; i < codeArr.length; i++) {
    var j = i+1;
    Grid.setState(Grid.cells[j], codeArr[i])
  }
}
