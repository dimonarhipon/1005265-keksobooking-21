'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const noticeForm = document.querySelector(`.ad-form`);
  const filtersForm = map.querySelector(`.map__filters`);

  window.fieldsNotice = Array.from(noticeForm.querySelectorAll(`fieldset`));
  window.fieldsFilter = Array.from(filtersForm.querySelectorAll(`fieldset`));
  window.selectsFilter = Array.from(filtersForm.querySelectorAll(`select`));

  const room = noticeForm.querySelector(`#room_number`);
  const capacity = noticeForm.querySelector(`#capacity`);
  const address = noticeForm.querySelector(`#address`);


  window.form = {
    setCoodinate: (x = window.pinMainOy, y = window.pinMainOy) => {
      address.value = `${x}, ${y}`;
    },
    validation: () => {
      const roomCount = parseInt(room.value, 10);
      const capacityCount = parseInt(capacity.value, 10);

      if (roomCount === 100 && capacityCount !== 0) {
        capacity.setCustomValidity(`Такой выбор соотвествует только варианту: не для гостей`);
        capacity.style.border = `3px solid #ff6547`;
        return;
      }
      if (roomCount < capacityCount) {
        capacity.setCustomValidity(`Гостей должно быть меньше, чем комнат`);
        capacity.style.border = `3px solid #ff6547`;
        return;
      }
      room.reportValidity();
      capacity.reportValidity();
      room.setCustomValidity(``);

      capacity.style.border = `1px solid #d9d9d3`;
    },
  };

  noticeForm.addEventListener(`input`, window.form.validation);
  noticeForm.addEventListener(`invalid`, window.form.validation);
})();
