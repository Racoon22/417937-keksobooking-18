'use strict';
(function () {
  var FILTER_TYPE_ANY = 'any';
  var type = document.querySelector('#housing-type');

  var filterAds = function (ads) {
    return filterByType(ads).slice(0, 5);
  };

  var filterByType = function (ads) {
    return ads.filter(function (ad) {
      return type.value === FILTER_TYPE_ANY ? true : ad.offer.type === type.value;
    });
  };

  type.addEventListener('change', function () {
    window.map.removePins();
    window.map.renderPinElements(filterAds(window.ads));
  });

  window.filterAds = filterAds;
})();
