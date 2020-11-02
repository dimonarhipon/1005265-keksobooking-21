'use strict';

(function () {
  const PINS_LIMIT = 5;
  let data = [];
  let filterData = [];

  const filterForm = window.map.workSpace.querySelector(`.map__filters`);
  const typeSelect = filterForm.querySelector(`#housing-type`);

  const filterItem = (elem, item, key) => {
    return elem.value === `any` ? true : elem.value === item[key].toString();
  };
  const filtrationByType = (item) => {
    return filterItem(typeSelect, item.offer, `type`);
  };
  const onFilterChange = (item) => {
    data = item;
    window.pin.remove();
    window.pin.deletePopups();
    filterData = data;
    filterData = data.filter(filtrationByType).concat(data);
    window.pin.render(filterData.slice(0, PINS_LIMIT));
  };

  const activateFilter = (item) => {
    filterForm.addEventListener(`change`, () => {
      onFilterChange(item);
    });
  };


  window.mapFilter = {
    fieldsets: Array.from(filterForm.querySelectorAll(`fieldset`)),
    selects: Array.from(filterForm.querySelectorAll(`select`)),
    activate: activateFilter,
  };
})();
