'use strict';
(function () {
  var ENTER_KEYCODE = 13;
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

  var generateCardElement = function (ad) {
    var card = cardElement.cloneNode(true);
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.addres;
    card.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
    card.querySelector('.popup__type').textContent = AD_TYPES_MAP[ad.offer.type].name;
    card.querySelector('.popup__text--capacity').textContent = window.utils.roomsMacros(ad.offer.rooms) + ' для ' + window.utils.guestsMacros(ad.offer.guests);
    card.querySelector('.popup__text--time').textContent = 'Заезд ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
    var featuresElement = card.querySelector('.popup__features').cloneNode(true);
    card.querySelector('.popup__features').innerHTML = '';

    for (var i = 0; i < ad.offer.features.length; i++) {
      var feature = featuresElement.querySelector('.popup__feature--' + ad.offer.features[i]);
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

  window.map = {
    map: map,
    AD_TYPES_MAP: AD_TYPES_MAP,
    generatePinElements: generatePinElements
  };
})();
