'use strict';
(function () {
  var MAIN_PIN_WIDTH = 100;
  var MAIN_PIN_HEIGHT = 100;
  var MAIN_PEAK_HEIGHT = 20;

  var pins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adAddress = adForm.querySelector('#address');
  var filterForm = document.querySelector('.map__filters');
  var mainPin = pins.querySelector('.map__pin--main');

  var getAddress = function () {
    var peak = map.classList.contains('map--faded') ? 0 : MAIN_PEAK_HEIGHT;
    var x = Math.round(parseInt(mainPin.style.left, 10) + MAIN_PIN_HEIGHT / 2);
    var y = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_WIDTH / 2 + peak);
    return x + ', ' + y;
  };

  var activate = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    var formElements = adForm.querySelectorAll('.ad-form__element');
    formElements.forEach(function (item) {
      item.disabled = false;
    });

    var avatarElement = adForm.querySelector('.ad-form-header');
    avatarElement.disabled = false;

    var filterElements = filterForm.querySelectorAll('.map__filter');
    filterElements.forEach(function (item) {
      item.disabled = false;
    });

    var featuresElement = filterForm.querySelector('.map__features');
    featuresElement.disabled = false;
    adAddress.value = getAddress();
  };

  var deactivate = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    var formElements = adForm.querySelectorAll('.ad-form__element');
    formElements.forEach(function (item) {
      item.disabled = true;
    });

    var avatarElement = adForm.querySelector('.ad-form-header');
    avatarElement.disabled = true;

    var filterElements = filterForm.querySelectorAll('.map__filter');
    filterElements.forEach(function (item) {
      item.disabled = true;
    });

    var featuresElement = filterForm.querySelector('.map__features');
    featuresElement.disabled = true;
    adAddress.value = getAddress();
  };

  mainPin.addEventListener('mousedown', function () {
    window.page.activate();
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      activate();
    }
  });

  deactivate();

  window.page = {
    map: map,
    pins: pins,
    mainPin: mainPin,
    adForm: adForm,
    adAddress: adAddress,
    activate: activate,
    deactivate: deactivate
  };
})();
