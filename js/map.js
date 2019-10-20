'use strict';
(function () {
  var AMOUNT_PINS_ON_MAP = 5;
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

  var pins = document.querySelector('.map__pins');
  var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardElement = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var removePins = function () {
    var pinsButtons = document.querySelectorAll('.map__pin[type=button]');
    pinsButtons.forEach(function (it) {
      it.remove();
    });
  };

  var removePopup = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var refreshPopup = function (ad) {
    removePopup();
    generateCardElement(ad);
  };

  var onPinClick = function (pin, ad) {
    pin.addEventListener('click', function () {
      refreshPopup(ad);
      pin.classList.add('map__pin--active');
    });
  };

  var onPinKeydown = function (pin, ad) {
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_KEYCODE) {
        refreshPopup(ad);
      }
    });
  };

  var generatePins = function (ads) {
    removePopup();
    window.ads = ads;
    var filteredAds = window.filterAds(ads);
    renderPinElements(filteredAds);
  };

  var renderPinElements = function (ads) {
    ads = ads.slice(0, AMOUNT_PINS_ON_MAP);
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      var pin = pinElement.cloneNode(true);
      pin.querySelector('img').src = ad.author.avatar;
      pin.querySelector('img').alt = ad.offer.title;
      pin.style.left = ad.location.x + 'px';
      pin.style.top = ad.location.y + 'px';
      onPinClick(pin, ad);
      onPinKeydown(pin, ad);
      fragment.appendChild(pin);
    });
    pins.appendChild(fragment);
  };

  var generateCardElement = function (ad) {
    var card = cardElement.cloneNode(true);
    if (ad.offer.title) {
      card.querySelector('.popup__title').textContent = ad.offer.title;
    }
    if (ad.offer.addres) {
      card.querySelector('.popup__text--address').textContent = ad.offer.addres;
    }
    if (ad.offer.price) {
      card.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
    }
    if (ad.offer.type) {
      card.querySelector('.popup__type').textContent = AD_TYPES_MAP[ad.offer.type].name;
    }
    if (ad.offer.rooms && ad.offer.guests) {
      card.querySelector('.popup__text--capacity').textContent = window.utils.roomsMacros(ad.offer.rooms) + ' для ' + window.utils.guestsMacros(ad.offer.guests);
    }
    if (ad.offer.checkin && ad.offer.checkin) {
      card.querySelector('.popup__text--time').textContent = 'Заезд ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
    }
    if (ad.offer.features) {
      var featuresElement = card.querySelector('.popup__features').cloneNode(true);
      card.querySelector('.popup__features').innerHTML = '';
      ad.offer.features.forEach(function (it) {
        var feature = featuresElement.querySelector('.popup__feature--' + it);
        card.querySelector('.popup__features').appendChild(feature);
      });
    }

    if (ad.offer.photos) {
      var photoTemplate = card.querySelector('.popup__photos img').cloneNode();
      card.querySelector('.popup__photos').innerHTML = '';
      ad.offer.photos.forEach(function (it) {
        var photoElement = photoTemplate.cloneNode();
        photoElement.src = it;
        card.querySelector('.popup__photos').appendChild(photoElement);
      });
    }

    if (ad.offer.description) {
      card.querySelector('.popup__description').textContent = ad.offer.description;
    }

    if (ad.author.avatar) {
      card.querySelector('.popup__avatar').src = ad.author.avatar;
    }

    document.querySelector('.map__filters-container').appendChild(card);
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE && evt.target.matches('.popup__close')) {
      document.querySelector('.map__card').remove();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      removePopup();
    }
  });

  document.addEventListener('click', function (evt) {
    if (evt.target.matches('.popup__close')) {
      document.querySelector('.map__card').remove();
    }
  });

  window.map = {
    map: map,
    AD_TYPES_MAP: AD_TYPES_MAP,
    generatePins: generatePins,
    removePins: removePins,
    removePopup: removePopup,
    renderPinElements: renderPinElements
  };
})();
