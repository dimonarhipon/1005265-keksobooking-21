"use strict";

(function () {
  const ADVERT_COUNT = 8;

  const fragment = document.createDocumentFragment();

  const successHandler = (advert) => {
    for (let i = 0; i < ADVERT_COUNT; i++) {
      fragment.appendChild(window.advert.updatePin(advert[i]));
      fragment.appendChild(window.card.updateCard(advert[i]));
    }
    // Для провеки результата
    // console.log(advert);
    window.pin.pinsCollection.appendChild(fragment);
  };
  window.backend.load(successHandler, window.util.errorHandler);


  window.toggleState = (state = true) => {
    window.map.placeAdvert.classList.add(`map--faded`);
    window.form.noticeForm.classList.add(`ad-form--disabled`);
    if (state === false) {
      window.map.placeAdvert.classList.remove(`map--faded`);
      window.form.noticeForm.classList.remove(`ad-form--disabled`);
    }

    window.form.fieldsNotice.map((item) => {
      item.disabled = state;
      return item;
    });
    window.mapFilter.fieldsFilter.map((item) => {
      item.disabled = state;
      return item;
    });
    window.mapFilter.selectsFilter.map((item) => {
      item.disabled = state;
      return item;
    });
  };
  window.toggleState();


})();

