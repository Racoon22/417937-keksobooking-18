'use strict';
(function () {
  var FILTER_TYPE_ANY = 'any';
  var FILTER_PRICE_LOW = 'low';
  var FILTER_PRICE_MIDDLE = 'middle';
  var FILTER_PRICE_HIGH = 'high';
  var FILTER_PRICE_MAP = {
    FILTER_PRICE_LOW: {
      max: 10000,
    },
    FILTER_PRICE_MIDDLE: {
      min: 10000,
      max: 50000,
    },
    FILTER_PRICE_HIGH: {
      min: 50000,
    }
  };
  var typeElement = document.querySelector('#housing-type');
  var priceElement = document.querySelector('#housing-price');
  var roomsElement = document.querySelector('#housing-rooms');
  var guestsElement = document.querySelector('#housing-guests');
  var featuresElements = document.querySelectorAll('.map__checkbox');


  var updatePins = function () {
    window.map.removePins();
    window.map.renderPinElements(filterAds(window.ads));
  };

  var filterAds = function (ads) {
    return ads.filter(function (ad) {
      return (filterByType(ad.offer.type) && filterByRooms(ad.offer.rooms) && filterByGuests(ad.offer.guests)
        && filterByPrice(ad.offer.price) && filterByFeatures(ad.offer.features));
    })
      .slice(0, 5);
  };

  var filterByType = function (type) {
    return typeElement.value === FILTER_TYPE_ANY || type === typeElement.value;
  };

  var filterByRooms = function (rooms) {
    var roomsVal = roomsElement.value === FILTER_TYPE_ANY ? FILTER_TYPE_ANY : parseInt(roomsElement.value, 10);
    return roomsVal === FILTER_TYPE_ANY || rooms === roomsVal;
  };

  var filterByGuests = function (guests) {
    var guestsVal = guestsElement.value === FILTER_TYPE_ANY ? FILTER_TYPE_ANY : parseInt(guestsElement.value, 10);
    return guestsVal === FILTER_TYPE_ANY || guests === guestsVal;
  };

  var filterByPrice = function (price) {
    if (priceElement.value === FILTER_TYPE_ANY) {
      return true;
    }
    return priceElement.value === getPriceRange(price);
  };

  var getPriceRange = function (price) {
    if (price < FILTER_PRICE_MAP.FILTER_PRICE_LOW.max) {
      return FILTER_PRICE_LOW;
    }
    if (price > FILTER_PRICE_MAP.FILTER_PRICE_HIGH.min) {
      return FILTER_PRICE_HIGH;
    }
    return FILTER_PRICE_MIDDLE;
  };

  var filterByFeatures = function (features) {
    var featuresFilters = document.querySelectorAll('.map__checkbox:checked');
    for (var i = 0; i < featuresFilters.length; i++) {
      if (features.indexOf(featuresFilters[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  typeElement.addEventListener('change', function () {
    window.utils.debounce(updatePins);
  });

  roomsElement.addEventListener('change', function () {
    window.utils.debounce(updatePins);
  });

  guestsElement.addEventListener('change', function () {
    window.utils.debounce(updatePins);
  });

  priceElement.addEventListener('change', function () {
    window.utils.debounce(updatePins);
  });

  featuresElements.forEach(function (it) {
    it.addEventListener('change', function () {
      window.utils.debounce(updatePins);
    });
  });

  window.filterAds = filterAds;
})();
