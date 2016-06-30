/**
 * Conway's Game of Life in JS
 * https://git.io/gameoflife
 * MIT Licensed - GoL.js (c) 2016
 */

/**
 * Initialize game and event listeners on page load.
 */
$(document).ready(function () {
  var settings = { width: 30, height: 30 };
  if (urlHasParams()) settings.type = 'hash';
  Game.init(settings,function () {
    if (urlHasParams()) Game.togglePause();
    Game.registerEvents();
  });
});
