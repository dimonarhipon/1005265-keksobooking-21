'use strict';

(function () {
  window.util = {
    getRandomNumber: (max, min = 0) => {
      return Math.floor(Math.random() * (max - min) + min);
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
    successSubmit: () => {
      const container = document.querySelector(`.ad-form`);
      const successTemplate = document.querySelector(`#success`).content;
      const success = successTemplate.querySelector(`.success`);
      document.body.insertAdjacentElement(`afterbegin`, success);
      container.reset();
      window.toggleState(false);

      document.addEventListener(`click`, () => {
        success.style.display = `none`;
      });
      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          success.style.display = `none`;
        }
      });
    },
    errorSubmit: () => {
      const errorTemplate = document.querySelector(`#error`).content;
      const error = errorTemplate.querySelector(`.error`);
      const errorButton = errorTemplate.querySelector(`.error__button`);
      document.body.insertAdjacentElement(`afterbegin`, error);

      document.addEventListener(`click`, () => {
        error.style.display = `none`;
      });
      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          error.style.display = `none`;
        }
      });
      errorButton.addEventListener(`click`, () => {
        error.style.display = `none`;
      });
    },
  };
})();
