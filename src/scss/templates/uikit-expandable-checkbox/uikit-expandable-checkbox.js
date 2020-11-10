!(function() {
  const optionsExample = document.querySelectorAll(
    '.uikit-expandable-checkbox_example-js .label_js',
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
    if (element === 'check') {
      const options = v.parentNode.querySelectorAll('.input-checkbox');
      options[1].checked = true;
      options[2].checked = true;
      options[3].checked = true;
    }
  }
})();
