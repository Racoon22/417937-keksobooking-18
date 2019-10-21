'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (cb) {
    var lastTimeout = null;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb();
    }, DEBOUNCE_INTERVAL);
  };

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    debounce: debounce
  };

})();
