'use strict';


const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_POST = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT = 7000;
const StatusCode = {
  OK: 200,
  ERROR_REQUEST: 400,
  NOT_FOUND: 404,
  EROR_SERVER: 500,
};

window.backend = {
  load: (onLoad, onError) => {
    const xhr = request(onLoad, onError);
    xhr.open(`GET`, URL_GET);
    xhr.send();
  },
  post: (data, onLoad, onError) => {
    const xhr = request(onLoad, onError);
    xhr.open(`POST`, URL_POST);
    xhr.send(data);
  }
};
const request = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (StatusCode.ERROR_REQUEST === xhr.status) {
      onError(`Неверный запрос: ${xhr.status} ${xhr.statusText}`);
    } else if (StatusCode.NOT_FOUND === xhr.status) {
      onError(`Не найдено: ${xhr.status} ${xhr.statusText}`);
    } else if (StatusCode.EROR_SERVER === xhr.status) {
      onError(`Ошибка сервера: ${xhr.status} ${xhr.statusText}`);
    } else if (StatusCode.OK !== xhr.status) {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    } else {
      onLoad(xhr.response);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT;

  return xhr;
};

