'use strict';

(function () {
  const filterForm = window.map.querySelector(`.map__filters`);

  window.mapFilter = {
    fieldsets: Array.from(filterForm.querySelectorAll(`fieldset`)),
    selects: Array.from(filterForm.querySelectorAll(`select`)),
  };
})();
