'use strict';

(function () {
  const pinMain = window.map.placeAdvert.querySelector(`.map__pin--main`);

  const PIN_MAIN_OFSET_Y = parseInt(getComputedStyle(pinMain).height, 10) / 2;
  const PIN_MAIN_OFSET_X = parseInt(getComputedStyle(pinMain).width, 10) / 2;

  const pinMainOy = parseInt(pinMain.style.top, 10) - PIN_MAIN_OFSET_Y;
  const pinMainOx = parseInt(pinMain.style.left, 10) - PIN_MAIN_OFSET_X;

  pinMain.focus();

  const setCoodinate = (x = pinMainOx, y = pinMainOy) => {
    window.form.address.value = `${x}, ${y}`;
  };
  setCoodinate();

  pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    setCoodinate(pinMainOx - PIN_MAIN_OFSET_X, pinMainOy - PIN_MAIN_OFSET_Y);
    if (evt.button === 0) {
      window.toggleState(false);
    }
  });

  pinMain.addEventListener(`keydown`, (evt) => {
    setCoodinate(pinMainOx - PIN_MAIN_OFSET_X, pinMainOy - PIN_MAIN_OFSET_Y);
    if (evt.key === `Enter`) {
      window.toggleState(false);
    }
  });

  window.pin = {
    pinsCollection: window.map.placeAdvert.querySelector(`.map__pins`),
  };

})();
