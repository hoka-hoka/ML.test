import './calendar.scss';
import Sibling from '../../common/Sibling';
import Calendar from '../../common/Calendar';
import { calendar } from '../../js/constants';

const calendars = $('.calendar');
if (calendars.length) {
  calendars.each((_, calendar) => {
    new Calendar(calendar);
  });
}

const calendarDay = document.querySelectorAll('.input-date_js');
const btn = document.querySelectorAll('.calendar .button_purple');

if (document.body.id === 'form') {
  let calendar = document.querySelector(
    '.uikit-forms__calendar_create-js>.calendar',
  );
  if (calendar) {
    calendar.style.display = 'block';
    new Calendar(calendar);
  }
}

if (btn.length) {
  btn[0].addEventListener('click', (event) => {
    clearDate(calendarDay);
  });

  btn[1].addEventListener('click', (event) => {
    clearDate(calendarDay);
    let tdActive = document.querySelectorAll(
      '.calendar__day-num.calendar__day-num_active',
    );
    tdActive.forEach((v, i, arr) => {
      let checkDate = Sibling.getOlderSibling({
        iter: 4,
        $elem: $(v),
        find: 'calendar__month',
      });
      if (!checkDate) {
        return;
      }
      checkDate = checkDate.get(0).innerHTML.split(' ');
      let day = new Date(
        checkDate[1],
        calendar.months.indexOf(checkDate[0]),
        v.innerText,
      );
      if (calendarDay.length !== 1) {
        if (arr.length === 1) {
          [...calendarDay].map((num) => {
            return (num.value = day
              .toLocaleString('ru')
              .slice(0, 10)
              .split('.')
              .reverse()
              .join('-'));
          });
        } else {
          console.log();
          calendarDay[i].querySelector(
            '.input__field',
          ).value = day
            .toLocaleString('ru')
            .slice(0, 10)
            .split('.')
            .reverse()
            .join('-');
        }
      } else {
        calendarDay[0].querySelector('.input__field').value += `${
          v.innerText
        } ${checkDate[0].slice(0, 3)}. ${
          i == 0 && arr.length !== 1 ? '- ' : ''
        }`;
      }
    });
    closeCalendar(event);
  });
}

function closeCalendar(event) {
  let eventTarget = event.target
    .closest('.calendar')
    .parentNode.querySelectorAll('.button_clicked-js');
  if (eventTarget.length) {
    let eventArrow = new Event('click');
    eventTarget[0].dispatchEvent(eventArrow);
  }
}

function clearDate(num) {
  for (let elem of num) {
    const field = elem.querySelector('.input__field');
    if (!field) {
      return;
    }
    field.value = '';
  }
}
