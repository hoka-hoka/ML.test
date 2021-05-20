import './calendar.scss';
import Sibling from '../../common/Sibling';
import Calendar from '../../common/Calendar';

const calendars = document.querySelectorAll('.calendar');

if (calendars.length) {
  calendars.forEach((calendar) => {
    const btns = calendar.querySelectorAll('.button_purple');
    const fields = Sibling.getOlderSibling({
      iter: 2,
      $elem: $(calendar),
      find: 'input__field',
    });
    const dateFields = $.makeArray(fields);
    const mainCalendar = new Calendar(calendar, {
      dateFields,
      btnClear: btns[0],
      bntApply: btns[1],
      trigger: dateFields[0]
        ? dateFields[0]
            .closest('.input-date__field_js')
            .querySelector('.button_clicked-js')
        : undefined,
    });
  });
}

// if (document.body.id === 'form') {
//   let calendar = document.querySelector(
//     '.uikit-forms__calendar_create-js>.calendar',
//   );
//   if (calendar) {
//     calendar.style.display = 'block';
//     mainCalendar.initCalendar(calendar);
//   }
// }

// calendarDay[0].querySelector('.input__field').value += `${
//   v.innerText
// } ${checkDate[0].slice(0, 3)}. ${
//   i == 0 && arr.length !== 1 ? '- ' : ''
// }`;
