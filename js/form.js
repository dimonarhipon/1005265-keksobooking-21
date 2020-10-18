"use strict";

(function () {
  const MAX_ROOMS = 100;
  const MIN_CAPACITY = 0;

  const noticeForm = document.querySelector(`.ad-form`);

  const room = noticeForm.querySelector(`#room_number`);
  const capacity = noticeForm.querySelector(`#capacity`);
  const address = noticeForm.querySelector(`#address`);

  window.form = {
    noticeForm,
    address,
    fieldsNotice: Array.from(noticeForm.querySelectorAll(`fieldset`)),

    // С валидация сложнейшая тема для меня
    validation: () => {
      const roomCount = parseInt(room.value, 10);
      const capacityCount = parseInt(capacity.value, 10);

      if (roomCount === MAX_ROOMS && capacityCount !== MIN_CAPACITY) {
        capacity.setCustomValidity(`Такой выбор соотвествует только варианту: не для гостей`);
        // capacity.style.border = `3px solid #ff6547`;
        // console.log(roomCount, capacityCount, `A`);
        return;
      }
      if (roomCount < capacityCount) {
        capacity.setCustomValidity(`Гостей должно быть меньше, чем комнат`);
        // capacity.style.border = `3px solid #ff6547`;
        // console.log(roomCount, capacityCount, `B`);
        return;
      }
      // console.log(roomCount, capacityCount, `C`);

      room.setCustomValidity(``);
      capacity.style.border = `1px solid #d9d9d3`;
    },
  };
  window.form.validation();

  noticeForm.addEventListener(`invalid`, window.form.validation);
  noticeForm.addEventListener(`change`, () => {
    room.reportValidity();
    capacity.reportValidity();
  });
})();
