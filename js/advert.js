"use strict";

(function () {
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
  const PIN_OFSET_X = 32;
  const PRICES = [0, 1000, 5000, 10000];
  const ROOMS = [1, 2, 3, 100];
  const PLACEMARK = {
    maxY: 630,
    minY: 130,
  };

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  window.advert = {
    create: (count) => {
      const adverts = [];

      for (let i = 0; i < count; i++) {
        const current = i + 1;

        const coordinateX = window.util.getRandomNumber(
            document.body.clientWidth - PIN_OFSET_X,
            window.PIN_OFSET_X
        );
        const coordinateY = window.util.getRandomNumber(PLACEMARK.maxY, PLACEMARK.minY);

        adverts.push({
          author: {
            avatar: `img/avatars/user0${current}.png`,
          },
          offer: {
            title: `Заголовок предложения ${current}`,
            address: `${coordinateX}, ${coordinateY}`,
            price: PRICES[window.util.getRandomNumber(PRICES.length)],
            type: TYPES[window.util.getRandomNumber(TYPES.length)],
            rooms: ROOMS[window.util.getRandomNumber(ROOMS.length)],
            guests: current,
            checkin: TIMES[window.util.getRandomNumber(TIMES.length)],
            checkout: TIMES[window.util.getRandomNumber(TIMES.length)],
            features: FEATURES.filter((item) =>
              window.util.getRandomNumber(2) ? item : null
            ),
            description: `строка с описанием ${current}`,
            photos: PHOTOS.filter((item) => (window.util.getRandomNumber(2) ? item : null)),
          },
          location: {
            x: coordinateX,
            y: coordinateY,
          },
        });
      }
      return adverts;
    },
    updatePin: (advert) => {
      const pinElement = pinTemplate.cloneNode(true);
      const img = pinElement.querySelector(`img`);

      pinElement.style = `left: ${advert.location.x}px; top: ${advert.location.y}px`;
      img.src = advert.author.avatar;
      img.alt = advert.offer.title;

      return pinElement;
    },
  };
})();
