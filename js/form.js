'use strict';

(function () {
  const MAX_ROOMS = 100;
  const MIN_CAPACITY = 0;
  const MAX_LENGTH_TITLE = 100;
  const MIN_LENGTH_TITLE = 30;

  const BuildingMinPrice = {
    BUNGALOW: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  const form = document.querySelector(`.ad-form`);
  const roomSelect = form.querySelector(`#room_number`);
  const capacitySelect = form.querySelector(`#capacity`);
  const address = form.querySelector(`#address`);
  const resetButton = form.querySelector(`.ad-form__reset`);
  const titleInput = form.querySelector(`#title`);
  const typeHouse = form.querySelector(`#type`);
  const priceInput = form.querySelector(`#price`);
  const timeInSelect = form.querySelector(`#timein`);
  const timeOutSelect = form.querySelector(`#timeout`);


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
  };

  titleInput.addEventListener(`input`, () => {
    titleInput.maxLength = MAX_LENGTH_TITLE;
    titleInput.minLength = MIN_LENGTH_TITLE;
    titleInput.required = true;
    const titleLenght = titleInput.value.length;

    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity(`Нужно больше 30 символов. Сейчас: ${titleLenght}`);
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity(`Нужно меньше 100 символов. Сейчас: ${titleLenght}`);
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity(`Нужно написать заголовок`);
    } else {
      titleInput.setCustomValidity(``);
    }
  });
  typeHouse.addEventListener(`change`, () => {
    const minPrice = BuildingMinPrice[typeHouse.value.toUpperCase()];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice.toString();
    typeHouse.reportValidity();
  });
  priceInput.addEventListener(`invalid`, () => {
    priceInput.required = true;
    priceInput.max = 1000000;

    if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity(`Нужно установить цену`);
    } else if (priceInput.validity.typeMismatch) {
      priceInput.setCustomValidity(`Вводите число`);
    } else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity(`Слишком много, надо меньше 1000001`);
    } else {
      priceInput.setCustomValidity(``);
    }
  });
  roomSelect.addEventListener(`change`, () => {
    validate();
    roomSelect.reportValidity();
  });
  capacitySelect.addEventListener(`change`, () => {
    validate();
    capacitySelect.reportValidity();
  });


  timeInSelect.addEventListener(`change`, (evt) => {
    timeOutSelect.value = evt.target.value;
  });
  timeOutSelect.addEventListener(`change`, (evt) => {
    timeInSelect.value = evt.target.value;
  });

  const successSubmitHandler = () => {
    window.util.openSuccessPopup();
    window.map.disablePage();
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
