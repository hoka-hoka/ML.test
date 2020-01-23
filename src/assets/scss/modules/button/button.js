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

let inputBtn = document.querySelectorAll('.button_popup--open');
let popup = document.querySelector('.popup');

inputBtn.forEach(function(item) {
  item.addEventListener('click', function() {
    if ( item.getAttribute('date') ) {
      popup.classList.toggle('hidden');
      let btnDate = item.getAttribute('date');
      if ( btnDate == 'date-auth' ) {
        let popupAuth = popup.querySelector('.authorization');
        let popupFocus = popupAuth.querySelector('.button_end-focus');
        popupAuth.classList.toggle('hidden');
      }
      if ( btnDate == 'date-reg' ) {
        let popupAuth = popup.querySelector('.registration');
        let popupFocus = popupAuth.querySelector('.button_end-focus');
        popupAuth.classList.toggle('hidden');
      }
    }
  });
});

let rectangleClose = document.querySelectorAll('.rectangle__close');

rectangleClose.forEach(function(item) {
  item.addEventListener('click', function() {
    popup.classList.toggle('hidden');
    if ( item.closest('.rectangle').classList.contains('authorization') ) {
      item.closest('.authorization').classList.toggle('hidden');
    }
    else {
      item.closest('.registration').classList.toggle('hidden');
    }
  });
});
