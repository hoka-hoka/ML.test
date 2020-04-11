let guesBtnPrev = document.querySelector('.button_js-prev');
let guesBtnNext = document.querySelector('.button_js-next');
let guesValue = document.querySelectorAll('.input-options__offensive');
let guesInput = document.querySelector('.rectangle__gues .input__list');
let sum = 0;

if ( guesBtnNext ) {
  guesBtnNext.addEventListener('click', function() {
    guesValue.forEach(function(item) {
      sum += +item.innerHTML;
    });
    if ( (sum > 1) && (sum < 5) ) {
      guesInput.setAttribute('placeholder', sum + " гостя");
    } else if ( sum == 1 ) {
      guesInput.setAttribute('placeholder', sum + " гость");
    } else {
      guesInput.setAttribute('placeholder', sum + " гостей");
    }
    sum = 0;
  })
}

if ( guesBtnPrev ) {
  guesBtnPrev.addEventListener('click', function() {
    guesValue.forEach(function(item) {
      item.innerHTML = 0;
      item.previousSibling.classList.add('button__mark_default')
    });
    guesInput.setAttribute('placeholder', "Сколько гостей");
  });
}