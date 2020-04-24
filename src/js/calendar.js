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
        this.table += '<td class="calendar__day-num calendar__today">' + this.date.getDate() + '</td>';
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
    Mark();
  }
}


function Mark() {
  let table = document.querySelectorAll('.calendar__box');
  var mark1 = document.createElement('span');
  var mark2 = mark1.cloneNode(false);

  var mark3 = document.createElement('span');

  mark1.className = 'calendar__day-mark calendar__day-mark_1';
  mark2.className = 'calendar__day-mark calendar__day-mark_2';
  mark3.className = 'calendar__today-mark';

  var markFirst = new createMark('', 1, mark1);
  var markLast = new createMark('', 0, mark2);

  let dayToday = document.querySelector('.calendar__today');
  dayToday.appendChild(mark3);
  mark3.style.top = dayToday.offsetTop + 'px';
  mark3.style.left = dayToday.offsetLeft + 'px';

  markFirst.moveAt(dayToday.nextElementSibling, mark1);
  markLast.moveAt(dayToday.nextElementSibling.nextElementSibling, mark2);

  for (let val of table) {
    val.onmousedown = function() {
      if ( event.target.contains(mark1) ) {
        markFirst.i = 1;
        markLast.i = 0;
      } else if ( event.target.contains(mark2) ) {
        markFirst.i = 0;
        markLast.i = 1;
      }

      markFirst.i ? markFirst.markFullStack(event.target) : markLast.markFullStack(event.target);
    }
  }
}


class createMark {
  constructor(p, i, m) {
    this.prev = p;
    this.mark = m;
    this.i = i;
  }
  markFullStack(td) {
    this.pullOf();
    this.moveAt(td);
    this.reload();
  }
}
createMark.prototype.moveAt = function(td) {



  if ( td.classList.contains('calendar__day-num') ) {

    if ( td.firstElementChild ) {
      for ( let val of td.children ) {
        if ( val.closest('.calendar__day-mark') ) return;
      }
    }

    td.appendChild(this.mark);
    this.mark.style.top = td.offsetTop + 'px';
    this.mark.style.left = td.offsetLeft + 'px';

    if ( !td.closest('calendar__day_active') ) {
      td.classList.add('calendar__day_active');
      if ( this.prev != 0 && this.prev != td ) {
        this.prev.classList.remove('calendar__day_active');
      }
      this.prev = td;
    }
  }
  createTrack('calendar__day_active');


}

createMark.prototype.pullOf = function() {
  let self = this;
  document.onmousemove = function() {
    self.moveAt(event.target);
  }
}
createMark.prototype.reload = function() {
  let self = this;
  document.onmouseup = function() {
    document.onmousemove = null;
    self.mark.onmouseup = null;
  }
  document.ondragstart = function() {
    return false;
  }
}


function createTrack(find) {
  let cell = document.querySelectorAll('.calendar__day-num');
  let cellArr = Array.prototype.slice.call(cell,0);
  let cellFind = [];
  let cellActive = document.querySelectorAll('.calendar__day_track');
  let trackElementsOld = document.querySelectorAll(find);
  let borderRs = document.querySelectorAll('.calendar__day_bd--left, .calendar__day_bd--right');
  if ( borderRs.length ) {
    borderRs[0].classList.remove('calendar__day_bd--left');
    borderRs[1].classList.remove('calendar__day_bd--right');
  }
  if ( cellActive.length ) {
    for ( let val of cellActive ) {
      val.classList.remove('calendar__day_track');
    }
  }
  cellArr.findIndex((element,index)=>{
    if (element.classList.contains(find)) {
      cellFind.push(index);
    }
  });
  var trackElements = cellArr.slice(cellFind[0], cellFind[cellFind.length-1]+1);
  if ( trackElements.length >= 2 ) {
    trackElements[0].classList.add('calendar__day_bd--left');
    trackElements[trackElements.length-1].classList.add('calendar__day_bd--right');
  }
  for ( let val of trackElements ) {
    val.classList.add('calendar__day_track');
  }
};


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