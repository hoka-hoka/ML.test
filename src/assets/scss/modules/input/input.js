

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
      let inputDropDown = item.closest(".input");
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
      dropDownCalendar.prototype.inutDrop = item.closest(".input");
    });
  });
}

function dropDownGueses(obj) {
  obj.forEach(function(item) {
    item.addEventListener('click', function() {
      let drop = item.closest('.input__box').querySelector('.input-options');
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





let guesBtnPrev = document.querySelector('.button_js-prev');
let guesBtnNext = document.querySelector('.button_js-next');
let guesValue = document.querySelectorAll('.input-options__offensive');
let guesInput = document.querySelector('.rectangle__gues .input__list');
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
    item.previousSibling.classList.add('button__mark_default')
  });
  guesInput.setAttribute('placeholder', "Сколько гостей");
});