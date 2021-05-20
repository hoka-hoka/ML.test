import moment from 'moment';
import IMask from 'imask';

export default class DateFormat {
  constructor(field, momentFormat = 'DD.MM.YYYY') {
    if (!field) {
      console.error('Не определено поле в DateFormat');
    }
    const mask = IMask(field, {
      mask: momentFormat,
      autofix: true,
      overwrite: true,
      blocks: {
        ДД: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        ММ: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        ГГГГ: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 9999,
        },
      },
      format: function (date) {
        moment.locale('ru');
        return moment(date).format(momentFormat);
      },
      parse: function (str) {
        return moment(str, momentFormat);
      },
    });
  }
}
