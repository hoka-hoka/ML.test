!function() {
  let list = document.querySelectorAll('.rectangle_active--js .input-dropdown_event--js');
  list.forEach( v => {

    let element = v;
    let eventArrow = new Event('click');
    console.log(element);
    element.dispatchEvent(eventArrow);
  });
}();