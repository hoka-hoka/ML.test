import './input-date.scss';
import DropDown from '../../common/DropDown';
import Sibling from '../../common/Sibling';

const calendarDropdown = (item) => {
  const $calendar = Sibling.getOlderSibling({
    iter: 2,
    $elem: $(item),
    find: 'calendar',
  });
  const listOptions = {
    $elem: $(item).find('.input__field_clicked-js, .button_clicked-js'),
    $par: $(item),
    $list: $calendar,
    $focus: $(item),
    aria: true,
  };
  new DropDown(listOptions);
};

const $drop = $('.search__date, .filter__date');
if ($drop.length) {
  $drop.each((_, item) => {
    calendarDropdown(item);
  });
}
