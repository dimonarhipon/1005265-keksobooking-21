"use strict";

(function () {
  const ADVERT_COUNT = 8;
  // const adverts = window.advert.create(ADVERT_COUNT);

  const fragment = document.createDocumentFragment();

  const successHandler = (adverts) => {
    for (let i = 0; i < ADVERT_COUNT; i++) {
      fragment.appendChild(window.advert.render(adverts[i]));
    }
    // Для провеки результата
    // console.log(adverts);
    window.map.querySelector(`.map__pins`).appendChild(fragment);
  };

  const errorHandler = (errorMessage) => {
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
  };
  window.backend.load(successHandler, errorHandler);
})();

