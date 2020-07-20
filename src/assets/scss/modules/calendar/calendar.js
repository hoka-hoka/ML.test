import { createCalendar } from '../../../../js/calendar';
import { setSiblingIteration, getSibling } from '../../../../js/getSibling';

const month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const calendarBtn = document.querySelectorAll('.input-date+.button');
const calendarDay = document.querySelectorAll('.input-date');
const btn = document.querySelectorAll('.calendar .button');

if ( document.body.id === 'index' || document.body.id === 'details' || document.body.id === 'product') {
  dateFormat();
}

function dateFormat() {
  for ( let i of calendarBtn ) {
    i.addEventListener('click', () => {
      createCalendar();
    });
  }
}

function closeCalendar() {
  let eventArrow = new Event('click');
  let eventTarget = event.target.closest('.rectangle__list').querySelector('.js--click');
  eventTarget.dispatchEvent(eventArrow);
}

function clearDate(num) {
  for ( let elem of num ) {
    elem.value = '';
  }
}

btn[0].addEventListener('click', event => {
  clearDate(calendarDay);
});

btn[1].addEventListener('click', event => {
  clearDate(calendarDay);
  let tdActive = document.querySelectorAll('.calendar__day-num.calendar__day_active');
  tdActive.forEach((v,i,arr) => {
    let checkDate = setSiblingIteration(4, v, 'calendar__month').innerHTML.split(' ');
    let day = new Date(checkDate[1], month.indexOf(checkDate[0]), v.innerText);

    if ( calendarDay.length !== 1 ) {
      if ( arr.length === 1) {
        [...calendarDay].map(num => { return num.value = day.toLocaleString("ru").slice(0,10).split('.').reverse().join('-') });
      } else {
        calendarDay[i].value = day.toLocaleString("ru").slice(0,10).split('.').reverse().join('-');
      }
    } else {
      calendarDay[0].value += `${v.innerText} ${checkDate[0].slice(0,3)}. ${i==0 && arr.length !== 1 ? '- ':''}` ;
    }
  });
  closeCalendar();
});
