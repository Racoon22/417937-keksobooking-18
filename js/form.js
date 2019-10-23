'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
  var MAX_PRICE = 1000000;
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

  var adForm = document.querySelector('.ad-form');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var adPreview = adForm.querySelector('.ad-form__photo');
  var avatar = adForm.querySelector('#avatar');
  var capacity = adForm.querySelector('#capacity');
  var rooms = adForm.querySelector('#room_number');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var title = adForm.querySelector('#title');
  var price = adForm.querySelector('#price');
  var type = adForm.querySelector('#type');
  var images = adForm.querySelector('#images');

  var resetPreview = function () {
    avatarPreview.src = DEFAULT_AVATAR_SRC;
    var image = adPreview.querySelector('img');
    if (image) {
      image.remove();
    }
  };

  var showPreview = function (input, preview) {
    var file = input.files[0];
    var fileName = file.name.toLocaleLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatar.addEventListener('change', function () {
    showPreview(avatar, avatarPreview);
  });

  images.addEventListener('change', function () {
    var preview = adPreview.querySelector('img');
    if (!preview) {
      preview = document.createElement('img');
      preview.style.width = '100%';
      adPreview.appendChild(preview);
    }
    showPreview(images, preview);
  });

  type.addEventListener('change', function () {
    price.setAttribute('placeholder', window.map.AD_TYPES[type.value].minPrice);
    price.setAttribute('min', window.map.AD_TYPES[type.value].minPrice);
  });

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
    var minPrice = window.map.AD_TYPES[type.value].minPrice;
    if (price.validity.valueMissing) {
      price.setCustomValidity('Обязятельное поле');
    } else if (priceVal > MAX_PRICE) {
      price.setCustomValidity('Максимальная цена за ночь ' + MAX_PRICE);
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
    if (adForm.checkValidity()) {
      window.backend.save(new FormData(adForm), window.page.showSuccess, window.page.showError);
      resetPreview();
    }
    adForm.reportValidity();
  });

  window.form = {
    resetPreview: resetPreview
  };

}());
