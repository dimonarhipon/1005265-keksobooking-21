"use strict";

(function () {
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT = 7000;
  const statusCode = {
    OK: 200,
  };

  window.backend = {
    load: (onLoad, onError) => {
      const xhr = request(onLoad, onError);
      xhr.open(`GET`, URL_GET);
      xhr.send();
    },

  };
  const request = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (statusCode.OK !== xhr.status) {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
      onLoad(xhr.response);
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

})();
