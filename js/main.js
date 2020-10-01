'use strict';
const TYPES = [`palace`, `flat`, `house`, `bungalo`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const ADVERT_COUNT = 8;
const PIN_OFSET_X = 25;
const PRICES = [0, 1000, 5000, 10000];
const ROOMS = [1, 2, 3, 100];
const PLACEMARK = {maxY: 630, minY: 130};

const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createAdvert = (count) => {
  const adverts = [];
  for (let i = 0; i < count; i++) {

    const current = i + 1;
    let NEW_FEATURES = FEATURES.filter((item) => getRandomNumber(2) ? item : null);
    let NEW_PHOTOS = PHOTOS.filter((item) => getRandomNumber(2) ? item : null);
    let coordinateX = getRandomNumber(document.body.clientWidth - PIN_OFSET_X, PIN_OFSET_X);
    let coordinateY = getRandomNumber(PLACEMARK.maxY, PLACEMARK.minY);

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
        features: NEW_FEATURES,
        description: `строка с описанием ${current}`,
        photos: NEW_PHOTOS,
      },
      location: {
        x: coordinateX,
        y: coordinateY,
      }
    });
  }
  return adverts;
};

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const adverts = createAdvert(ADVERT_COUNT);
const advertTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

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
map.querySelector(`.map__pins`).appendChild(fragment);
