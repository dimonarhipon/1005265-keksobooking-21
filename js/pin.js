'use strict';

(function () {
  const LIMIT_TOP = 170;
  const LIMIT_BOTTOM = 620;
  const LIMIT_LEFT = -32;
  const LIMIT_RIGHT = 1168;

  const PINS_LIMIT = 5;
  const fragmentAdvert = document.createDocumentFragment();
  const fragmentCard = document.createDocumentFragment();
  let isPageActivated = false;
  const pinContainer = window.map.workSpace.querySelector(`.map__pins`);
  const pinMain = window.map.workSpace.querySelector(`.map__pin--main`);
  const pinMainWidth = Math.floor(pinMain.offsetWidth / 2);
  const pinMainHeight = Math.floor(pinMain.offsetHeight / 2);
  const pinMainOx = pinMain.offsetLeft + pinMainWidth;
  const pinMainOy = pinMain.offsetTop + pinMainHeight;


  const setCoordinate = (x = pinMainOx, y = pinMainOy) => {
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    window.form.address.value = `${x}, ${y}`;
  };
  const removePins = function () {
    const mapPins = Array.from(pinContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`));
    mapPins.forEach((item) => item.remove());
  };


  const onPinClick = () => {
    const popup = window.map.workSpace.querySelector(`.popup`);
    const closePopup = popup.querySelector(`.popup__close`);

    document.addEventListener(`keydown`, () => popup.remove());
    closePopup.addEventListener(`click`, () => popup.remove());
  };
  const removePopup = () => {
    const popup = window.map.workSpace.querySelector(`.map__card`);
    if (popup !== null) {
      popup.remove();
    }
  };


  const pinSuccessHandler = (advert) => {
    window.mapFilter.activate(advert);

    for (let i = 0; i < PINS_LIMIT; i++) {
      fragmentAdvert.appendChild(window.advert.render(advert[i]));
    }
    window.pin.container.appendChild(fragmentAdvert);
    getCard();
  };

  const popupSuccessHandler = (card) => {
    const mapPins = Array.from(pinContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`));
    window.mapFilter.activate(card);
    for (let i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener(`click`, () => {
        removePopup();
        fragmentCard.appendChild(window.card.render(card[i]));
        window.map.workSpace.appendChild(fragmentCard);
        onPinClick();
      });
    }
  };

  const getPins = () => {
    console.log(`pins`);
    return window.backend.load(pinSuccessHandler, window.util.errorHandler);
  };
  const getCard = () => {
    console.log(`card`);
    return window.backend.load(popupSuccessHandler, window.util.errorHandler);
  };
  const activatePage = () => {
    if (!isPageActivated) {
      getPins();
      isPageActivated = true;
    }
  };

  pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    if (evt.button === 0) {
      window.map.disablePage(false);

      setCoordinate(pinMainOx, pinMainOy + pinMainHeight);
      let dragged = false;
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      let topPin;
      let leftPin;

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        dragged = true;

        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        pinMain.style.zIndex = 2;
        topPin = pinMain.offsetTop - shift.y;
        leftPin = pinMain.offsetLeft - shift.x;

        if (topPin < LIMIT_TOP) {
          topPin = LIMIT_TOP;
        } else if (topPin > LIMIT_BOTTOM) {
          topPin = LIMIT_BOTTOM;
        }
        if (leftPin < LIMIT_LEFT) {
          leftPin = LIMIT_LEFT;
        } else if (leftPin > LIMIT_RIGHT) {
          leftPin = LIMIT_RIGHT;
        }
        pinMain.style.top = topPin + `px`;
        pinMain.style.left = leftPin + `px`;
        setCoordinate(leftPin + pinMainWidth, topPin + pinMainHeight);
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();
        activatePage();
        setCoordinate(leftPin + pinMainWidth, topPin + pinMainHeight);

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        if (dragged) {
          const onClickPreventDefault = (clickEvt) => {
            clickEvt.preventDefault();
            pinMain.removeEventListener(`click`, onClickPreventDefault);
          };
          pinMain.addEventListener(`click`, onClickPreventDefault);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });

  pinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.map.disablePage(false);
      setCoordinate(pinMainOx, pinMainOy + pinMainHeight);
      activatePage();
    }
  });

  pinMain.focus();
  setCoordinate();

  window.pin = {
    container: pinContainer,
    isPageActivated,
    render: pinSuccessHandler,
    remove: removePins,
    deletePopup: removePopup
  };
})();
