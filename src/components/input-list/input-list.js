import DropDown from '../../common/DropDown';
import './input-list.scss';

const $drop = $('.input-list_js');

if ($drop.length) {
  $drop.each((_, item) => {
    const $interact = $(item).find('.input-list__title, .button');
    const $par = $(item);

    const listOptions = {
      $elem: $interact,
      $par: $par,
      $list: $par.find('.input-list__options'),
      $focus: $par,
      extClass: 'input-list_active',
      aria: true,
    };
    new DropDown(listOptions);
  });
}
