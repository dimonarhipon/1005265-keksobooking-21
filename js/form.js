'use strict';

(function () {
  const MAX_ROOMS = 100;
  const MIN_CAPACITY = 0;

  const container = document.querySelector(`.ad-form`);

  const roomSelect = container.querySelector(`#room_number`);
  const capacitySelect = container.querySelector(`#capacity`);
  const address = container.querySelector(`#address`);


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

  validate();
  // container.addEventListener(`invalid`, window.form.validate);

  roomSelect.addEventListener(`change`, () => {
    validate();
    roomSelect.reportValidity();
  });
  capacitySelect.addEventListener(`change`, () => {
    validate();
    capacitySelect.reportValidity();
  });

  window.form = {
    container,
    address,
    fieldsets: Array.from(container.querySelectorAll(`fieldset`)),
    validate: validate,
  };
})();
