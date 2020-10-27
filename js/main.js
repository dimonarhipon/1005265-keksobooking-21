'use strict';

(function () {
  const ADVERT_COUNT = 8;
  const fragment = document.createDocumentFragment();

  const successHandler = (advert) => {

    for (let i = 0; i < ADVERT_COUNT; i++) {
      fragment.appendChild(window.advert.render(advert[i]));
    }
    // Для провеки результата
    // console.log(advert);
    // fragment.appendChild(window.card.render(advert[i]));
    window.pinContainer.appendChild(fragment);
  };

  window.toggleState = (state = true) => {

    window.map.classList.add(`map--faded`);
    window.form.container.classList.add(`ad-form--disabled`);

    if (!state) {
      window.map.classList.remove(`map--faded`);
      window.form.container.classList.remove(`ad-form--disabled`);
    }
    window.form.fieldsets.map((item) => (item.disabled = state));
    window.mapFilter.fieldsets.map((item) => (item.disabled = state));
    window.mapFilter.selects.map((item) => (item.disabled = state));
  };

  const mainForm = window.form.container;
  const resetButton = mainForm.querySelector(`.ad-form__reset`);

  const submitHandler = (evt) => {
    window.backend.post(new FormData(mainForm), window.util.successSubmit, window.util.errorSubmit);
    evt.preventDefault();
  };
  const resetHandler = (evt) => {
    evt.preventDefault();
    window.form.container.reset();
  };

  resetButton.addEventListener(`reset`, resetHandler);
  mainForm.addEventListener(`submit`, submitHandler);
  window.backend.load(successHandler, window.util.errorHandler);
  window.toggleState();
})();

