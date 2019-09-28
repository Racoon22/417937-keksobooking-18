'use strict';

var PIN_WIDTH = 50;
var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECK_TIME = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AD_MIN_PRICE = 1000;
var AD_MAX_PRICE = 5000;
var AD_MIN_ROOMS = 1;
var AD_MAX_ROOMS = 51;
var AD_MIN_CAPACITY = 1;
var AD_MAX_CAPACITY = 51;
var AD_MIN_Y = 130;
var AD_MAX_Y = 630;
var AD_TYPES_MAP = {
  'flat': {
    'name': 'Квартира',
    'minPrice': 1000
  },
  'bungalo': {
    'name': 'Бунгало',
    'minPrice': 0
  },
  'house': {
    'name': 'Дом',
    'minPrice': 5000
  },
  'palace': {
    'name': 'Дворец',
    'minPrice': 10000
  },
};
var MAIN_PIN_WIDTH = 100;
var MAIN_PIN_HEIGHT = 100;
var MAIN_PEAK_HEIGHT = 20;

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

var ENTER_KEYCODE = 13;

var map = document.querySelector('.map');
var pins = document.querySelector('.map__pins');
var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
var cardElement = document.querySelector('#card').content.querySelector('.map__card');
var mapWidth = map.offsetWidth;
var mainPin = pins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var title = adForm.querySelector('#title');
var price = adForm.querySelector('#price');
var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');
var type = adForm.querySelector('#type');
var filterForm = document.querySelector('.map__filters');
var adAddress = adForm.querySelector('#address');
var capacity = adForm.querySelector('#capacity');
var rooms = adForm.querySelector('#room_number');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min
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

var generateMockAds = function (quantity) {
  var result = [];

  for (var i = 1; i <= quantity; i++) {
    var ad = {
      author: {},
      offer: {},
      location: {}
    };

    ad.author.avatar = 'img/avatars/user0' + i + '.png';
    ad.location.x = getRandomInt(-PIN_WIDTH / 2, mapWidth - PIN_WIDTH / 2);
    ad.location.y = getRandomInt(AD_MIN_Y, AD_MAX_Y);
    ad.offer.title = 'Объявление N' + i;
    ad.offer.addres = ad.location.x + ', ' + ad.location.y;
    ad.offer.price = getRandomInt(AD_MIN_PRICE, AD_MAX_PRICE);
    ad.offer.type = AD_TYPES[getRandomInt(0, AD_TYPES.length)];
    ad.offer.rooms = getRandomInt(AD_MIN_ROOMS, AD_MAX_ROOMS);
    ad.offer.guests = getRandomInt(AD_MIN_CAPACITY, AD_MAX_CAPACITY);
    ad.offer.checkin = AD_CHECK_TIME[getRandomInt(0, AD_CHECK_TIME.length - 1)];
    ad.offer.checkout = AD_CHECK_TIME[getRandomInt(0, AD_CHECK_TIME.length - 1)];
    ad.offer.featues = gerRandomFromArray(AD_FEATURES);
    ad.offer.description = 'Описание объявления N' + i;

    ad.offer.photos = gerRandomFromArray(AD_PHOTOS);

    result.push(ad);
  }
  return result;
};

var generatePinElements = function (ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    var ad = ads[i];
    var pin = pinElement.cloneNode(true);
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.title;
    pin.style.left = ad.location.x + 'px';
    pin.style.top = ad.location.y + 'px';
    onPinClick(pin, ad);
    onPinKeydown(pin, ad);
    fragment.appendChild(pin);
  }
  pins.appendChild(fragment);
};

var refreshPopap = function (ad) {
  var popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }
  generateCardElement(ad);
};

var onPinClick = function (pin, ad) {
  pin.addEventListener('click', function () {
    refreshPopap(ad);
  });
};

var onPinKeydown = function (pin, ad) {
  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      refreshPopap(ad);
    }
  });
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

var generateCardElement = function (ad) {
  var card = cardElement.cloneNode(true);
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.addres;
  card.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
  card.querySelector('.popup__type').textContent = AD_TYPES[ad.offer.type];
  card.querySelector('.popup__text--capacity').textContent = roomsMacros(ad.offer.rooms) + ' для ' + guestsMacros(ad.offer.guests);
  card.querySelector('.popup__text--time').textContent = 'Заезд ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
  var featuresElement = card.querySelector('.popup__features').cloneNode(true);
  card.querySelector('.popup__features').innerHTML = '';
  for (var i = 0; i < ad.offer.featues.length; i++) {
    var feature = featuresElement.querySelector('.popup__feature--' + ad.offer.featues[i]);
    card.querySelector('.popup__features').appendChild(feature);
  }

  var photoElement = card.querySelector('.popup__photos img').cloneNode();
  card.querySelector('.popup__photos').innerHTML = '';

  for (i = 0; i < ad.offer.photos.length; i++) {
    var photo = photoElement.cloneNode();
    photo.src = ad.offer.photos[i];
    card.querySelector('.popup__photos').appendChild(photo);
  }

  card.querySelector('.popup__description').textContent = ad.offer.description;
  card.querySelector('.popup__avatar').src = ad.author.avatar;
  map.insertBefore(card, document.querySelector('.map__filters-container'));
};

var getAddress = function () {
  var peak = map.classList.contains('map--faded') ? 0 : MAIN_PEAK_HEIGHT;
  var x = Math.round(parseInt(mainPin.style.left, 10) + MAIN_PIN_HEIGHT / 2);
  var y = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_WIDTH / 2 + peak);
  return x + ', ' + y;
};

var ads = generateMockAds(8);
generatePinElements(ads);
generateCardElement(ads[0]);

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
  var minPrice = AD_TYPES_MAP[type.value].minPrice;
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

var activatePage = function () {
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

var deactivatePage = function () {
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
  activatePage();
});

adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  validatePrice();
  validateCapacity();
  if (evt.currentTarget.checkValidity()) {
    evt.currentTarget.submit();
  }
  evt.currentTarget.reportValidity();
});

title.addEventListener('invalid', function () {
  validateTitle();
});

price.addEventListener('invalid', function () {
  validatePrice();
});

type.addEventListener('invalid', function () {
  validatePrice();
});

rooms.addEventListener('change', function () {
  validateCapacity();
});

capacity.addEventListener('change', function () {
  validateCapacity();
});

type.addEventListener('change', function () {
  validatePrice();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activatePage();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && evt.target.matches('.popup__close')) {
    document.querySelector('.map__card').remove();
  }
});

document.addEventListener('click', function (evt) {
  if (evt.target.matches('.popup__close')) {
    document.querySelector('.map__card').remove();
  }
});

timein.addEventListener('change', function () {
  timeout.value = timein.value;
});

timeout.addEventListener('change', function () {
  timein.value = timeout.value;
});

deactivatePage();
adAddress.value = getAddress();
