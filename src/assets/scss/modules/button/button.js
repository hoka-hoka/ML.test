let buttonMarks = document.querySelectorAll('.button__mark');

function guesStatus(obj) {
  obj.forEach(function(item) {
    item.addEventListener('click', function() {
      let buttonPar = item.closest('.input-options__marks');
      let guesValue = buttonPar.querySelector('.input-options__offensive');
      let guesPrev = buttonPar.querySelector('.button__mark_minus');
      let guesNext = buttonPar.querySelector('.button__mark_plus');
      item == guesNext ?
      guesValue.innerText = +guesValue.innerText + 1 : +guesValue.innerText >= 1 ?
      guesValue.innerText = +guesValue.innerText - 1: guesValue.innerText;
      +guesValue.innerText ? guesPrev.classList.remove('button__mark_default') : guesPrev.classList.add('button__mark_default');
    });
  });
}
let drop3 = new guesStatus(buttonMarks);