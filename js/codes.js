/**
 * Conway's Game of Life in JS
 * https://git.io/gol
 * MIT Licensed - GoL.js (c) 2016
 */
var Codes = {};

// The base url of the project. Used to generate an url with the grid code.
var baseURL = 'gol.js.org';

/**
 * Makes a code representing the grids values, creating a long string.
 * Returns this string.
 */
Codes.makeCode = function() {
  var c = '';
  for (var i = 1; i < (Grid.amount*Grid.amount)+1; i++) {
    c = c+Grid.cells[i].state.toString()
  }
  return c;
}

/**
 * Compresses the a binary string into a hex string.
 * Returns the compressed string.
 */
Codes.compress = function(bin) {
  bin = bin.toString(); // To make sure the binary is a string;
  var returnValue = ''; // Empty string to add our data to later on.

  // If the lenght of the binary string is not devidable by 8 the compression
  // won't work correctly. So we add leading 0s to the string and store the amount
  // of leading 0s in a variable.


  // Determining the amount of 'padding' needed.
  var padding = ((Math.ceil(bin.length/8))*8)-bin.length;
  // Adding the leading 0s to the binary string.
  for (var i = 0; i < padding; i++) {
    bin = '0'+bin;
  }

  for (var i = 0; i < parseInt(bin.length / 8); i++) {
    // Determining the substring.
    var substring = bin.substr(i*8, 8)
    // Determining the hexValue of this binary substring.
    var hexValue = parseInt(substring, 2).toString(16);
    // Not all binary values produce two hex numbers. For example:
    // '00000011' gives just a '3' while what we wand would be '03'. So we add a 0 in front.
    if(hexValue.length == 1) hexValue = '0'+hexValue;
    // Adding this hexValue to the end string which we will return.
    returnValue += hexValue;
  }

  // Adding the number of leading 0s that need to be ignored when decompressing
  // to the hex string.
  returnValue = padding+'-'+returnValue;

  // Returning the to hex compressed string.
  return returnValue;
}

/**
 * decompresses the compressed hex string back into a binary string.
 * Returns the decompressed string.
 */
Codes.decompress = function(compressed) {
  var returnValue = ''; // Empty string to add our data to later on.

  // Splitting the input on '-' to seperate the number of paddin 0s and the actual hex code.
  var compressedArr = compressed.split('-');
  var paddingAmount = compressedArr[0]; // Setting a variable equal to the amount of leading 0s used while compressing.
  compressed = compressedArr[1]; // Setting the compressed variable to the actual hex code.

  for (var i = 0; i < parseInt(compressed.length / 2); i++) {
    // Determining the substring.
    var substring = compressed.substr(i*2, 2);
    // Determining the binValue of this hex substring.
    var binValue = parseInt(substring, 16).toString(2);

    // If the length of the binary value is not equal to 8 we add leading 0s (js deletes the leading 0s)
    // For instance the binary number 00011110 is equal to the hex number 1e,
    // but simply running the code above will return 11110. So we have to add the leading 0s back.
    if (binValue.length != 8) {
      // Determining how many 0s to add:
      var diffrence = 8 - binValue.length;

      // Adding the 0s:
      for (var j = 0; j < diffrence; j++) {
        binValue = '0'+binValue;
      }
    }

    // Adding the binValue to the end string which we will return.
    returnValue += binValue
  }

  var decompressedArr = returnValue.split('');
  returnValue = ''; // Emptying the return variable.
  for (var i = paddingAmount; i < decompressedArr.length; i++) {
    returnValue += decompressedArr[i];
  }

  // Returning the decompressed string.
  return returnValue;
}

/**
 * Reads a code (representing the grids values) and puts these values back
 * Into a grid object.
 * Also checks if this new grids amount of cells == the current grids amount
 * And if this isn't true then a new grid will be made. (using newAmount function)
 */
Codes.readCode =  function(code) {
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
/**
 * Generates an URL that will link to the current grid.
 * Returns this URL.
 */
Codes.generateURL = function() {
  var code = Codes.makeCode();
  var hash = Codes.compress(code);
  var returnURL = baseURL+'/?hash='+hash;
  return returnURL;
}
/**
 * Loads a grid based on the hash parameter in the URL.
 */
Codes.importFromURL = function () {
  var params = url2params();
  var decomHash = this.decompress(params.hash);
  this.readCode(decomHash);
}
