import { calendar } from '../../js/constants';

export default class CalendarDOM {
  constructor(e) {
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
    this.setDateAfter();
  }

  setDateBefore = (iter) => {
    const prevDate = new Date(this.date - 1);
    const lastDay = new Date(prevDate).getDate();
    for (let i = 0; i < iter; ++i) {
      const shift = lastDay - calendar.getDay(this.date) + i + 1;
      prevDate.setDate(shift); // дней до текущего
      this.table +=
        '<td class="calendar__day-num calendar__day-before">' +
        prevDate.getDate() +
        '</td>';
    }
  };

  setDateAfter = () => {
    const date = new Date(this.date);
    const month = date.getMonth();
    let i = 0;
    while (i < 5) {
      if (date.toLocaleDateString() == new Date().toLocaleDateString()) {
        this.table += `<td class="calendar__day-num calendar__day-num_current">${date.getDate()}</td>`;
      } else if (month != date.getMonth()) {
        this.table += `<td class="calendar__day-num calendar__day-after">${date.getDate()}</td>`;
      } else {
        this.table += `<td class="calendar__day-num">${date.getDate()}</td>`;
      }
      // 6 & 7 == 6
      if (calendar.getDay(date) % 7 === 6) {
        this.table += '</tr><tr>';
        ++i;
      }
      date.setDate(date.getDate() + 1);
    }
    this.table += '</tr></table></div></div>';
  };
}
