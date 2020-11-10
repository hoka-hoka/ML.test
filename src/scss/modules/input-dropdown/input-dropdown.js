import { dropDown } from '../../../js/dropDown';
let active = document.querySelectorAll(
  '.input-dropdown_js .input_clicked-js, .input-dropdown_js .button_clicked-js',
);
if (active) {
  active.forEach(value => {
    dropDown(value, value.parentNode, 'input-dropdown_active');
  });
}
