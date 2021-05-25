import CalendarDOM from './CalendarDOM';
import Mark from './Mark';
import Sibling from '../Sibling';
import DateFormat from '../DateFormat';
import moment from 'moment';
import { calendar } from '../../js/constants';

export default class Calendar {
  constructor(calendar, options = { dateFields, btnClear, bntApply, trigger }) {
    if (!calendar) {
      console.error('узел календаря не передан в класс Calendar');
    }
    this.options = { ...options };
    this.cont = calendar.querySelector('.swiper-container');
    this.swiper = this.cont.swiper;
    this.initCalendar();
  }

  initCalendar = () => {
    const { btnClear, bntApply, dateFields } = this.options;
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
    if (dateFields.length) {
      dateFields.forEach((field) => {
        this.formatDate(field);
      });
    }
  };

  createCalendar = () => {
    let date = new Date();
    date.setDate(1);
    let dateArr = [
      new Date(date.setMonth(date.getMonth() - 1)),
      new Date(date.setMonth(date.getMonth() + 1)),
      new Date(date.setMonth(date.getMonth() + 1)),
    ];
    dateArr.forEach((date) => {
      this.swiper.appendSlide(new CalendarDOM(date).table);
    });
  };

  initMarks = () => {
    const { cont, marks } = this;
    let tdToday = cont.querySelector('.calendar__day-num_current');
    let cell = cont.querySelectorAll('.calendar__day-num'); // cells
    marks.today.moveAt(tdToday);
    for (let i in cell) {
      if (cell[i] == tdToday) {
        marks.first.moveAt(cell[i]);
        marks.second.moveAt(cell[+i + 1]);
      }
    }
    this.swiper.activeIndex = 1;
    this.swiper.update();
  };

  createMarks = () => {
    const { cont } = this;
    this.marks = {
      today: new Mark('calendar__today-mark', cont),
      first: new Mark(
        'calendar__day-mark calendar__day-mark_1',
        cont,
        this.applyDate,
      ),
      second: new Mark(
        'calendar__day-mark calendar__day-mark_2',
        cont,
        this.applyDate,
      ),
    };
    const { marks } = this;

    let table = cont.querySelectorAll('.calendar__box'); // boxes cell
    this.initMarks();
    for (let val of table) {
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
      options: { dateFields },
    } = this;

    const getDate = (day) => {
      const today = this.marks.today.day;
      let checkDate = Sibling.getOlderSibling({
        iter: 4,
        $elem: $(today),
        find: 'calendar__month',
      });
      if (!checkDate.length) {
        return;
      }
      const [month, year] = checkDate.get(0).innerHTML.split(' ');
      if (!month && !year) {
        return;
      }
      const date = new Date(year, calendar.months.indexOf(month), day);
      return date;
    };

    const dateFormatting = (date) => {
      if (!date) {
        return;
      }
      const { dateFields } = this.options;
      let rezult;
      moment.locale('ru');
      if (dateFields.length == 1) {
        rezult = moment(date).format('DD MMM');
      } else {
        rezult = moment(date).format('DD-MM-YYYY');
      }
      return rezult;
    };

    const [start = '', end = ''] = [
      dateFormatting(getDate(first.day ? first.day.innerText : '')),
      dateFormatting(getDate(second.day ? second.day.innerText : '')),
    ].sort();

    if (!dateFields.length) {
      return;
    }
    dateFields.forEach((field, index) => {
      if (dateFields.length == 1) {
        field.value = `${start} - ${end}`;
      } else {
        !index ? (field.value = start) : (field.value = end);
      }
    });
  };

  clearDate = () => {
    const { dateFields, trigger } = this.options;
    if (!dateFields?.length && !trigger) {
      return;
    }
    dateFields.forEach((field, index) => {
      field.value = '';
      this.initMarks();
    });
  };

  formatDate = (field) => {
    new DateFormat(field, field.dataset.dateFormat);
  };
}

// calendarDay[0].querySelector('.input__field').value += `${
//   v.innerText
// } ${checkDate[0].slice(0, 3)}. ${
//   i == 0 && arr.length !== 1 ? '- ' : ''
// }`;
