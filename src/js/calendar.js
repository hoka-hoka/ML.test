'use strict';
import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper';
import { setSiblingIteration, getSibling } from './getSibling';
Swiper.use([Navigation]);

let swiperParam = {
  slideActiveClass: "clandar__slide-active",
  observer: true,
  allowTouchMove: false, // d't move
  observeParents: true,
  observeSlideChildren: true,
  initialSlide: 1, // center slide
  navigation: {
    nextEl: '.calendar__arrow-next',
    prevEl: '.calendar__arrow-prev',
  },
}
let mainSwiper = new Swiper(".calendar__swiper-container", swiperParam);

class Calendar {
  constructor(e) {
    this.date = new Date(e);
    this.calendarBaseMonth = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    this.year = this.date.getFullYear();
    this.table = '<div class="swiper-slide"><div class="calendar__nav"><div class="calendar__month">' + this.calendarBaseMonth[this.date.getMonth()] + ' ' + this.year + '</div><table class="calendar__table"><thead class="calendar__column"><tr><th class="calendar__day">пн</th><th class="calendar__day">вт</th><th class="calendar__day">ср</th><th class="calendar__day">чт</th><th class="calendar__day">пт</th><th class="calendar__day">сб</th><th class="calendar__day">вс</th></tr></thead><tbody class="calendar__box">';
  }
  findDateBefore(iter) {
    for (let i = 0; i < iter; i++) {
      this.date.setDate(this.date.getDate() - getDay(this.date) + i); // дней до текущего
      this.table += '<td class="calendar__day-num calendar__day-other">' + this.date.getDate() + '</td>';
    }
  }
  findDateAfter() {
    this.date.setDate(this.date.getDate()+1);
    let i = 0;
    let month = this.date.getMonth();

    while (i < 5) {
      if ( month === this.date.getMonth() ) {
        if ( String(this.date) === String(new Date()) ) {
          this.table += '<td class="calendar__day-num calendar__today">' + this.date.getDate() + '</td>';
        } else {
          this.table += '<td class="calendar__day-num">' + this.date.getDate() + '</td>';
        }
      } else {
        this.table += '<td class="calendar__day-num calendar__day-other">' + this.date.getDate() + '</td>';
      }
      if (getDay(this.date) % 7 === 6) {
        this.table += '</tr><tr>';
        ++i;
      }
      this.date.setDate(this.date.getDate() + 1);
    }
    this.table += '</tr></table></div></div>';
  }
}

function getDay(date) {
  let day = date.getDay(); // получить номер дня недели, от 0 (пн) до 6 (вс)
  if (day == 0) day = 7; // сделать воскресенье (0) последним днем
  return day - 1;
}

function createCalendar(calendar) {

  let activeSwiper = calendar.querySelector('.swiper-container').swiper;
  console.log(activeSwiper);

  let date = new Date();
  date.setDate(1);
  let dateArr = [
    new Date(date.setMonth(date.getMonth()-1)),
    new Date(date.setMonth(date.getMonth()+1)),
    new Date(date.setMonth(date.getMonth()+1))
  ];

  if ( !calendar.classList.contains('hidden') ) {
    dateArr.forEach((element) => {
      createMonth(element, activeSwiper);
    });
    activeSwiper.activeIndex = 1;
    Mark();
  }
  else {
    activeSwiper.removeAllSlides();
  }
  activeSwiper.update();
}

function createMonth(date, swiper) {
  let dateCenter = new Calendar(date);
  dateCenter.findDateBefore(getDay(date));
  dateCenter.findDateAfter();
  swiper.appendSlide(dateCenter.table);
}

function Mark() {
  let table = document.querySelectorAll('.calendar__box'); // boxes cell
  let cell = document.querySelectorAll('.calendar__day-num'); // cells

  let marks = new Map([
    ['markFirst', new createMark('calendar__day-mark calendar__day-mark_1')],
    ['markLast', new createMark('calendar__day-mark calendar__day-mark_2')],
    ['markToday', new createMark('calendar__today-mark')]
  ])

  // markToday
  let tdToday = document.querySelector('.calendar__today');
  let markFirst = marks.get('markFirst');
  let markLast = marks.get('markLast');

  marks.get('markToday').moveAt(tdToday);

  for (let i in cell) {
    if ( cell[i] === tdToday ) {
      markFirst.moveAt(cell[i]);
      markLast.moveAt(cell[+i+1]);
    }
  }
  for (let val of table) {
    val.onmousedown = function() {
      if ( event.target.contains(markFirst.mark) ) {
        markFirst.i = 1;
        markLast.i = 0;
      } else if ( event.target.contains(markLast.mark) ) {
        markFirst.i = 0;
        markLast.i = 1;
      }
      markFirst.i ? markFirst.markFullStack(event.target) :  markLast.markFullStack(event.target);
    }
  }
}
class createMark {
  constructor(name) {
    this.today = document.querySelector('.calendar__today');
    this.mark = document.createElement('span');
    this.mark.className = name;
    this.prev = 0;
  }
  moveAt(td) {
    if ( td.nodeName === 'TD' ) {
      let a = this.today.compareDocumentPosition(td);
      if ( a & 2 || td.classList.contains('calendar__day-other') ) { // the border track
        return;
      }
      td.classList.add('calendar__day_active');
      if ( this.prev && td !== this.prev ) {
        if ( ( this.prev.childNodes.length === 2 ) || ( this.prev === this.today && this.prev.childNodes.length !== 4 ) ) {
          this.prev.classList.remove('calendar__day_active');
        }
      }
      this.prev = td;
      td.appendChild(this.mark);
      this.mark.style.top = td.offsetTop + 'px';
      this.mark.style.left = td.offsetLeft + 'px';
      createTrack('calendar__day_active');
    }
  }
  pullOf() {
    document.onmousemove = () => {
      this.moveAt(event.target);
    }
  }
  reload() {
    document.onmouseup = () => {
      document.onmousemove = null;
      this.mark.onmouseup = null;
    }
    document.ondragstart = () => {
      return false;
    }
  }
   markFullStack(td) {
    this.pullOf();
    this.moveAt(td);
    this.reload();
  }
}

function createTrack(find) {
  let cells = document.querySelectorAll('.calendar__day-num');
  let cellFind = [];
  let borderRs = document.querySelectorAll('.calendar__day_bd--left, .calendar__day_bd--right');
  if ( borderRs.length ) {
    borderRs[0].classList.remove('calendar__day_bd--left');
    borderRs[1].classList.remove('calendar__day_bd--right');
  }
  let cellActive = document.querySelectorAll('.calendar__day_track');
  if ( cellActive.length ) {
    for ( let val of cellActive ) {
      val.classList.remove('calendar__day_track');
    }
  }
  [...cells].findIndex((element,index)=>{
    if (element.classList.contains(find)) {
      cellFind.push(index);
    }
  });
  var trackElements = [...cells].slice(cellFind[0], cellFind[cellFind.length-1]+1);
  if ( trackElements.length >= 2 ) {
    trackElements[0].classList.add('calendar__day_bd--left');
    trackElements[trackElements.length-1].classList.add('calendar__day_bd--right');
  }
  for ( let val of trackElements ) {
    if ( !val.classList.contains('calendar__day-other') ) {
      val.classList.add('calendar__day_track');
    }
  }
};


export { createCalendar };