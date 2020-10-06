!function() {

  let list = document.querySelectorAll('.rectangle_active--js button.js--click');
  list.forEach( v => {
    crateEvent(v);
    setOptionAmount(v);
  });

  function crateEvent( v ) {
    let eventArrow = new Event('click', { bubbles: true });
    v.dispatchEvent(eventArrow);
  }

  function setOptionAmount( v ) {
    const element = v.previousElementSibling.getAttribute('data-role');

    if ( element === 'room' && v.closest('.rectangle_example--js') ) {
      const opts = v.parentNode.querySelectorAll('.input-options__opt');
      for(let i = 0; i < 2; i++) {
        crateEvent(opts[0].querySelector('.button__mark_plus'));
        crateEvent(opts[1].querySelector('.button__mark_plus'));
      }
    }
    else if ( element === 'gues' && v.closest('.rectangle_example--js') ) {
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