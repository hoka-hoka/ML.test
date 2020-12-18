import './input-date.scss';
import { dropDown } from '../../js/dropDown';

let active = document.querySelectorAll('.input-date_js .button_clicked-js');
if (active) {
  active.forEach(value => {
    dropDown(value, value.closest('.input-date_js'), 'input-date_active');
  });
}
