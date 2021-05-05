(function () {
  'use strict';
  let supportsMultiple =
    self.HTMLInputElement && 'valueLow' in HTMLInputElement.prototype;
  let descriptor = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value',
  );

  let multirange = function (input, price, num) {
    if (supportsMultiple || input.classList.contains('multirange')) {
      return;
    }
    let inputClass = input.className;
    let value = input.getAttribute('value'); // "10,80"
    let values = value === null ? [] : value.split(','); // ["10", "80"]
    let min = +(input.min || 0);
    let max = +(input.max || 100);
    let ghost = input.cloneNode(); // deep = true
    let divRange = document.createElement('div');
    divRange.className = 'input-range__band';

    input.classList.add(inputClass + '_multirange', inputClass + '_original');
    ghost.classList.add(inputClass + '_multirange', inputClass + '_ghost');

    input.value = values[0] || min + (max - min) / 2;
    ghost.value = values[1] || min + (max - min) / 2;
    input.after(divRange, ghost);

    Object.defineProperty(
      input,
      'originalValue',
      descriptor.get
        ? descriptor
        : {
            get: function () {
              return this.value;
            },
            set: function (v) {
              this.value = v;
            },
          },
    );

    Object.defineProperties(input, {
      valueLow: {
        get: function () {
          return Math.min(this.originalValue, ghost.value);
        },
        set: function (v) {
          this.originalValue = v;
        },
        enumerable: true,
      },
      valueHigh: {
        get: function () {
          return Math.max(this.originalValue, ghost.value);
        },
        set: function (v) {
          ghost.value = v;
        },
        enumerable: true,
      },
    });

    if (typeof input.oninput === 'function') {
      ghost.oninput = input.oninput.bind(input);
    }
    function update() {
      let minProc = 100 * ((input.valueLow - min) / (max - min)) + '%';

      let maxProc = 100 * ((input.valueHigh - min) / (max - min)) + '%';
      divRange.style.setProperty(
        '--start',
        100 * ((input.valueLow - min) / (max - min)) + '%',
      );
      divRange.style.setProperty(
        '--stop',
        100 * ((input.valueHigh - min) / (max - min)) + '%',
      );
      if (price) {
        const minPrice =
          Math.round((minProc.slice(0, -1) * num) / 100 / 1000) * 1000;
        const maxPrice =
          Math.round((maxProc.slice(0, -1) * num) / 100 / 1000) * 1000;
        price.innerText =
          minPrice.toLocaleString('ru-RU') +
          '₽ - ' +
          maxPrice.toLocaleString('ru-RU') +
          '₽';
      }
    }
    input.addEventListener('input', update);
    ghost.addEventListener('input', update);
    update();
  };

  multirange.init = function () {
    [].slice
      .call(
        document.querySelectorAll(
          'input[type=range][multiple]:not(.multirange)',
        ),
      )
      .forEach(multirange);
  };
  if (typeof module === 'undefined') {
    self.multirange = multirange;
    if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', multirange.init);
    } else {
      multirange.init();
    }
  } else {
    module.exports = multirange;
  }
})();
