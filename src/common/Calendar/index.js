import CalendarDOM from './CalendarDOM';
import Mark from './Mark';

export default class Calendar {
  initCalendar = (calendar) => {
    this.cont = calendar.querySelector('.swiper-container');
    this.swiper = this.cont.swiper;
    this.createCalendar();
    this.createMarks();
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
  };

  createMarks = () => {
    const { cont } = this;
    this.marks = {
      today: new Mark('calendar__today-mark', cont),
      first: new Mark('calendar__day-mark calendar__day-mark_1', cont),
      second: new Mark('calendar__day-mark calendar__day-mark_2', cont),
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
}
