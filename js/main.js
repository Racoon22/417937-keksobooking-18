'use strict';

var PIN_WIDTH = 50;
var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECK_TIME = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AD_MIN_PRICE = 1000;
var AD_MAX_PRICE = 5000;
var AD_MIN_ROOMS = 1;
var AD_MAX_ROOMS = 5;
var AD_MIN_GUESTS = 1;
var AD_MAX_GUESTS = 5;
var AD_MIN_Y = 130;
var AD_MAX_Y = 630;

var map = document.querySelector('.map');
var pins = document.querySelector('.map__pins');
var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
var mapWidth = map.offsetWidth;

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var gerRandomFromArray = function (array) {
  var result = [];
  var quantity = getRandomInt(1, array.length);
  for (var i = 0; i < quantity; i++) {
    result.push(array[getRandomInt(0, array.length)]);
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
    ad.location.x = getRandomInt(PIN_WIDTH/2, mapWidth - PIN_WIDTH/2);
    ad.location.y = getRandomInt(AD_MIN_Y, AD_MAX_Y);
    ad.offer.title = 'Объявление N' + i;
    ad.offer.addres = ad.location.x + ', ' + ad.location.y;
    ad.offer.price = getRandomInt(AD_MIN_PRICE, AD_MAX_PRICE);
    ad.offer.type = AD_TYPES[getRandomInt(0, AD_TYPES.length)];
    ad.offer.rooms = getRandomInt(AD_MIN_ROOMS, AD_MAX_ROOMS);
    ad.offer.guests = getRandomInt(AD_MIN_GUESTS, AD_MAX_GUESTS);
    ad.offer.checking = AD_CHECK_TIME[getRandomInt(0, AD_CHECK_TIME.length)];
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

var ads = generateMockAds(8);
generatePinElements(ads);
map.classList.remove('map--faded');

