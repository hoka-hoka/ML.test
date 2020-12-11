import { dropDown } from '../../../js/dropDown';
let active = document.querySelectorAll(
  '.input-dropdown_js .input__field_clicked-js, .input-dropdown_js .button_clicked-js',
);
if (active) {
  active.forEach(value => {
    dropDown(value, 'input-dropdown__field', 'input-dropdown_active');
  });
}