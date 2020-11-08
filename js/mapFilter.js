'use strict';

const ANY_NUMBER = `any`;
const TYPE = `type`;
const ROOMS_NUMBER = `rooms`;
const GUESTS_NUMBER = `guests`;
const PINS_LIMIT = 5;

const PriceRange = {
  ANY: {
    min: 0,
    max: Infinity,
  },
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
  return item.value === ANY_NUMBER ? true : item.value === element[key].toString();
};

const filterElements = window.util.debounce((elements) => {
  const data = elements;
  window.pin.removeElements();

  const filteredData = [];

  for (let i = 0; i < data.length; i++) {
    let element = data[i];
    const filterPrice = PriceRange[priceSelect.value.toUpperCase()];
    const checkedFeaturesItems = Array.from(featuresFieldset.querySelectorAll(`input:checked`));


    const filtrationByType = filterItem(typeSelect, element.offer, TYPE);
    const filtrationByPrice = filterPrice ? element.offer.price >= filterPrice.min && element.offer.price <= filterPrice.max : true;
    const filtrationByRooms = filterItem(roomsSelect, element.offer, ROOMS_NUMBER);
    const filtrationByGuests = filterItem(guestsSelect, element.offer, GUESTS_NUMBER);
    const filtrationByFeatures = checkedFeaturesItems.every((item) => element.offer.features.includes(item.value));

    if (filtrationByType && filtrationByPrice && filtrationByRooms && filtrationByGuests && filtrationByFeatures) {
      filteredData.push(element);
    }
    if (filteredData.length >= PINS_LIMIT) {
      break;
    }
  }

  window.pin.renderElements(filteredData);
  window.pin.open();
});

const activateFilter = (elements) => {
  filterForm.addEventListener(`change`, () => {
    filterElements(elements);
  });
};

window.mapFilter = {
  PINS_LIMIT,
  form: filterForm,
  fieldsets: Array.from(filterForm.querySelectorAll(`fieldset`)),
  selects: Array.from(filterForm.querySelectorAll(`select`)),
  activate: activateFilter,
};

