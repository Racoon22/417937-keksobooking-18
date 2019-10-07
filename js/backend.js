'use strict';
(function () {
  var GET_ADS_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_ADS_URL = 'https://js.dump.academy/keksobooking';

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

    xhr.open('GET', GET_ADS_URL);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
        window.isPageActive = false;
      } else {
        onError('Упс! Что-то пошло не так!');
      }
    });

    xhr.open('POST', POST_ADS_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
