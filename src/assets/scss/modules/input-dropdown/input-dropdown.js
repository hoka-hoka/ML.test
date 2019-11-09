

import { mainSwiper, month, createCalendar, getDay } from '../calendar/calendar';

let rectangle = document.querySelector('.rectangle');
let dropDownList = rectangle.querySelectorAll('.input-dropdown__list');
let dropDownArrow = rectangle.querySelectorAll('.arrow.input-dropdown__arrow');
let calendar = rectangle.querySelector('.calendar');
let calendarSwiperWrapper = document.querySelector('.swiper-wrapper');
let dropDownClick = "";

function dropDown(obj) {
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


      } else if ( typeof dropDown.prototype.inutDrop != "undefined" ) { // add hidden
        if ( inputDropDown == dropDown.prototype.inutDrop) {
          calendarWay.classList.add("hidden");

          let calendarNav = document.querySelectorAll('.swiper-slide');
          calendarNav.forEach(function(item) {
            item.remove();
          });

        }
      }
      dropDown.prototype.inutDrop = item.closest(".input-dropdown");


    });
  });
}
let drop1 = new dropDown(dropDownList);
let drop2 = new dropDown(dropDownArrow);