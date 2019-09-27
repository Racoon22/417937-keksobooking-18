'use strict';
(function () {

  var NUMBER_ROOMS_NOT_FOR_GUESTS = 100;
  var CAPACITY_NOT_FOR_GUESTS = 0;

  var capacity = window.page.adForm.querySelector('#capacity');
  var rooms = window.page.adForm.querySelector('#room_number');

  rooms.addEventListener('change', function () {
    validateCapacity();
  });

  capacity.addEventListener('change', function () {
    validateCapacity();
  });

  var validateCapacity = function () {
    var roomsVal = parseInt(rooms.value, 10);
    var capacityVal = parseInt(capacity.value, 10);

    if (roomsVal === NUMBER_ROOMS_NOT_FOR_GUESTS && capacityVal === CAPACITY_NOT_FOR_GUESTS ||
      roomsVal !== NUMBER_ROOMS_NOT_FOR_GUESTS && capacityVal !== CAPACITY_NOT_FOR_GUESTS &&
      roomsVal >= capacity.value) {
      capacity.setCustomValidity('');
      return;
    }

    capacity.setCustomValidity('Количество гостей должно быть меньше или равно количеству комнат. 100 комнат не для гостей');
  };
  window.page.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    validateCapacity();
    if (evt.currentTarget.checkValidity()) {
      evt.currentTarget.submit();
    }
    evt.currentTarget.reportValidity();
  });
}());
