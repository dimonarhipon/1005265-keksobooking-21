'use strict';

(function () {
  const LIMIT_TOP = 170;
  const LIMIT_BOTTOM = 620;
  const LIMIT_LEFT = -32;
  const LIMIT_RIGHT = 1168;

  window.pinContainer = window.map.workSpace.querySelector(`.map__pins`);
  const pinMain = window.map.workSpace.querySelector(`.map__pin--main`);

  const pinMainWidth = Math.floor(pinMain.offsetWidth / 2);
  const pinMainHeight = Math.floor(pinMain.offsetHeight / 2);

  const pinMainOx = pinMain.offsetLeft + pinMainWidth;
  const pinMainOy = pinMain.offsetTop + pinMainHeight;

  pinMain.focus();

  const setCoordinate = (x = pinMainOx, y = pinMainOy) => {
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    window.form.address.value = `${x}, ${y}`;
  };
  setCoordinate();


  pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    window.backend.load(window.util.successHandler, window.util.errorHandler);

    setCoordinate(pinMainOx, pinMainOy + pinMainHeight);
    if (evt.button === 0) {
      window.map.toggleState(false);
    }

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
  });

  pinMain.addEventListener(`keydown`, (evt) => {
    setCoordinate(pinMainOx, pinMainOy + pinMainHeight);
    if (evt.key === `Enter`) {
      window.toggleState(false);
    }
  });

})();
