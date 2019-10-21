'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PEAK_HEIGHT = 20;
  var MAIN_PIN_BASE_TOP = 375;
  var MAIN_PIN_BASE_LEFT = 570;
  var MIN_PIN_Y = 77;
  var MAX_PIN_Y = 662;
  var MIX_PIN_X = 0;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adAddress = adForm.querySelector('#address');
  var filterForm = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');
  var mapWidth = document.querySelector('.map').offsetWidth;

  var isActive = false;

  var mainElement = document.querySelector('main');

  var removeSuccessPopup = function () {
    var popup = mainElement.querySelector('.success');
    if (popup) {
      popup.remove();
    }
  };

  var onSuccessPopupKeydown = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      removeSuccessPopup();
    }
    document.removeEventListener('keydown', onSuccessPopupKeydown);
  };

  var onSuccessPopupClick = function () {
    removeSuccessPopup();
    document.removeEventListener('keydown', onSuccessPopupClick);
  };

  var removeErrorPopup = function () {
    var popup = mainElement.querySelector('.error');
    if (popup) {
      var errorButton = popup.querySelector('.error__button');
      errorButton.removeEventListener('click', onErrorButtonClick);
      popup.remove();
    }
    document.removeEventListener('keydown', onErrorPopupKeydown);
    document.removeEventListener('keydown', onErrorPopupClick);
  };

  var onErrorPopupKeydown = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      removeErrorPopup();
    }
  };

  var onErrorPopupClick = function () {
    removeErrorPopup();
  };

  var onErrorButtonClick = function () {
    removeErrorPopup();
    document.removeEventListener('keydown', onErrorButtonClick);
  };

  var showSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.addEventListener('keydown', onSuccessPopupKeydown);
    successElement.addEventListener('click', onSuccessPopupClick);
    mainElement.insertBefore(successElement, mainElement.firstChild);
    deactivate();
    isActive = false;
  };

  var showError = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');
    errorElement.querySelector('.error__message').textContent = message;
    mainElement.insertBefore(errorElement, mainElement.firstChild);
    errorButton.addEventListener('click', onErrorButtonClick);
    errorElement.addEventListener('click', onErrorPopupClick);
    document.addEventListener('keydown', onErrorPopupKeydown);
  };

  var getAddress = function () {
    var peak = map.classList.contains('map--faded') ? 0 : MAIN_PEAK_HEIGHT;
    var x = Math.round(parseInt(mainPin.style.left, 10) + MAIN_PIN_HEIGHT / 2);
    var y = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_WIDTH / 2 + peak);
    return x + ', ' + y;
  };

  var setPinBaseCoordinates = function () {
    mainPin.style.left = MAIN_PIN_BASE_LEFT + 'px';
    mainPin.style.top = MAIN_PIN_BASE_TOP + 'px';
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
    isActive = true;
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
    window.map.removePins();
    adForm.reset();
    setPinBaseCoordinates();
    adAddress.value = getAddress();
    isActive = false;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (!isActive) {
      activate();
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
      if (mainPin.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2 <= MIX_PIN_X) {
        offsetX = MIX_PIN_X - MAIN_PIN_WIDTH / 2;
      } else if (mainPin.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2 > mapWidth) {
        offsetX = mapWidth - MAIN_PIN_WIDTH / 2;
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
      window.map.removePopup();
      window.backend.load(window.map.generatePins, showError);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      if (!isActive) {
        activate();
      }
      window.map.removePins();
      window.map.removePopup();
      window.backend.load(window.map.generatePins, showError);
    }
  });

  adForm.addEventListener('reset', function () {
    deactivate();
    filterForm.reset();
    window.form.resetPreview();
  });

  window.page = {
    adAddress: adAddress,
    isActive: isActive,
    showError: showError,
    showSuccess: showSuccess,
    activate: activate,
    deactivate: deactivate
  };

  deactivate();

})();
