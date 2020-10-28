'use strict';

(function () {
  const MAX_ROOMS = 100;
  const MIN_CAPACITY = 0;

  const form = document.querySelector(`.ad-form`);
  const roomSelect = form.querySelector(`#room_number`);
  const capacitySelect = form.querySelector(`#capacity`);
  const address = form.querySelector(`#address`);
  const resetButton = form.querySelector(`.ad-form__reset`);


  const validate = () => {
    const roomCount = parseInt(roomSelect.value, 10);
    const capacityCount = parseInt(capacitySelect.value, 10);

    if (roomCount === MAX_ROOMS && capacityCount !== MIN_CAPACITY) {
      capacitySelect.setCustomValidity(`Такой выбор соотвествует только варианту: не для гостей`);
      return;
    }
    if (roomCount !== MAX_ROOMS && capacityCount === MIN_CAPACITY) {
      capacitySelect.setCustomValidity(`Такой выбор соотвествует только варианту: не для гостей`);
      return;
    }
    if (roomCount < capacityCount) {
      capacitySelect.setCustomValidity(`Гостей должно быть меньше, чем комнат`);
      return;
    }

    capacitySelect.setCustomValidity(``);
    capacitySelect.style.border = `1px solid #d9d9d3`;
  };

  roomSelect.addEventListener(`change`, () => {
    validate();
    roomSelect.reportValidity();
  });
  capacitySelect.addEventListener(`change`, () => {
    validate();
    capacitySelect.reportValidity();
  });

  const successSubmitHandler = () => {
    window.util.openSuccessPopup();
    window.map.toggleState(false);
    form.reset();
  };

  const resetHandler = (evt) => {
    evt.preventDefault();
    form.reset();
  };
  const submitHandler = (evt) => {
    window.backend.post(new FormData(form), successSubmitHandler, window.util.openErrorPopup);
    evt.preventDefault();
  };


  validate();
  resetButton.addEventListener(`reset`, resetHandler);
  form.addEventListener(`submit`, submitHandler);

  window.form = {
    container: form,
    address,
    fieldsets: Array.from(form.querySelectorAll(`fieldset`)),
  };
})();
