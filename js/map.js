'use strict';


const map = document.querySelector(`.map`);

const sendGetRequest = (isRequest) => {
  if (isRequest) {
    window.backend.load(window.pin.successHandler, window.util.errorHandler);
  }
};

const disablePage = (state = true, isRequest = false) => {
  map.classList.add(`map--faded`);
  window.form.container.classList.add(`ad-form--disabled`);

  window.form.fieldsets.map((item) => (item.disabled = state));
  window.mapFilter.fieldsets.map((item) => (item.disabled = state));
  window.mapFilter.selects.map((item) => (item.disabled = state));
  window.form.onRoomAndCapacitySelectChange();
  window.form.onTypeHouseChange();
  sendGetRequest(isRequest);

  if (!state) {
    map.classList.remove(`map--faded`);
    window.form.container.classList.remove(`ad-form--disabled`);
  }
};

window.map = {
  workSpace: map,
  disablePage,
};

