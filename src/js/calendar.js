'use strict';
import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper/js/swiper.esm.js';
import { setSiblingIteration, getSibling } from './getSibling';
Swiper.use([Navigation]);

let swiperParam = {
  slideActiveClass: "clandar__slide-active",
  observer: true,
  allowTouchMove: false, // d't move
  observeParents: true,
  observeSlideChildren: true,
  navigation: {
        nextEl: '.calendar__arrow-next',
        prevEl: '.calendar__arrow-prev',
    },
}
let mainSwiper = new Swiper(".calendar__swiper-container", swiperParam);
let calendar = document.querySelector('.calendar');

function markCalendar(e) {
  let calendarBaseMonth = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  this.date = new Date(e);
  this.year = this.date.getFullYear();
  this.table = '<div class="swiper-slide"><div class="calendar__nav"><div class="calendar__month">' + calendarBaseMonth[this.date.getMonth()] + ' ' + this.year + '</div><table class="calendar__table"><thead class="calendar__column"><tr><th class="calendar__day">пн</th><th class="calendar__day">вт</th><th class="calendar__day">ср</th><th class="calendar__day">чт</th><th class="calendar__day">пт</th><th class="calendar__day">сб</th><th class="calendar__day">вс</th></tr></thead><tbody class="calendar__box">';
}
markCalendar.prototype.findDateBefore = function(iter){
  for (let i = 0; i < iter; i++) {
    this.date.setDate(this.date.getDate() - getDay(this.date) + i); // дней до текущего
    this.table += '<td class="calendar__day-num calendar__day-other">' + this.date.getDate() + '</td>';
  }
}
markCalendar.prototype.findDateAfter = function() {
  this.date.setDate(this.date.getDate()+1);
  let i = 0;
  let month = this.date.getMonth();

  while (i < 5) {
    if ( month == this.date.getMonth() ) {
      if ( String(this.date) == String(new Date()) ) {
        this.table += '<td class="calendar__day-num calendar__day-today">' + this.date.getDate() + '</td>';
      } else {
        this.table += '<td class="calendar__day-num">' + this.date.getDate() + '</td>';
      }
    } else {
      this.table += '<td class="calendar__day-num calendar__day-other">' + this.date.getDate() + '</td>';
    }
    if (getDay(this.date) % 7 == 6) {
      this.table += '</tr><tr>';
      ++i;
    }
    this.date.setDate(this.date.getDate() + 1);
  }
  this.table += '</tr></table></div></div>';
}
function getDay(date) {
  let day = date.getDay(); // получить номер дня недели, от 0 (пн) до 6 (вс)
  if (day == 0) day = 7; // сделать воскресенье (0) последним днем
  return day - 1;
}
class listEvents {
  constructor(name) {
    this.add = name;
  }
  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method]();
  }
  onClick() {

    createCalendar(this.add);
    this.table = document.querySelectorAll('.calendar__box');
    this.table.forEach(element => {
      element.addEventListener('mousedown', new listEvents());
    });
  }
  onMousedown() {
    let td = event.target.closest('td');
    if (!td) return;


  }
}


function dropDownCalendar(elem, add) {
  elem.forEach(function(item) {
    item.addEventListener('click', new listEvents(add));
  });
}

function createCalendar(add) {
  let calendar = setSiblingIteration(10, event.toElement, 'calendar');
  let calendarStart = calendar.querySelector(add);
  let date = new Date();
  date.setDate(1);
  let dateArr = [new Date(date.setMonth(date.getMonth()-1)), new Date(date.setMonth(date.getMonth()+1)), new Date(date.setMonth(date.getMonth()+1))];
  if ( !calendar.classList.contains('hidden') ) {
    dateArr.forEach((element,index) => {
      createMonth(element, index);
    });
  }
  else {
    mainSwiper.removeAllSlides();
    mainSwiper.update();
  }
}

function createMonth(d, i) {
  let dateCenter = new markCalendar(d);
  dateCenter.findDateBefore(getDay(d));
  dateCenter.findDateAfter();
  !i ? mainSwiper.appendSlide(dateCenter.table) : mainSwiper.prependSlide(dateCenter.table);
  mainSwiper.update();
}

export { dropDownCalendar };