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
var AD_MIN_GUESTS = 1;
var AD_MAX_GUESTS = 51;
var AD_MIN_Y = 130;
var AD_MAX_Y = 630;
var AD_TYPES_MAP = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};
var MAIN_PIN_WIDTH = 100;
var MAIN_PIN_HEIGHT = 100;
var MAIN_PEAK_HEIGHT = 20;

var map = document.querySelector('.map');
var pins = document.querySelector('.map__pins');
var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
var cardElement = document.querySelector('#card').content.querySelector('.map__card');
var mapWidth = map.offsetWidth;
var mainPin = pins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var filterForm = document.querySelector('.map__filters');
var adAddress = adForm.querySelector('#address');
var capacity = adForm.querySelector('#capacity');
var rooms = adForm.querySelector('#room_number');

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
    ad.offer.guests = getRandomInt(AD_MIN_GUESTS, AD_MAX_GUESTS);
    ad.offer.checkin = AD_CHECK_TIME[getRandomInt(0, AD_CHECK_TIME.length)];
    ad.offer.checkout = AD_CHECK_TIME[getRandomInt(0, AD_CHECK_TIME.length)];
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
    var pin = pinElement.cloneNode(true);
    pin.querySelector('img').src = ads[i].author.avatar;
    pin.querySelector('img').alt = ads[i].offer.title;
    pin.style.left = ads[i].location.x + 'px';
    pin.style.top = ads[i].location.y + 'px';
    fragment.appendChild(pin);
  }
  pins.appendChild(fragment);
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
  card.querySelector('.popup__type').textContent = AD_TYPES_MAP[ad.offer.type];
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
  document.querySelector('.map__filters-container').appendChild(card);
};


var getAddress = function () {
  var peak = map.classList.contains('map--faded') ? 0 : MAIN_PEAK_HEIGHT;
  var x = Math.round(parseInt(mainPin.style.left, 10) + MAIN_PIN_HEIGHT / 2);
  var y = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_WIDTH / 2 + peak);
  return x + ', ' + y;
};

// var ads = generateMockAds(8);
// generatePinElements(ads);
// generateCardElement(ads[0]);

var validateCapacity = function () {
  var roomsVal = parseInt(rooms.value, 10);
  var capacityVal = parseInt(capacity.value, 10);

  if (roomsVal === 100 && capacityVal === 0 ||
    roomsVal !== 100 && capacityVal !== 0 &&
    roomsVal >= capacity.value) {
    capacity.setCustomValidity('');
    return;
  }

  capacity.setCustomValidity('Количество гостей должно быть меньше или равно количеству комнат. 100 комнат не для гостей');
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
  validateCapacity();
  if (evt.currentTarget.checkValidity()) {
    evt.currentTarget.submit();
  }
  evt.currentTarget.reportValidity();
});

rooms.addEventListener('change', function () {
  validateCapacity();
});

capacity.addEventListener('change', function () {
  validateCapacity();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activatePage();
  }
});

deactivatePage();
adAddress.value = getAddress();
