'use strict';

(function () {
  const PINS_LIMIT = 5;
  let filterData = [];

  const filterForm = window.map.workSpace.querySelector(`.map__filters`);
  const typeSelect = filterForm.querySelector(`#housing-type`);

  const filterItem = (elem, item, key) => {
    return elem.value === `any` ? true : elem.value === item[key].toString();
  };
  const filtrationByType = (item) => {
    return filterItem(typeSelect, item.offer, `type`);
  };
  const onFilterChange = (data) => {
    window.pin.remove();
    // window.pin.deletePopup();
    filterData = data.filter(filtrationByType).concat(data);
    window.pin.render(filterData.slice(0, PINS_LIMIT));
  };

  const activateFilter = (data) => {
    filterForm.addEventListener(`change`, () => {
      onFilterChange(data);
    });
  };


  window.mapFilter = {
    fieldsets: Array.from(filterForm.querySelectorAll(`fieldset`)),
    selects: Array.from(filterForm.querySelectorAll(`select`)),
    activate: activateFilter,
  };
})();
