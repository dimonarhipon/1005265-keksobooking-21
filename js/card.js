'use strict';


(function () {
  // const Type = {
  //   flat: `Квартира`,
  //   bungalow: `Бунгало`,
  //   house: `Дом`,
  //   palace: `Дворец`
  // };
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  window.card = {
    updateCard: (advert) => {
      const cardElement = cardTemplate.cloneNode(true);

      const title = cardElement.querySelector(`.popup__title`);
      const address = cardElement.querySelector(`.popup__text--address`);
      const price = cardElement.querySelector(`.popup__text--price`);
      const type = cardElement.querySelector(`.popup__type`);
      const capacity = cardElement.querySelector(`.popup__text--capacity`);
      const time = cardElement.querySelector(`.popup__text--time `);
      const features = cardElement.querySelector(`.popup__features`);
      const description = cardElement.querySelector(`.popup__description`);
      const photo = cardElement.querySelector(`.popup__photos`);
      const img = cardElement.querySelector(`.popup__avatar`);

      const getFeaturesElement = (item) => {
        const listFragment = document.createDocumentFragment();

        for (let i = 0; i < item.offer.features.length; i++) {
          const newElementList = document.createElement(`li`);
          newElementList.className = `popup__feature popup__feature--${item.offer.features[i]}`;
          listFragment.appendChild(newElementList);
        }
        features.appendChild(listFragment);
        return listFragment;
      };
      const getPhotosElement = (item) => {
        const listFragment = document.createDocumentFragment();

        for (let i = 0; i < item.offer.photos.length; i++) {
          const newElementList = document.createElement(`img`);
          newElementList.src = item.offer.photos[i];
          newElementList.width = 40;
          newElementList.height = 40;
          listFragment.appendChild(newElementList);
        }
        photo.appendChild(listFragment);
        return photo;
      };

      switch (advert.offer.type) {
        case `flat`:
          advert.offer.type = `Квартира`;
          break;
        case `bungalow`:
          advert.offer.type = `Бунгало`;
          break;
        case `house`:
          advert.offer.type = `Дом`;
          break;
        case `palace`:
          advert.offer.type = `Дворец`;
          break;
        default:
          advert.offer.type = ``;
      }


      img.src = advert.author.avatar;
      img.alt = advert.offer.title;
      title.textContent = advert.offer.title;
      address.textContent = advert.offer.address;
      price.textContent = `${advert.offer.price} ₽/ночь.`;
      type.textContent = advert.offer.type;
      capacity.textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
      time.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;

      getFeaturesElement(advert);
      description.textContent = advert.offer.description;
      getPhotosElement(advert);

      return cardElement;
    },
  };
})();
