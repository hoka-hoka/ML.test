import './input-list.scss';
import DropDown from '../../common/DropDown';

const $drop = $('.input-list');

if ($drop.length) {
  $drop.each((_, item) => {
    const $interact = $(item).find('.label_js, .button_clicked-js');
    const $par = $(item);

    const listOptions = {
      $elem: $interact,
      $par: $par,
      $list: $par.find('.input-list__options'),
      $focus: $par,
      addedClass: 'input-list_active',
      aria: true,
    };
    new DropDown(listOptions);
  });
}
