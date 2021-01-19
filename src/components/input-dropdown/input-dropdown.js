import './input-dropdown.scss';
import dropDown from '../../js/dropDown';

const active = document.querySelectorAll(
  '.input-dropdown_js .input__field_clicked-js, .input-dropdown_js .button_clicked-js',
);
if (active) {
  active.forEach((value) => {
    dropDown(
      value,
      value.closest('.input-dropdown__field'),
      'input-dropdown_active',
    );
  });
}
