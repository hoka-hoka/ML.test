!function() {

  const elementEvent = document.querySelectorAll('.rectangle_active--js button.js--click');
  if ( elementEvent ) {
    elementEvent.forEach( v => {
      crateEvent(v);
    });
  }

  const optionsExample = document.querySelectorAll('.rectangle_example--js button.js--click');
  if ( optionsExample ) {
    optionsExample.forEach( v => {
      setOptionAmount(v);
    });
  }

  function crateEvent( v ) {
    let eventArrow = new Event('click', { bubbles: true });
    v.dispatchEvent(eventArrow);
  }

  function setOptionAmount( v ) {
    const element = v.previousElementSibling.getAttribute('data-role');

    if ( element === 'room' ) {
      const opts = v.parentNode.querySelectorAll('.input-options__opt');
      for(let i = 0; i < 2; i++) {
        crateEvent(opts[0].querySelector('.button__mark_plus'));
        crateEvent(opts[1].querySelector('.button__mark_plus'));
      }
    }
    else if ( element === 'gues' ) {
      const opts = v.parentNode.querySelectorAll('.input-options__opt');
      for(let i = 0; i < 2; i++) {
        crateEvent(opts[0].querySelector('.button__mark_plus'));
      }
      crateEvent(opts[1].querySelector('.button__mark_plus'));
    }
    else if ( element === 'check' && v.closest('.rectangle_example--js') ) {
      const options = v.nextElementSibling.querySelectorAll('.input[type="checkbox"]');
      options[1].checked = true;
      options[2].checked = true;
      options[3].checked = true;
    }
  }
}();