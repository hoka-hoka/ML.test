const calendar = {
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],

  getDay: (date) => {
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
  },

  reverseDate: (str) => {
    const rezult = str.split('.').reverse().join('-');
    return rezult;
  },
};

export { calendar };
