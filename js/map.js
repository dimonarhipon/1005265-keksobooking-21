'use strict';

(function () {
  const PIN_OFSET_Y = 70;
  const PIN_MAIN_OFSET = 50;

  const map = document.querySelector(`.map`);
  const noticeForm = document.querySelector(`.ad-form`);

  const toggleState = function (state = true) {
    map.classList.add(`map--faded`);
    noticeForm.classList.add(`ad-form--disabled`);

    if (state === false) {
      map.classList.remove(`map--faded`);
      noticeForm.classList.remove(`ad-form--disabled`);
    }

    window.fieldsNotice.map((item) => {
      item.disabled = state;
      return item;
    });
    window.fieldsFilter.map((item) => {
      item.disabled = state;
      return item;
    });
    window.selectsFilter.map((item) => {
      item.disabled = state;
      return item;
    });
    window.form.validation();
  };
  toggleState();

  const pinMain = map.querySelector(`.map__pin--main`);
  window.pinMainOy = parseInt(pinMain.style.top, 10) - PIN_MAIN_OFSET;
  window.pinMainOx = parseInt(pinMain.style.left, 10) - PIN_MAIN_OFSET;

  pinMain.focus();
  window.form.setCoodinate();

  pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    window.form.setCoodinate(window.pinMainOy - window.PIN_OFSET_X, window.pinMainOy - PIN_OFSET_Y);

    if (evt.button === 0) {
      toggleState(false);
    }
  });

  pinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      toggleState(false);
    }
  });
})();
