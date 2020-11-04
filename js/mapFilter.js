'use strict';

(function () {
  const PriceRange = {
    LOW: {
      min: 0,
      max: 10000
    },
    MIDDLE: {
      min: 10000,
      max: 50000
    },
    HIGH: {
      min: 50000,
      max: Infinity
    }
  };
  const filterForm = window.map.workSpace.querySelector(`.map__filters`);
  const typeSelect = filterForm.querySelector(`#housing-type`);
  const priceSelect = filterForm.querySelector(`#housing-price`);
  const roomsSelect = filterForm.querySelector(`#housing-rooms`);
  const guestsSelect = filterForm.querySelector(`#housing-guests`);
  const featuresFieldset = filterForm.querySelector(`#housing-features`);

  const filterItem = (elem, item, key) => {
    return elem.value === `any` ? true : elem.value === item[key].toString();
  };
  const filtrationByType = (item) => {
    return filterItem(typeSelect, item.offer, `type`);
  };
  const filtrationByPrice = (item) => {
    const filterPrice = PriceRange[priceSelect.value.toUpperCase()];

    return filterPrice ? item.offer.price >= filterPrice.min && item.offer.price <= filterPrice.max : true;
  };
  const filtrationByRooms = (item) => {
    return filterItem(roomsSelect, item.offer, `rooms`);
  };
  const filtrationByGuests = (item) => {
    return filterItem(guestsSelect, item.offer, `guests`);
  };
  const filtrationByFeatures = (item) => {
    const checkedFeaturesItems = Array.from(featuresFieldset.querySelectorAll(`input:checked`));
    return checkedFeaturesItems.every((element) => {
      return item.offer.features.includes(element.value);
    });
  };

  const filterElement = (items) => {
    const data = items;
    window.pin.remove();
    window.pin.deletePopups();

    const filteredData = data.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);

    window.pin.update(filteredData);
    window.pin.renderCard(filteredData);
  };

  const activateFilter = (items) => {
    filterForm.addEventListener(`change`, () => {
      filterElement(items);
    });
  };

  window.mapFilter = {
    fieldsets: Array.from(filterForm.querySelectorAll(`fieldset`)),
    selects: Array.from(filterForm.querySelectorAll(`select`)),
    activate: activateFilter,
  };
})();
