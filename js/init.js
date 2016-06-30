/**
 * Conway's Game of Life in JS
 * https://git.io/gameoflife
 * MIT Licensed - GoL.js (c) 2016
 */

/**
 * Initialize game and event listeners on page load.
 */
$(document).ready(function () {
  if (urlHasParams) {
    var initMode = 'hash';
  }
  Game.init({ width: 30, height: 30, mode: initMode },function () {
    Game.registerEvents();
  });
});
