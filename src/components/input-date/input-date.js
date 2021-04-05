import './input-date.scss';
import DropDown from '../../common/DropDown';
import Sibling from '../../common/Sibling';

const $drop = $('.input-date__field_js');
if ($drop.length) {
  $drop.each((index, item) => {
    const $calendar = Sibling.getOlderSibling({
      iter: 2,
      $elem: $(item),
      find: 'calendar',
    });

    const listOptions = {
      $elem: $(item).find('.button_clicked-js'),
      $par: $(item).parent(),
      $list: $calendar,
      $focus: $(item),
      addedClass: 'input-date_active',
    };
    new DropDown(listOptions);
  });
}
