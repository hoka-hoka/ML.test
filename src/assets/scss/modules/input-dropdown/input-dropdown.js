

import { mainSwiper, month, createCalendar, getDay } from '../calendar/calendar';

let rectangle = document.querySelector('.rectangle');

let dropDownDate = rectangle.querySelectorAll('.rectangle__date_js_click');
let dropDownGues = rectangle.querySelectorAll('.rectangle__gues_js_click');


let calendar = rectangle.querySelector('.calendar');
let calendarSwiperWrapper = document.querySelector('.calendar__swiper-container .swiper-wrapper');

let dropDownClick = "";

function dropDownCalendar(obj) {
  obj.forEach(function(item) {
    item.addEventListener('click', function() {
      let calendarWay = item.closest(".rectangle").querySelector('.calendar');
      let inputDropDown = item.closest(".input-dropdown");
      if ( calendarWay.classList.contains("hidden") ) { // remove hidden
        calendarWay.classList.remove("hidden");
        for (var i = 0; i < 3; ++i) {
          if ( month > 11 ) {
            month = 0;
          }
          if ( i == 0 ) {
            calendarSwiperWrapper.innerHTML += createCalendar(calendarSwiperWrapper, 2019, month);
            mainSwiper.update();
          }
          if ( i == 1 ) {
            mainSwiper.appendSlide(createCalendar(calendarSwiperWrapper, 2019, month+1));
            mainSwiper.update();
          }
          if ( i == 2 ) {
            mainSwiper.prependSlide(createCalendar(calendarSwiperWrapper, 2019, month-1));
            mainSwiper.update();
          }
        }
      } else if ( typeof dropDownCalendar.prototype.inutDrop != "undefined" ) { // add hidden
        if ( inputDropDown == dropDownCalendar.prototype.inutDrop) {
          calendarWay.classList.add("hidden");
          let calendarNav = document.querySelectorAll('.calendar__swiper-container .swiper-slide');
          calendarNav.forEach(function(item) {
            item.remove();
          });
        }
      }
      dropDownCalendar.prototype.inutDrop = item.closest(".input-dropdown");
    });
  });
}

function dropDownGueses(obj) {
  obj.forEach(function(item) {
    item.addEventListener('click', function() {
      let drop = item.closest('.input-dropdown__box').querySelector('.input-dropdown__options');
      if ( drop.classList.contains('hidden') ) {
        drop.classList.remove('hidden')
      } else {
        drop.classList.add('hidden');
      }
    });
  });
}
let drop1 = new dropDownCalendar(dropDownDate);
let drop2 = new dropDownGueses(dropDownGues);

let dropDownMinus = document.querySelectorAll('.input-dropdown__mark-sign');

// .input-dropdown__mark-sign_active

function guesStatus(obj) {
  obj.forEach(function(item) {
    item.addEventListener('click', function() {

      if ( item.classList.contains('input-dropdown__mark-sign_minus') ) {
        let guesValue = item.closest('.input-dropdown__marks').querySelector('.input-dropdown__offensive');
        if ( guesValue.innerHTML == "1" ) {
          if ( !item.classList.contains('input-dropdown__mark-sign_active') ) {
            guesValue.innerHTML = (+guesValue.innerHTML - 1) + "";
            item.classList.add('input-dropdown__mark-sign_active')
          }
        } else if ( guesValue.innerHTML > "0" ){
          guesValue.innerHTML = (+guesValue.innerHTML - 1) + "";
        }
      } else {
        let guesValue = item.closest('.input-dropdown__marks').querySelector('.input-dropdown__offensive');
        let guesMinus = item.closest('.input-dropdown__marks').querySelector('.input-dropdown__mark-sign_minus');
        if ( guesValue.innerHTML == "0" ) {
          if ( guesMinus.classList.contains('input-dropdown__mark-sign_active') ) {
            guesMinus.classList.remove('input-dropdown__mark-sign_active');
            guesValue.innerHTML = (+guesValue.innerHTML + 1) + "";
          }
        } else {
          guesValue.innerHTML = (+guesValue.innerHTML + 1) + "";
        }
      }
    });
  });
}

let drop3 = new guesStatus(dropDownMinus);

let guesBtnPrev = document.querySelector('.button_js-prev');
let guesBtnNext = document.querySelector('.button_js-next');
let guesValue = document.querySelectorAll('.input-dropdown__offensive');
let guesInput = document.querySelector('.rectangle__gues .input-dropdown__list');
let sum = 0;

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

guesBtnPrev.addEventListener('click', function() {
  guesValue.forEach(function(item) {
    item.innerHTML = 0;
    item.previousSibling.classList.add('input-dropdown__mark-sign_active')
  });
  guesInput.setAttribute('placeholder', "Сколько гостей");
});