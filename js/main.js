"use strict";
const TYPES = [`palace`, `flat`, `house`, `bungalo`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`,
];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];
const ADVERT_COUNT = 8;
const PIN_OFSET_X = 32;
const PIN_OFSET_Y = 70;
const PRICES = [0, 1000, 5000, 10000];
const ROOMS = [1, 2, 3, 100];
const PLACEMARK = {maxY: 630, minY: 130};
const PIN_MAIN_OFSET = 50;

const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createAdvert = (count) => {
  const adverts = [];
  for (let i = 0; i < count; i++) {
    const current = i + 1;

    const coordinateX = getRandomNumber(
        document.body.clientWidth - PIN_OFSET_X,
        PIN_OFSET_X
    );
    const coordinateY = getRandomNumber(PLACEMARK.maxY, PLACEMARK.minY);

    adverts.push({
      author: {
        avatar: `img/avatars/user0${current}.png`,
      },
      offer: {
        title: `Заголовок предложения ${current}`,
        address: `${coordinateX}, ${coordinateY}`,
        price: PRICES[getRandomNumber(PRICES.length)],
        type: TYPES[getRandomNumber(TYPES.length)],
        rooms: ROOMS[getRandomNumber(ROOMS.length)],
        guests: current,
        checkin: TIMES[getRandomNumber(TIMES.length)],
        checkout: TIMES[getRandomNumber(TIMES.length)],
        features: FEATURES.filter((item) => getRandomNumber(2) ? item : null),
        description: `строка с описанием ${current}`,
        photos: PHOTOS.filter((item) => getRandomNumber(2) ? item : null),
      },
      location: {
        x: coordinateX,
        y: coordinateY,
      },
    });
  }
  return adverts;
};

const adverts = createAdvert(ADVERT_COUNT);
const advertTemplate = document
  .querySelector(`#pin`)
  .content.querySelector(`.map__pin`);

const renderAdvert = (advert) => {
  const advertElement = advertTemplate.cloneNode(true);
  const img = advertElement.querySelector(`img`);

  advertElement.style = `left: ${advert.location.x}px; top: ${advert.location.y}px`;
  img.src = advert.author.avatar;
  img.alt = advert.offer.title;

  return advertElement;
};

const fragment = document.createDocumentFragment();

for (let i = 0; i < ADVERT_COUNT; i++) {
  fragment.appendChild(renderAdvert(adverts[i]));
}

//
//
//
//

const map = document.querySelector(`.map`);
map.querySelector(`.map__pins`).appendChild(fragment);

const noticeForm = document.querySelector(`.ad-form`);
const filtersForm = map.querySelector(`.map__filters`);
const fieldsNotice = Array.from(noticeForm.querySelectorAll(`fieldset`));
const fieldsFilter = Array.from(filtersForm.querySelectorAll(`fieldset`));
const selectsFilter = Array.from(filtersForm.querySelectorAll(`select`));

const toggleState = function (state = true) {
  map.classList.add(`map--faded`);
  noticeForm.classList.add(`ad-form--disabled`);

  if (state === false) {
    map.classList.remove(`map--faded`);
    noticeForm.classList.remove(`ad-form--disabled`);
  }

  fieldsNotice.map((item) => {
    item.disabled = state;
    return item;
  });
  fieldsFilter.map((item) => {
    item.disabled = state;
    return item;
  });
  selectsFilter.map((item) => {
    item.disabled = state;
    return item;
  });
};
toggleState();
//

const pinMain = map.querySelector(`.map__pin--main`);
const address = noticeForm.querySelector(`#address`);
const room = noticeForm.querySelector(`#room_number`);
const capacity = noticeForm.querySelector(`#capacity`);
pinMain.focus();

const pinMainOy = parseInt(pinMain.style.top, 10) - PIN_MAIN_OFSET;
const pinMainOx = parseInt(pinMain.style.left, 10) - PIN_MAIN_OFSET;

const setCoodinate = (x = pinMainOx, y = pinMainOy) => {
  address.value = `${x}, ${y}`;
};
setCoodinate();

//

pinMain.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();
  setCoodinate(pinMainOx - PIN_OFSET_X, pinMainOy - PIN_OFSET_Y);

  if (evt.button === 0) {
    toggleState(false);
  }
});

pinMain.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    toggleState(false);
  }
});

const validation = () => {
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

  room.setCustomValidity(``);
  room.reportValidity();
  capacity.reportValidity();
  capacity.style.border = `none`;
};
noticeForm.addEventListener(`input`, validation);
