'use strict';
(function () {
  var CAPACITY_MAP = {
    '1': {
      guests: [1],
      errorText: 'Для 1 гостя'
    },
    '2': {
      guests: [1, 2],
      errorText: 'Для 1 или 2 гостей'
    },
    '3': {
      guests: [1, 2, 3],
      errorText: 'Для 1, 2 или 3 гостей'
    },
    '100': {
      guests: [0],
      errorText: 'Не для гостей'
    },
  };

  var capacity = window.page.adForm.querySelector('#capacity');
  var rooms = window.page.adForm.querySelector('#room_number');
  var adFormSubmit = window.page.adForm.querySelector('.ad-form__submit');
  var timein = window.page.adForm.querySelector('#timein');
  var timeout = window.page.adForm.querySelector('#timeout');
  var title = window.page.adForm.querySelector('#title');
  var price = window.page.adForm.querySelector('#price');
  var type = window.page.adForm.querySelector('#type');

  rooms.addEventListener('change', function () {
    validateCapacity();
  });

  capacity.addEventListener('change', function () {
    validateCapacity();
  });

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  var validateCapacity = function () {
    var roomsVal = parseInt(rooms.value, 10);
    var capacityVal = parseInt(capacity.value, 10);
    if (!CAPACITY_MAP[roomsVal].guests.includes(capacityVal)) {
      capacity.setCustomValidity(CAPACITY_MAP[roomsVal].errorText);
    } else {
      capacity.setCustomValidity('');
    }
  };

  var validatePrice = function () {
    var priceVal = parseInt(price.value, 10);
    var minPrice = window.map.AD_TYPES_MAP[type.value].minPrice;
    price.setAttribute('placeholder', minPrice);
    if (price.validity.valueMissing) {
      price.setCustomValidity('Обязятельное поле');
    } else if (priceVal >= minPrice) {
      price.setCustomValidity('');
    } else {
      price.setCustomValidity('Минимальная цена за ночь ' + minPrice);
    }
  };

  var validateTitle = function () {
    if (title.validity.valueMissing) {
      title.setCustomValidity('Обязятельное поле');
    } else if (title.validity.tooShort) {
      title.setCustomValidity('Минимальная длина — 30 символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Минимальная длина — 100 символов');
    } else {
      title.setCustomValidity('');
    }
  };

  adFormSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();
    validateCapacity();
    validateTitle();
    validatePrice();
    if (window.page.adForm.checkValidity()) {
      window.backend.save(new FormData(window.page.adForm), window.page.showSuccess, window.page.showError)
    }
    window.page.adForm.reportValidity();
  });
}());
