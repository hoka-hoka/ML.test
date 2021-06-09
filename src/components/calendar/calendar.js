import './calendar.scss';
import Sibling from '../../common/Sibling';
import Calendar from '../../common/Calendar';

const calendars = document.querySelectorAll('.calendar');

const createCalendar = (calendar) => {
  const btns = calendar.querySelectorAll('.button_purple');
  const fields = Sibling.getOlderSibling({
    iter: 2,
    $elem: $(calendar),
    find: 'input__field',
  });
  const dateFields = $.makeArray(fields);
  const rezult = new Calendar(calendar, {
    dateFields,
    btnClear: btns[0],
    bntApply: btns[1],
    trigger: dateFields[0]
      ? dateFields[0].closest('.input-date__field_js')
      : undefined,
  });
  return rezult;
};

if (calendars.length) {
  calendars.forEach((calendar) => {
    const newCalendar = createCalendar(calendar);

    const $triggers = $(calendar).parent().find('.input-date__field_js');
    if (!$triggers.length) {
      return;
    }
    $triggers.on('click', (event) => {
      const active = $(event.target).data('trigger');
      newCalendar.updateCalendar({ activeField: active });
    });
  });
}
