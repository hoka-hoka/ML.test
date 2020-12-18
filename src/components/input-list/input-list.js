import './input-list.scss';
import { dropDown } from '../../js/dropDown';

let active = document.querySelectorAll(
  '.input-list .label_js, .input-list .button_clicked-js',
);
if (active) {
  active.forEach(value => {
    dropDown(value, value.parentNode, 'input-list_active');
  });
}
