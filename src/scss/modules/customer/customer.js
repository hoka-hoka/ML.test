!function() {
  let customer = document.querySelectorAll(".customer__box_btn--js");
  if ( customer.length > 0 ) {
     customer.forEach((val, i) => {
        val.addEventListener('click', ( event ) => {
          toggleHeart( val, 'customer__box_action' );
          const amountLike = event.target.parentNode.querySelector('.customer__like_number--js');
          if ( val.classList.contains("customer__box_action") ) {
            ++amountLike.innerHTML;
          }
          else {
            --amountLike.innerHTML;
          }
      });
    });
  }
  const activeCustomer = document.querySelectorAll('.customer__box_active--js');
  if ( activeCustomer.length ) {
    activeCustomer.forEach((val, i) => {
      val.classList.add('customer__box_action');
    });
  }

  function toggleHeart( element, className ) {
    if ( element ) {
      element.classList.toggle(className);
    }
  }
}();