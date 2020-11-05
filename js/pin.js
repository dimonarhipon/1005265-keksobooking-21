'use strict';

(function () {
  const LIMIT_TOP = 170;
  const LIMIT_BOTTOM = 620;
  const LIMIT_LEFT = -32;
  const LIMIT_RIGHT = 1168;

  const PINS_LIMIT = 5;
  const isLoad = false;
  const isActivatePage = false;
  const fragmentAdvert = document.createDocumentFragment();
  const fragmentCard = document.createDocumentFragment();
  const pinContainer = window.map.workSpace.querySelector(`.map__pins`);
  const pinMain = window.map.workSpace.querySelector(`.map__pin--main`);
  const pinMainWidth = Math.floor(pinMain.offsetWidth / 2);
  const pinMainHeight = Math.floor(pinMain.offsetHeight / 2);
  const pinMainOx = pinMain.offsetLeft + pinMainWidth;
  const pinMainOy = pinMain.offsetTop + pinMainHeight;


  const setCoordinate = (x = pinMainOx, y = pinMainOy) => {
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    console.log(x, y);
    window.form.address.value = `${x}, ${y}`;
  };


  const renderElements = (elements) => {
    const count = elements.length > PINS_LIMIT ? PINS_LIMIT : elements.length;

    for (let i = 0; i < count; i++) {
      fragmentAdvert.appendChild(window.advert.render(elements[i]));
      fragmentCard.appendChild(window.card.render(elements[i]));
    }
    window.pin.container.appendChild(fragmentAdvert);
    window.pin.container.appendChild(fragmentCard);
    addPinsListener();
  };

  const removeElements = () => {
    const mapPins = pinContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    const popups = window.map.workSpace.querySelectorAll(`.map__card`);

    mapPins.forEach((item) => item.remove());
    popups.forEach((item) => item.remove());
  };

  const onPinClick = (i) => {
    const popups = Array.from(window.map.workSpace.querySelectorAll(`.popup`));
    const closePopup = popups[i].querySelector(`.popup__close`);

    popups.forEach((item) => item.classList.add(`hidden`));
    popups[i].classList.remove(`hidden`);

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        popups[i].classList.add(`hidden`);
      }
    });
    closePopup.addEventListener(`click`, () => popups[i].classList.add(`hidden`));
  };
  const addPinsListener = () => {
    const mapPins = Array.from(pinContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`));
    for (let i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener(`click`, () => {
        onPinClick(i);
      });
    }
  };
  const openPins = () => {
    const mapPins = pinContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    mapPins.forEach((item) => item.classList.remove(`hidden`));
  };

  const successHandler = (elements) => {
    window.mapFilter.activate(elements);
    renderElements(elements);
  };


  pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    if (evt.button === 0) {
      window.map.disablePage(isActivatePage, isLoad);

      openPins();
      setCoordinate(pinMainOx, pinMainOy + pinMainHeight);
      let dragged = false;
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      let topPin = pinMainOy;
      let leftPin = pinMainOx;

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
        setCoordinate(leftPin + pinMainWidth, topPin + 2 * pinMainHeight);
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();
        setCoordinate(leftPin + pinMainWidth, topPin + 2 * pinMainHeight);

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
      window.map.disablePage(isActivatePage, isLoad);
      openPins();
      setCoordinate(pinMainOx, pinMainOy + pinMainHeight);
    }
  });

  pinMain.focus();
  setCoordinate();

  window.pin = {
    container: pinContainer,
    successHandler,
    removeElements,
    renderElements,
    open: openPins
  };
})();
