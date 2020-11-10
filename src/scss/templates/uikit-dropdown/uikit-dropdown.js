!(function() {
  const optionsExample = document.querySelectorAll(
    '.uikit-dropdown_example-js .input_clicked-js',
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

  function setOptionAmount(v) {
    const element = v.getAttribute('data-role');

    if (element === 'room') {
      const opts = v.parentNode.querySelectorAll(
        '.input-options_init-js .input-options__marks_elem-js',
      );
      for (let i = 0; i < 2; i++) {
        crateEvent(opts[0].querySelector('.button__mark_plus-js'));
        crateEvent(opts[1].querySelector('.button__mark_plus-js'));
      }
    } else if (element === 'gues') {
      const opts = v.parentNode.querySelectorAll(
        '.input-options_init-js .input-options__marks_elem-js',
      );
      for (let i = 0; i < 2; i++) {
        crateEvent(opts[0].querySelector('.button__mark_plus-js'));
      }
      crateEvent(opts[1].querySelector('.button__mark_plus-js'));
    } else if (element === 'check' && v.closest('.rectangle_example_js')) {
      const options = v.nextElementSibling.querySelectorAll('.input-checkbox');
      options[1].checked = true;
      options[2].checked = true;
      options[3].checked = true;
    }
  }
})();
