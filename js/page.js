'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PEAK_HEIGHT = 20;
  var MAIN_PIN_BASE_TOP = 375;
  var MAIN_PIN_BASE_LEFT = 570;
  var MIN_PIN_Y = 130;
  var MAX_PIN_Y = 630;
  var MIX_PIN_X = 0;

  var adForm = document.querySelector('.ad-form');
  var adAddress = adForm.querySelector('#address');
  var filterForm = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');
  var mapWidth = document.querySelector('.map').offsetWidth;

  window.isPageActive = false;

  var mainElement = document.querySelector('main');

  var showError = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorTemplate.querySelector('.error__button');
    errorElement.querySelector('.error__message').textContent = message;
    mainElement.insertBefore(errorElement, mainElement.firstChild);
    errorButton.addEventListener('click', function () {
      errorElement.remove();
    });
    errorElement.addEventListener('click', function () {
      errorElement.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        errorElement.remove();
      }
    });
  };

  var showSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        successElement.remove();
      }
    });
    successElement.addEventListener('click', function () {
      successElement.remove();
    });
    mainElement.insertBefore(successElement, mainElement.firstChild);
    window.page.deactivate();
  };

  var getAddress = function () {
    var peak = window.map.map.classList.contains('map--faded') ? 0 : MAIN_PEAK_HEIGHT;
    var x = Math.round(parseInt(mainPin.style.left, 10) + MAIN_PIN_HEIGHT / 2);
    var y = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_WIDTH / 2 + peak);
    return x + ', ' + y;
  };

  var setPinBaseCoordinates = function () {
    mainPin.style.left = MAIN_PIN_BASE_LEFT + 'px';
    mainPin.style.top = MAIN_PIN_BASE_TOP + 'px';
  };

  var activate = function () {
    window.map.map.classList.remove('map--faded');
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
    window.isPageActive = true;
  };

  var deactivate = function () {
    window.map.map.classList.add('map--faded');
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
    window.map.removePins();
    adForm.reset();
    setPinBaseCoordinates();
    adAddress.value = getAddress();
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (!window.isPageActive) {
      window.page.activate();
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;
    var onMouseMove = function (moveEvt) {
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var offsetX;
      if (mainPin.offsetLeft - shift.x <= MIX_PIN_X) {
        offsetX = MIX_PIN_X;
      } else if (mainPin.offsetLeft - shift.x + MAIN_PIN_WIDTH > mapWidth) {
        offsetX = mapWidth - MAIN_PIN_WIDTH;
      } else {
        offsetX = mainPin.offsetLeft - shift.x;
      }

      var offsetY;
      if (mainPin.offsetTop - shift.y <= MIN_PIN_Y) {
        offsetY = MIN_PIN_Y;
      } else if (mainPin.offsetTop - shift.y + MAIN_PIN_HEIGHT + MAIN_PEAK_HEIGHT > MAX_PIN_Y) {
        offsetY = MAX_PIN_Y - MAIN_PIN_HEIGHT - MAIN_PEAK_HEIGHT;
      } else {
        offsetY = mainPin.offsetTop - shift.y;
      }

      mainPin.style.top = offsetY + 'px';
      mainPin.style.left = offsetX + 'px';
      adAddress.value = getAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      adAddress.value = getAddress();
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
      window.map.removePins();
      window.backend.load(window.map.generatePinElements, showError);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      activate();
    }
  });

  deactivate();

  window.page = {
    adForm: adForm,
    adAddress: adAddress,
    showError: showError,
    showSuccess: showSuccess,
    activate: activate,
    deactivate: deactivate
  };

})();
