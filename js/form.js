'use strict';

const URL_IMAGE_DEFAULT = `img/muffin-grey.svg`;
const MAX_ROOMS = 100;
const MIN_CAPACITY = 0;
const DEFAULT_PRICE = 1000;

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


const onTitleInput = () => {
  const titleLength = title.value.length;

  if (title.validity.tooShort) {
    title.setCustomValidity(`Нужно больше 30 символов. Сейчас: ${titleLength}`);
  } else if (title.validity.tooLong) {
    title.setCustomValidity(`Нужно меньше 100 символов. Сейчас: ${titleLength}`);
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
    capacitySelect.setCustomValidity(`Такой выбор соотвествует только варианту 100 комнат`);
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


const setСurrentCoordinatesMarker = (height = window.pin.markerHeight) => {
  const x = window.pin.marker.offsetLeft + window.pin.markerWidth;
  const y = window.pin.marker.offsetTop + height;
  window.pin.setCoordinate(x, y);
};

const onPostSuccess = () => {
  window.util.openPopupSuccess();
  window.pin.removeElements();
  window.mapFilter.form.reset();
  form.reset();
  price.min = DEFAULT_PRICE;
  price.placeholder = DEFAULT_PRICE;

  window.map.disablePage();
  setСurrentCoordinatesMarker();
  window.isLoad = true;
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  form.reset();
  price.min = DEFAULT_PRICE;
  price.placeholder = DEFAULT_PRICE;

  setСurrentCoordinatesMarker(2 * window.pin.markerHeight);

  window.loadImage.previewAvatar.src = URL_IMAGE_DEFAULT;
  if (window.loadImage.previewPhoto.querySelector(`img`)) {
    window.loadImage.previewPhoto.querySelector(`img`).remove();
  }
};
const onFormSubmit = (evt) => {
  evt.preventDefault();
  window.backend.post(new FormData(form), onPostSuccess, window.util.onPostError);

  window.pin.marker.style.top = `${window.pin.markerStartTop - window.pin.markerHeight}px`;
  window.pin.marker.style.left = `${window.pin.markerStartLeft - window.pin.markerWidth}px`;

  window.loadImage.previewAvatar.src = URL_IMAGE_DEFAULT;
  if (window.loadImage.previewPhoto.querySelector(`img`)) {
    window.loadImage.previewPhoto.querySelector(`img`).remove();
  }
};

title.addEventListener(`input`, onTitleInput);
typeHouse.addEventListener(`change`, onTypeHouseChange);
price.addEventListener(`invalid`, onPriseInvalid);
roomSelect.addEventListener(`change`, onRoomAndCapacitySelectChange);
capacitySelect.addEventListener(`change`, onRoomAndCapacitySelectChange);
timeInSelect.addEventListener(`change`, onTimeInSelect);
timeOutSelect.addEventListener(`change`, onTimeOutSelect);
resetButton.addEventListener(`click`, onResetButtonClick);
form.addEventListener(`submit`, onFormSubmit);


window.form = {
  container: form,
  address,
  fieldsets: Array.from(form.querySelectorAll(`fieldset`)),
  onRoomAndCapacitySelectChange,
  onTypeHouseChange,
};

