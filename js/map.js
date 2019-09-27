'use strict';
(function () {
  var AD_TYPES_MAP = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var pins = document.querySelector('.map__pins');
  var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardElement = document.querySelector('#card').content.querySelector('.map__card');

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

  var generateCardElement = function (ad) {
    var card = cardElement.cloneNode(true);
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.addres;
    card.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
    card.querySelector('.popup__type').textContent = AD_TYPES_MAP[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = window.util.roomsMacros(ad.offer.rooms) + ' для ' + window.util.guestsMacros(ad.offer.guests);
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

  generatePinElements(window.data.ads);
  generateCardElement(window.data.ads[0]);
})();
