'use strict';

(function () {
  const filtersForm = window.map.placeAdvert.querySelector(`.map__filters`);

  window.mapFilter = {
    fieldsFilter: Array.from(filtersForm.querySelectorAll(`fieldset`)),
    selectsFilter: Array.from(filtersForm.querySelectorAll(`select`)),
  };
})();
