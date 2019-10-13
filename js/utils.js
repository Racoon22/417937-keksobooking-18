'use strict';
(function () {
  window.ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var gerRandomFromArray = function (array) {
    var cloneArray = array.slice();
    var result = [];
    var quantity = getRandomInt(1, cloneArray.length);
    for (var i = 0; i < quantity; i++) {
      var number = getRandomInt(0, cloneArray.length - 1);
      result.push(cloneArray[number]);
      cloneArray.splice(number, 1);
    }
    return result;
  };

  var guestsMacros = function (number) {
    return (number === 1 || number !== 11 && number % 10 === 1) ? number + ' гостя' : number + ' гостей';
  };

  var roomsMacros = function (number) {
    if (number === 1 || number !== 11 && number % 10 === 1) {
      return number + ' комната';
    }
    var numberArr = [2, 3, 4];
    var numberExeption = [12, 13, 14];
    if (numberArr.includes(number) || numberArr.includes(number % 10) && !numberExeption.includes(number)) {
      return number + ' комнаты';
    }
    return number + ' комнат';
  };

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
    getRandomInt: getRandomInt,
    gerRandomFromArray: gerRandomFromArray,
    guestsMacros: guestsMacros,
    roomsMacros: roomsMacros,
    debounce: debounce
  };

})();
