/**
 * Conway's Game of Life in JS
 * https://git.io/gameoflife
 * MIT Licensed - GoL.js (c) 2016
 */

/*===============================
   Some random usefull functions
  ===============================*/


/**
 * Checks if the input is an integer.
 * Returns true or false.
 */
function isInt(n){
  return Number(n) === n && n % 1 === 0;
}

/**
 * Checks if the URL has parameters.
 * Returns true or false.
 */
function urlHasParams() {
  if (location.href.indexOf('?') === -1) return false;
  else return true;
}

/**
 * Splits all the parameters passed in trough the URL and puts them into an object.
 * Returns this object.
 */
 function url2params() {
   if (location.href.indexOf('?') === -1) return {};
   var raw = location.href.split('?')[1].split('&');
   obj = {};
   for (i in raw) {
     obj[raw[i].split('=')[0]] = raw[i].split('=')[1];
   }
   return obj;
 }
