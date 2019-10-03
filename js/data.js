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



  var ads = generateMockAds(8);
  window.data = {
    ads: ads
  };
})();
