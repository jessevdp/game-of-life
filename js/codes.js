/**
 * Conway's Game of Life in JS
 * https://git.io/gol
 * MIT Licensed - GoL.js (c) 2016
 */
var Codes = {};

// The base url of the project. Used to generate an url with the grid code.
var baseURL = 'https://gol.js.org';

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
 * Compresses the a binary string into a compressed string.
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

  // Compressing the hex string even further.
  // If there's any double hex chars in the string it will take those and compress those into 1 char.
  // Then if we have multiple of those chars these are compressed into 1 char again.
  // For example: the hex string "ff will result in a "v" and "ffff" will result in a "V".
  // Also: "11" will result in a "h" and "1111" will result in a "H"
  // For the 0s this process is repeated a few times.
  // (string with 4096 0s) (this would represent a 64*64 EMPTY grid)
  // will result in a "Z".
  var returnValue = returnValue.replace(/00/g, 'g')
                               .replace(/gg/g, 'G')
                              // Since 0s are probably more likely to exist in our binary and hex, we go a step further compressing them like this:
                               .replace(/GG/g, 'w')
                               .replace(/ww/g, 'W')
                               .replace(/WW/g, 'x')
                               .replace(/xx/g, 'X')
                               .replace(/XX/g, 'y')
                               .replace(/yy/g, 'Y')
                               .replace(/YY/g, 'z')
                               .replace(/zz/g, 'Z')
                               //Rest of the chars...
                               .replace(/11/g, 'h')
                               .replace(/hh/g, 'H')
                               .replace(/22/g, 'i')
                               .replace(/ii/g, 'I')
                               .replace(/33/g, 'j')
                               .replace(/jj/g, 'J')
                               .replace(/44/g, 'k')
                               .replace(/kk/g, 'K')
                               .replace(/55/g, 'l')
                               .replace(/ll/g, 'L')
                               .replace(/66/g, 'm')
                               .replace(/mm/g, 'M')
                               .replace(/77/g, 'n')
                               .replace(/nn/g, 'N')
                               .replace(/88/g, 'o')
                               .replace(/oo/g, 'O')
                               .replace(/99/g, 'p')
                               .replace(/pp/g, 'P')
                               .replace(/aa/g, 'q')
                               .replace(/qq/g, 'Q')
                               .replace(/bb/g, 'r')
                               .replace(/rr/g, 'R')
                               .replace(/cc/g, 's')
                               .replace(/ss/g, 'S')
                               .replace(/dd/g, 't')
                               .replace(/tt/g, 'T')
                               .replace(/ee/g, 'u')
                               .replace(/uu/g, 'U')
                               .replace(/ff/g, 'v')
                               .replace(/vv/g, 'V');

  // Adding the number of leading 0s that need to be ignored when decompressing to the string.
  returnValue = padding+'-'+returnValue;

  // Returning the compressed string.
  return returnValue;
}

/**
 * Decompresses the compressed string back into a binary string.
 * Returns the decompressed string.
 */
Codes.decompress = function(compressed) {
  var returnValue = ''; // Empty string to add our data to later on.

  // Splitting the input on '-' to seperate the number of paddin 0s and the actual hex code.
  var compressedArr = compressed.split('-');
  var paddingAmount = compressedArr[0]; // Setting a variable equal to the amount of leading 0s used while compressing.
  compressed = compressedArr[1]; // Setting the compressed variable to the actual hex code.

  // Decompressing further compressed characters.
  compressed = compressed// Decompressing the further compressed 0s. (even further then the rest of the chars.)
                         .replace(/Z/g, 'zz')
                         .replace(/z/g, 'YY')
                         .replace(/Y/g, 'yy')
                         .replace(/y/g, 'XX')
                         .replace(/X/g, 'xx')
                         .replace(/x/g, 'WW')
                         .replace(/W/g, 'ww')
                         .replace(/w/g, 'GG')
                         .replace(/G/g, 'gg')
                         .replace(/g/g, '00')
                         // Rest of chars...
                         .replace(/H/g, 'hh')
                         .replace(/h/g, '11')
                         .replace(/I/g, 'ii')
                         .replace(/i/g, '22')
                         .replace(/J/g, 'jj')
                         .replace(/j/g, '33')
                         .replace(/K/g, 'kk')
                         .replace(/k/g, '44')
                         .replace(/L/g, 'll')
                         .replace(/l/g, '55')
                         .replace(/M/g, 'mm')
                         .replace(/m/g, '66')
                         .replace(/N/g, 'nn')
                         .replace(/n/g, '77')
                         .replace(/O/g, 'oo')
                         .replace(/o/g, '88')
                         .replace(/P/g, 'pp')
                         .replace(/p/g, '99')
                         .replace(/Q/g, 'qq')
                         .replace(/q/g, 'aa')
                         .replace(/R/g, 'rr')
                         .replace(/r/g, 'bb')
                         .replace(/S/g, 'ss')
                         .replace(/s/g, 'cc')
                         .replace(/T/g, 'tt')
                         .replace(/t/g, 'dd')
                         .replace(/U/g, 'uu')
                         .replace(/u/g, 'ee')
                         .replace(/V/g, 'vv')
                         .replace(/v/g, 'ff');

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

  // Deleting the not needed leading 0s used as padding.
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
 * Shorten long url with is.gd's API.
 * @param String url
 * @param Function callback
 * @param Integer retry
 * @returns void
 * @async true
 */
Codes.shortenURL = function (url, callback, retry) {

  // Set the retry value to one if no value was provided.
  if (!retry) retry = 1;

  // Generate a random short url.
  var short = "goljs_"+ Math.round( Math.random() * (10000*retry) );

  // Set up the AJAX request.
  $.ajax({
    url: "https://is.gd/create.php?format=json&shorturl="+short+"&url="+encodeURIComponent(url),
    type: "GET",
    dataType: "json"
  })

  // Handle a failed request.
  .fail(function (xhr, status, error) {
    console.log("Shortening URL failed, falling back to long url.");
    console.warn(xhr, status, error);
    callback(url);
  })

  // Handle a successful request.
  .done(function (data) {

    // If the error code is 2 and we tried less than 5 times,
    // retry the shortening with a new short url.
    if (data.errorcode == 2 && retry <= 5) {
      console.log("Shortening URL failed, duplicate. Retrying.");
      return Codes.shortenURL(url, callback, retry+1);
    }

    // If we got a shorturl in the response, the magic worked.
    else if (data.shorturl) {
      console.log("Shortened URL ", data);
      callback(data.shorturl);
    }

    // Else, something went wrong. Fall back to the long url.
    else {
      console.log("Shortening URL failed", data);
      callback(url);
    }
  })
}

/**
 * Generates an URL that will link to the current grid.
 * Returns this URL.
 * Async function.
 */
Codes.generateURL = function(callback) {
  var code = Codes.makeCode();
  var hash = Codes.compress(code);
  var longURL = baseURL+'/?hash='+hash;
  Codes.shortenURL(longURL, callback);
}
/**
 * Loads a grid based on the hash parameter in the URL.
 */
Codes.importFromURL = function () {
  var params = url2params();
  var decomHash = this.decompress(params.hash);
  this.readCode(decomHash);
}
