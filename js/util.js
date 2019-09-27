'use strict';
(function () {
  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var gerRandomFromArray = function (array) {
    var result = [];
    var quantity = getRandomInt(1, array.length + 1);
    for (var i = 0; i < quantity; i++) {
      var number = getRandomInt(0, array.length);
      result.push(array[number]);
      array.splice(number, 1);
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

  window.util = {
    getRandomInt: getRandomInt,
    gerRandomFromArray: gerRandomFromArray,
    guestsMacros: guestsMacros,
    roomsMacros: roomsMacros
  };

})();
