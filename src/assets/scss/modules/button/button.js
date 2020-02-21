let buttonMarks = document.querySelectorAll('.button__mark');
let guesName = [
  ['спальня', 'спальни', 'спален'],
  ['кровать', 'кровати', 'кроватей'],
  ['вання комната', 'ванные комнаты', 'ванных комнат']
];
function guesStatus(obj) {
  obj.forEach(function(item) {
    item.addEventListener('click', function() {
      let buttonPar = item.parentNode;
      let guesValue = buttonPar.querySelector('.input-options__offensive');
      let guesPrev = buttonPar.querySelector('.button__mark_minus');
      if ( item.classList.contains('button__mark_plus') ) {
        guesValue.innerText = +guesValue.innerText + 1;
        guesPrev.classList.remove('button__mark_default');
      } else if ( +guesValue.innerText != 0 ){
        guesValue.innerText = +guesValue.innerText - 1
      }
      +guesValue.innerText ? guesPrev.classList.remove('button__mark_default') : guesPrev.classList.add('button__mark_default');
      if ( !item.closest('.input-options').querySelector('.input__btns') ) {
        let guesElem = buttonPar.closest('.input-options').querySelectorAll('.input-options__offensive');
        let guesText = [];
        guesElem.forEach(function(item, i) {
          guesText[i] = +item.innerText;
        });
        guesText = Vocabulary(guesText);
        guesTitle = guesText.slice();
        if ( guesText.length == 3 ) {
          guesText[2] = '...';
        }
        let guesCheck = item.closest('.input-options').previousElementSibling.firstElementChild;
        guesCheck.value = guesText.join(', ');
        guesCheck.title = guesTitle.join(', ');
      }
    });
  });
}
function Vocabulary(arr) {
  let guesAnswer = [];
  arr.forEach(function(item, i) {
    switch(item) {
      case 0: break;
      case 1: guesAnswer[i] = item + ' ' + guesName[i][0]; break;
      case 2:
      case 3:
      case 4: guesAnswer[i] = item + ' ' + guesName[i][1]; break;
      default: guesAnswer[i] = item + ' ' + guesName[i][2];
    }
  });
  guesAnswer = guesAnswer.filter(word => word !== undefined);
  return guesAnswer;
}

guesStatus(buttonMarks);

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
