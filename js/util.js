'use strict';

(function () {
  const ADVERT_COUNT = 8;
  const fragment = document.createDocumentFragment();
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorButton = errorTemplate.querySelector(`.error__button`);


  window.util = {
    getRandomNumber: (max, min = 0) => {
      return Math.floor(Math.random() * (max - min) + min);
    },
    successHandler: (advert) => {
      for (let i = 0; i < ADVERT_COUNT; i++) {
        fragment.appendChild(window.advert.render(advert[i]));
      }
      // Для провеки результата
      // console.log(advert);
      // fragment.appendChild(window.card.render(advert[i]));
      window.pinContainer.appendChild(fragment);
    },
    errorHandler: (errorMessage) => {
      const node = document.createElement(`div`);
      node.style = `z-index: 5; margin: 0 auto; text-align: center; background-color: tomato;`;
      node.style.position = `absolute`;
      node.style.width = `400px`;
      node.style.height = `80px`;
      node.style.color = `#ffffff`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `28px`;

      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    },
    openSuccessPopup: () => {
      const successElement = successTemplate.cloneNode(true);
      document.body.insertAdjacentElement(`afterbegin`, successElement);

      document.addEventListener(`click`, () => {
        successElement.style.display = `none`;
      });
      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          successElement.style.display = `none`;
        }
      });
      console.log(1);
    },
    openErrorPopup: () => {
      const errorElement = errorTemplate.cloneNode(true);
      document.body.insertAdjacentElement(`afterbegin`, errorElement);

      document.addEventListener(`click`, () => {
        errorElement.style.display = `none`;
      });
      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          errorElement.style.display = `none`;
        }
      });
      errorButton.addEventListener(`click`, () => {
        errorElement.style.display = `none`;
      });
      console.log(2);
    },
  };
})();
