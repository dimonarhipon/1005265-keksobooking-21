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

  const filterItem = (item, element, key) => {
    return item.value === `any` ? true : item.value === element[key].toString();
  };
  const filtrationByType = (element) => {
    return filterItem(typeSelect, element.offer, `type`);
  };
  const filtrationByPrice = (element) => {
    const filterPrice = PriceRange[priceSelect.value.toUpperCase()];

    return filterPrice ? element.offer.price >= filterPrice.min && element.offer.price <= filterPrice.max : true;
  };
  const filtrationByRooms = (element) => {
    return filterItem(roomsSelect, element.offer, `rooms`);
  };
  const filtrationByGuests = (element) => {
    return filterItem(guestsSelect, element.offer, `guests`);
  };
  const filtrationByFeatures = (element) => {
    const checkedFeaturesItems = Array.from(featuresFieldset.querySelectorAll(`input:checked`));
    return checkedFeaturesItems.every((item) => {
      return element.offer.features.includes(item.value);
    });
  };

  const filterElements = window.util.debounce((elements) => {
    const data = elements;
    window.pin.removeElements();

    const filteredData = data.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);

    window.pin.renderElements(filteredData);
    window.pin.open();
  });

  const activateFilter = (elements) => {
    filterForm.addEventListener(`change`, () => {
      filterElements(elements);
    });
  };

  window.mapFilter = {
    fieldsets: Array.from(filterForm.querySelectorAll(`fieldset`)),
    selects: Array.from(filterForm.querySelectorAll(`select`)),
    activate: activateFilter,
  };
})();
