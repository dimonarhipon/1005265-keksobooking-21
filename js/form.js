'use strict';

(function () {
  const MAX_ROOMS = 100;
  const MIN_CAPACITY = 0;

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
  const title = form.querySelector(`#title`);
  const typeHouse = form.querySelector(`#type`);
  const price = form.querySelector(`#price`);
  const timeInSelect = form.querySelector(`#timein`);
  const timeOutSelect = form.querySelector(`#timeout`);


  const onTitleEventInput = () => {
    const titleLenght = title.value.length;

    if (title.validity.tooShort) {
      title.setCustomValidity(`Нужно больше 30 символов. Сейчас: ${titleLenght}`);
    } else if (title.validity.tooLong) {
      title.setCustomValidity(`Нужно меньше 100 символов. Сейчас: ${titleLenght}`);
    } else if (title.validity.valueMissing) {
      title.setCustomValidity(`Нужно написать заголовок`);
    } else {
      title.setCustomValidity(``);
    }
  };

  const onTypeHouseChange = () => {
    const minPrice = BuildingMinPrice[typeHouse.value.toUpperCase()];
    price.min = minPrice;
    price.placeholder = minPrice.toString();
  };

  const onPriseInvalid = () => {
    if (price.validity.valueMissing) {
      price.setCustomValidity(`Нужно установить цену`);
    } else if (price.validity.typeMismatch) {
      price.setCustomValidity(`Вводите число`);
    } else if (price.validity.rangeUnderFlow) {
      price.setCustomValidity(`Слишком мало, надо больше`);
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity(`Слишком много, надо меньше 1000001`);
    } else {
      price.setCustomValidity(``);
    }
  };

  const onRoomAndCapacitySelectChange = () => {
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
    roomSelect.reportValidity();
    capacitySelect.reportValidity();
  };

  const onTimeInSelect = (evt) => {
    timeOutSelect.value = evt.target.value;
  };
  const onTimeOutSelect = (evt) => {
    timeInSelect.value = evt.target.value;
  };


  const successSubmitHandler = () => {
    window.util.openSuccessPopup();
    window.pin.removeElements();
    form.reset();
    window.map.disablePage();
  };

  const resetHandler = (evt) => {
    evt.preventDefault();
    form.reset();
  };
  const submitHandler = (evt) => {
    evt.preventDefault();
    window.backend.post(new FormData(form), successSubmitHandler, window.util.openErrorPopup);

    title.removeEventListener(`input`, onTitleEventInput);
    typeHouse.removeEventListener(`change`, onTypeHouseChange);
    price.removeEventListener(`invalid`, onPriseInvalid);
    roomSelect.removeEventListener(`change`, onRoomAndCapacitySelectChange);
    capacitySelect.removeEventListener(`change`, onRoomAndCapacitySelectChange);
    timeInSelect.removeEventListener(`change`, onTimeInSelect);
    timeOutSelect.removeEventListener(`change`, onTimeOutSelect);

    resetButton.removeEventListener(`reset`, resetHandler);
    form.removeEventListener(`submit`, submitHandler);
  };

  title.addEventListener(`input`, onTitleEventInput);
  typeHouse.addEventListener(`change`, onTypeHouseChange);
  price.addEventListener(`invalid`, onPriseInvalid);
  roomSelect.addEventListener(`change`, onRoomAndCapacitySelectChange);
  capacitySelect.addEventListener(`change`, onRoomAndCapacitySelectChange);
  timeInSelect.addEventListener(`change`, onTimeInSelect);
  timeOutSelect.addEventListener(`change`, onTimeOutSelect);
  resetButton.addEventListener(`reset`, resetHandler);
  form.addEventListener(`submit`, submitHandler);

  onRoomAndCapacitySelectChange();
  onTypeHouseChange();

  window.form = {
    container: form,
    address,
    fieldsets: Array.from(form.querySelectorAll(`fieldset`)),
  };
})();
