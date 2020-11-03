"use strict";

(function () {
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

  const filterElement = (item) => {
    data = item;
    window.pin.remove();
    window.pin.deletePopups();

    filterData = data.filter(filtrationByType).concat(data);
    const uniqData = filterData.filter((elem, index) => {
      return filterData.indexOf(elem) === index;
    });
    window.pin.update(uniqData);
    window.pin.renderCard(uniqData);
  };

  const activateFilter = (item) => {
    filterForm.addEventListener(`change`, () => {
      filterElement(item);
    });
  };

  window.mapFilter = {
    fieldsets: Array.from(filterForm.querySelectorAll(`fieldset`)),
    selects: Array.from(filterForm.querySelectorAll(`select`)),
    activate: activateFilter,
  };
})();
