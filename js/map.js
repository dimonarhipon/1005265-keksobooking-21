'use strict';

(function () {
  const map = document.querySelector(`.map`);


  const toggleState = (state = true) => {
    map.classList.add(`map--faded`);
    window.form.container.classList.add(`ad-form--disabled`);

    if (!state) {
      map.classList.remove(`map--faded`);
      window.form.container.classList.remove(`ad-form--disabled`);
    }
    window.form.fieldsets.map((item) => (item.disabled = state));
    window.mapFilter.fieldsets.map((item) => (item.disabled = state));
    window.mapFilter.selects.map((item) => (item.disabled = state));
  };

  window.map = {
    workSpace: map,
    toggleState,
  };
})();
