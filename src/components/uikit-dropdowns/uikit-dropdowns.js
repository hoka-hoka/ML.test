import './uikit-dropdowns.scss';

const optionsExample = document.querySelectorAll(
  '.uikit-dropdowns__dropdown_example-js',
);

if (optionsExample) {
  optionsExample.forEach(v => {
    setOptionAmount(v);
  });
}

function crateEvent(v) {
  let eventArrow = new Event('click', { bubbles: true });
  v.dispatchEvent(eventArrow);
}

function setOptionAmount(element) {
  if (!element.classList.contains('uikit-dropdowns__dropdown_active-js')) {
    return;
  }
  const dropdownField = element.querySelector('.input__field_clicked-js');
  const dropdownOptions = element.querySelectorAll(
    '.input-options__marks_elem-js',
  );
  const dropdownRole = dropdownField.getAttribute('data-role');

  if (dropdownRole === 'room') {
    for (let i = 0; i < 2; i++) {
      crateEvent(dropdownOptions[0].querySelector('.button__mark_plus-js'));
      crateEvent(dropdownOptions[1].querySelector('.button__mark_plus-js'));
    }
  } else if (dropdownRole === 'gues') {
    for (let i = 0; i < 2; i++) {
      crateEvent(dropdownOptions[0].querySelector('.button__mark_plus-js'));
    }
    crateEvent(dropdownOptions[1].querySelector('.button__mark_plus-js'));
  }
  // else if (element === 'check' && v.closest('.rectangle_example_js')) {
  //   const options = v.nextElementSibling.querySelectorAll('.input-checkbox');
  //   options[1].checked = true;
  //   options[2].checked = true;
  //   options[3].checked = true;
  // }
}
