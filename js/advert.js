'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  window.advert = {
    render: (advert) => {
      const pinElement = pinTemplate.cloneNode(true);
      const img = pinElement.querySelector(`img`);

      pinElement.style = `left: ${advert.location.x}px; top: ${advert.location.y}px`;
      img.src = advert.author.avatar;
      img.alt = advert.offer.title;

      pinElement.classList.add(`hidden`);

      return pinElement;
    },
  };
})();
