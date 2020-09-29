'use strict';
const TYPES = [`palace`, `flat`, `house`, `bungalo`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const ANNOUNCEMENT_COUNT = 8;
const PIN_OFSET_X = 25;
const DEFAULT_PRICE = 1000;
const PLACEMARK = {maxY: 630, minY: 130};

const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const NEW_FEATURES = FEATURES.filter((item) => getRandomNumber(2) ? item : null);
const NEW_PHOTOS = PHOTOS.filter((item) => getRandomNumber(2) ? item : null);

const announcements = [];
const createAnnouncement = () => {
  for (let i = 1; i <= ANNOUNCEMENT_COUNT; i++) {
    announcements.push({
      author: {
        avatar: `img/avatars/user0${i}.png`,
      },
      offer: {
        title: `Заголовок предложения ${i}`,
        address: `{{location.x}}, {{location.y}}`,
        price: i * DEFAULT_PRICE,
        typ: TYPES[getRandomNumber(TYPES.length)],
        rooms: i,
        guests: i,
        checkin: TIMES[getRandomNumber(TIMES.length)],
        checkout: TIMES[getRandomNumber(TIMES.length)],
        features: NEW_FEATURES,
        description: `строка с описанием ${i}`,
        photos: NEW_PHOTOS,
      },
      location: {
        x: getRandomNumber(document.body.clientWidth),
        y: getRandomNumber(PLACEMARK.maxY, PLACEMARK.minY),
      }
    });
  }
};
createAnnouncement();

document.querySelector(`.map`).classList.remove(`map--faded`);
const announcementTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const renderAnnouncement = (announcement) => {
  const announcementElement = announcementTemplate.cloneNode(true);
  const img = announcementElement.querySelector(`img`);

  announcementElement.style = `left: ${announcement.location.x + PIN_OFSET_X}px; top: ${announcement.location.y}px`;
  img.src = announcement.author.avatar;
  img.alt = announcement.offer.title;

  return announcementElement;
};

const fragment = document.createDocumentFragment();

for (let i = 0; i < ANNOUNCEMENT_COUNT; i++) {
  fragment.appendChild(renderAnnouncement(announcements[i]));
}
document.querySelector(`.map__pins`).appendChild(fragment);
