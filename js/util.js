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
  };
})();
