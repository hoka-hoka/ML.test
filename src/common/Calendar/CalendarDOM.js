import { calendar } from '../../js/constants';

export default class CalendarDOM {
  constructor(e, today) {
    this.date = new Date(e);
    this.calendarMonths = calendar.months;
    this.year = this.date.getFullYear();
    this.table =
      '<div class="swiper-slide"><div class="calendar__nav"><div class="calendar__month">' +
      this.calendarMonths[this.date.getMonth()] +
      ' ' +
      this.year +
      '</div><table class="calendar__table"><thead class="calendar__column"><tr><th class="calendar__day">пн</th><th class="calendar__day">вт</th><th class="calendar__day">ср</th><th class="calendar__day">чт</th><th class="calendar__day">пт</th><th class="calendar__day">сб</th><th class="calendar__day">вс</th></tr></thead><tbody class="calendar__box">';

    this.setDateBefore(calendar.getDay(e));
    this.setDateAfter(today);
  }

  setDateBefore = (iter) => {
    const date = new Date(this.date);
    for (let i = 0; i < iter; i++) {
      date.setDate(this.date.getDate() - calendar.getDay(this.date) + i); // дней до текущего
      this.table +=
        '<td class="calendar__day-num calendar__day-other">' +
        date.getDate() +
        '</td>';
    }
  };

  setDateAfter = (today) => {
    let i = 0;
    while (i < 5) {
      if (this.date.toLocaleDateString() == new Date().toLocaleDateString()) {
        this.table +=
          '<td class="calendar__day-num calendar__day-num_current">' +
          this.date.getDate() +
          '</td>';
      } else {
        this.table +=
          '<td class="calendar__day-num">' + this.date.getDate() + '</td>';
      }

      if (calendar.getDay(this.date) % 7 === 6) {
        this.table += '</tr><tr>';
        ++i;
      }
      this.date.setDate(this.date.getDate() + 1);
    }
    this.table += '</tr></table></div></div>';
  };
}
