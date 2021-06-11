import CalendarDOM from './CalendarDOM';
import Mark from './Mark';
import Sibling from '../Sibling';
import moment from 'moment';
import { calendar } from '../../js/constants';

export default class Calendar {
  constructor(calendar, options = { dateFields, btnClear, bntApply, trigger }) {
    if (!calendar) {
      console.error('узел календаря не передан в класс Calendar');
    }
    this.calendar = calendar;
    this.options = { ...options };
    this.cont = calendar.querySelector('.swiper-container');
    this.swiper = this.cont.swiper;

    this.initCalendar();
    this.updateCalendar();
  }

  initCalendar = () => {
    const { btnClear, bntApply } = this.options;
    this.createCalendar();
    this.createMarks();
    if (btnClear) {
      btnClear.addEventListener('click', this.clearDate);
    }
    if (bntApply) {
      bntApply.addEventListener('click', () => {
        this.applyDate();
        this.closeCalendar();
      });
    }
  };

  dateFormatting = (date, format = 'DD.MM.YYYY') => {
    if (!date) {
      return;
    }
    moment.locale('ru');
    const rezult = moment(date).format(format);
    return rezult;
  };

  getFieldDates = () => {
    const { dateFields = [] } = this.options;

    if (!dateFields[0]) {
      return [new Date(), new Date()];
    }

    const defFirstDate = dateFields[0].dataset.dateIso;
    const defSecondDate = dateFields[1].dataset.dateIso;

    if (!defFirstDate) {
      dateFields[0].value = '';
    }
    if (!defSecondDate) {
      dateFields[1].value = '';
    }

    if (dateFields[0].dataset.dateFormat == 'DD MMM' && defFirstDate) {
      dateFields[0].value = `${this.dateFormatting(
        defFirstDate,
        dateFields[0].dataset.dateFormat,
      )} - ${this.dateFormatting(
        defSecondDate,
        dateFields[1].dataset.dateFormat,
      )}`;
    } else {
      if (defFirstDate) {
        dateFields[0].value = this.dateFormatting(
          defFirstDate,
          dateFields[0].dataset.dateFormat,
        );
      }
      if (defSecondDate) {
        dateFields[1].value = this.dateFormatting(
          defSecondDate,
          dateFields[1].dataset.dateFormat,
        );
      }
    }

    const firstDate = defFirstDate
      ? new Date(defFirstDate)
      : defSecondDate
      ? new Date(defSecondDate)
      : new Date();

    const secondDate = defSecondDate
      ? new Date(defSecondDate)
      : defFirstDate
      ? new Date(defFirstDate)
      : new Date();

    return [firstDate, secondDate];
  };

  createCalendar = () => {
    const [firstDate] = this.getFieldDates();
    const dateArr = [];
    for (let i = 0; i < 12; ++i) {
      dateArr.push(new Date(firstDate.getFullYear(), i, '1'));
    }
    dateArr.forEach((date) => {
      this.swiper.appendSlide(new CalendarDOM(date).table);
    });
  };

  initMarks = (fieldNumber = 0) => {
    const { cont, marks } = this;
    const [firstDate, secondDate] = this.getFieldDates();

    const findCell = (date) => {
      const monthNode = cont.querySelectorAll('.swiper-slide')[date.getMonth()];
      const cells = monthNode.querySelectorAll('td:not(.calendar__day-other)');
      const rezult = [...cells].find((td) => td.innerText == date.getDate());
      return rezult;
    };

    let tdToday = cont.querySelector('.calendar__day-num_current');
    if (tdToday) {
      marks.today.moveAt(tdToday);
    }

    const firstTD = findCell(firstDate);
    marks.first.moveAt(firstTD);

    const secondTD = findCell(secondDate);
    marks.second.moveAt(secondTD);

    if (fieldNumber) {
      this.swiper.activeIndex = secondDate.getMonth();
    } else {
      this.swiper.activeIndex = firstDate.getMonth();
    }
    this.swiper.update();
  };

  createMarks = () => {
    const { cont } = this;
    this.marks = {
      today: new Mark('calendar__today-mark'),
      first: new Mark('calendar__day-mark', cont, this.applyDate),
      second: new Mark('calendar__day-mark', cont, this.applyDate),
    };
  };

  updateCalendar = ({ activeField } = { activeField: 0 }) => {
    const { cont, marks } = this;
    const fieldNumber = activeField;

    let table = cont.querySelectorAll('.calendar__box'); // boxes cell
    this.initMarks(fieldNumber);

    for (let val of table) {
      if (fieldNumber) {
        marks.first.i = 0;
        marks.second.i = 1;
      } else {
        marks.first.i = 1;
        marks.second.i = 0;
      }

      val.onmousedown = function (event) {
        if (event.target.contains(marks.first.mark)) {
          marks.first.i = 1;
          marks.second.i = 0;
        } else if (event.target.contains(marks.second.mark)) {
          marks.first.i = 0;
          marks.second.i = 1;
        }

        marks.first.i
          ? marks.first.markFullStack(event.target)
          : marks.second.markFullStack(event.target);
      };
    }
  };

  closeCalendar = () => {
    const { trigger } = this.options;
    if (!trigger) {
      return;
    }
    const e = new Event('click');
    trigger.dispatchEvent(e);
  };

  applyDate = () => {
    const {
      marks: { first, second },
    } = this;
    const { dateFields = [] } = this.options;

    const getDate = (mark) => {
      if (!mark) {
        return;
      }

      const title = Sibling.getOlderSibling({
        iter: 4,
        $elem: $(mark),
        find: 'calendar__month',
      });

      if (!title) {
        return;
      }

      let [monthText, year] = title.get(0).innerHTML.split(' ');
      if (!monthText && !year) {
        return;
      }
      let month = calendar.months.indexOf(monthText);

      if (mark.classList.contains('calendar__day-before')) {
        month = calendar.months.indexOf(monthText) - 1;
      } else if (mark.classList.contains('calendar__day-after')) {
        month = calendar.months.indexOf(monthText) + 1;
      }

      return new Date(year, month, mark.innerText);
    };

    let [start = '', end = ''] =
      second.day.compareDocumentPosition(first.day) == 2
        ? [getDate(first.day), getDate(second.day)]
        : [getDate(second.day), getDate(first.day)];

    if (dateFields[0]) {
      dateFields[0].dataset.dateIso = `${start.getFullYear()}-${(
        '0' +
        (start.getMonth() + 1)
      ).slice(-2)}-${('0' + start.getDate()).slice(-2)}`;
    }

    if (dateFields[1]) {
      dateFields[1].dataset.dateIso = `${end.getFullYear()}-${
        '0' + (end.getMonth() + 1)
      }-${('0' + end.getDate()).slice(-2)}`;
    }
    this.getFieldDates();
  };

  clearDate = () => {
    const { dateFields, trigger } = this.options;
    if (!dateFields?.length && !trigger) {
      return;
    }
    dateFields.forEach((field) => {
      field.dataset.dateIso = '';
      this.getFieldDates();
      this.initMarks();
    });
  };
}
