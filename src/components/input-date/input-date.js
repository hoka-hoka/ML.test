import './input-date.scss';
import DropDown from '../../common/DropDown';
import Sibling from '../../common/Sibling';
import DateFormat from '../../common/DateFormat';

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
    aria: true,
  };
  new DropDown(listOptions);
};

const formatDate = (item) => {
  const fields = $(item).find('.input__field');
  fields.each((_, elem) => {
    new DateFormat(elem, elem.dataset.dateFormat);
  });
};

const $drop = $('.search__date');
if ($drop.length) {
  $drop.each((_, item) => {
    formatDate(item);
    initCalendar(item);
  });
}
