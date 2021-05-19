import moment from 'moment';
import IMask from 'imask';
import './input-date.scss';
import DropDown from '../../common/DropDown';
import Sibling from '../../common/Sibling';

const initCalendar = (item) => {
  const $calendar = Sibling.getOlderSibling({
    iter: 2,
    $elem: $(item),
    find: 'calendar',
  });
  const listOptions = {
    $elem: $(item).find('.button_clicked-js'),
    $par: $(item),
    $list: $calendar,
    $focus: $(item),
    // aria: true,
  };
  new DropDown(listOptions);
};

const formatDate = (item) => {
  const fields = $(item).find('.input__field');
  fields.each((_, e) => {
    const momentFormat = e.dataset.dateFormat;
    const mask = IMask(e, {
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
  });
};

const $drop = $('.search__date');
if ($drop.length) {
  $drop.each((_, item) => {
    formatDate(item);
    initCalendar(item);
  });
}
