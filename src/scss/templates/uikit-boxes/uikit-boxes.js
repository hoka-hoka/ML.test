const optionsExample = document.querySelectorAll(
  '.uikit-boxes__checkbox-list_example-js',
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
  if (!element.classList.contains('uikit-boxes__checkbox-list_active-js')) {
    return;
  }
  const options = element.querySelectorAll('.input-checkbox');
  options[1].checked = true;
  options[2].checked = true;
  options[3].checked = true;
}
