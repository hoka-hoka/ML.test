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
  };

  createCalendar = () => {
    const { dateFields = [] } = this.options;

    this.firstDate = dateFields[0].value
      ? new Date(calendar.reverseDate(dateFields[0].value))
      : new Date();
    this.secondDate = dateFields[1].value
      ? new Date(calendar.reverseDate(dateFields[1].value))
      : new Date();

    const dateArr = [];
    for (let i = 0; i < 12; ++i) {
      dateArr.push(
        new Date(this.firstDate.getFullYear(), i, this.firstDate.getDate()),
      );
    }
    dateArr.forEach((date) => {
      this.swiper.appendSlide(new CalendarDOM(date).table);
    });
  };

  initMarks = () => {
    const { cont, marks } = this;

    let tdToday = cont.querySelector('.calendar__day-num_current');
    if (tdToday) {
      marks.today.moveAt(tdToday);
    }

    const firstCells = cont
      .querySelectorAll('.swiper-slide')
      [this.firstDate.getMonth()].querySelectorAll(
        'td:not(.calendar__day-other)',
      );

    const firstTD = [...firstCells].find(
      (td) => td.innerText == this.firstDate.getDate(),
    );

    marks.first.moveAt(firstTD);

    const secondCells = cont
      .querySelectorAll('.swiper-slide')
      [this.secondDate.getMonth()].querySelectorAll(
        'td:not(.calendar__day-other)',
      );

    const secondTD = [...secondCells].find(
      (td) => td.innerText == this.secondDate.getDate(),
    );

    marks.second.moveAt(secondTD);

    this.swiper.activeIndex = this.firstDate.getMonth();
    this.swiper.update();
  };

  createMarks = () => {
    const { cont } = this;

    this.marks = {
      today: new Mark('calendar__today-mark', cont),
      first: new Mark('calendar__day-mark', cont, this.applyDate),
      second: new Mark('calendar__day-mark', cont, this.applyDate),
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
      if (!day) {
        return;
      }

      let checkDate = Sibling.getOlderSibling({
        iter: 4,
        $elem: $(day),
        find: 'calendar__month',
      });

      if (!checkDate) {
        return;
      }
      const [month, year] = checkDate.get(0).innerHTML.split(' ');
      if (!month && !year) {
        return;
      }

      const date = new Date(
        year,
        calendar.months.indexOf(month),
        day.innerText,
      );
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
        rezult = moment(date).format('DD.MM.YYYY');
      }
      return rezult;
    };

    const [start = '', end = ''] = [
      dateFormatting(getDate(first.day)),
      dateFormatting(getDate(second.day)),
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
}
