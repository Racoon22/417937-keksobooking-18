'use strict';
(function () {
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

  var mapWidth = document.querySelector('.map').offsetWidth;

  var generateMockAds = function (quantity) {
    var result = [];

    for (var i = 1; i <= quantity; i++) {
      var ad = {
        author: {},
        offer: {},
        location: {}
      };

      ad.author.avatar = 'img/avatars/user0' + i + '.png';
      ad.location.x = window.utils.getRandomInt(-PIN_WIDTH / 2, mapWidth - PIN_WIDTH / 2);
      ad.location.y = window.utils.getRandomInt(AD_MIN_Y, AD_MAX_Y);
      ad.offer.title = 'Объявление N' + i;
      ad.offer.addres = ad.location.x + ', ' + ad.location.y;
      ad.offer.price = window.utils.getRandomInt(AD_MIN_PRICE, AD_MAX_PRICE - 1);
      ad.offer.type = AD_TYPES[window.utils.getRandomInt(0, AD_TYPES.length - 1)];
      ad.offer.rooms = window.utils.getRandomInt(AD_MIN_ROOMS, AD_MAX_ROOMS - 1);
      ad.offer.guests = window.utils.getRandomInt(AD_MIN_CAPACITY, AD_MAX_CAPACITY - 1);
      ad.offer.checkin = AD_CHECK_TIME[window.utils.getRandomInt(0, AD_CHECK_TIME.length - 1)];
      ad.offer.checkout = AD_CHECK_TIME[window.utils.getRandomInt(0, AD_CHECK_TIME.length - 1)];
      ad.offer.featues = window.utils.gerRandomFromArray(AD_FEATURES);
      ad.offer.description = 'Описание объявления N' + i;
      ad.offer.photos = window.utils.gerRandomFromArray(AD_PHOTOS);

      result.push(ad);
    }
    return result;
  };

  var ads = generateMockAds(8);
  window.data = {
    ads: ads
  };
})();