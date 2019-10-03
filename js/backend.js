'use strict';
(function () {
  var GET_WIZARDS_URL = 'https://js.dump.academy/keksobooking/data';

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Упс! Что-то пошло не так!');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', GET_WIZARDS_URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
