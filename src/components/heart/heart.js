import './heart.scss';

let customer = document.querySelectorAll('.heart__btn_js');
if (customer.length > 0) {
  customer.forEach((val, i) => {
    val.addEventListener('click', (event) => {
      toggleHeart(val, 'heart__btn_active');

      const amountLike = event.target.parentNode.querySelector(
        '.heart__amount_js',
      );
      if (val.classList.contains('heart__btn_active')) {
        ++amountLike.innerHTML;
      } else {
        --amountLike.innerHTML;
      }
    });
  });
}
const activeCustomer = document.querySelectorAll('.heart__btn_active-js');

if (activeCustomer.length) {
  activeCustomer.forEach((val, i) => {
    val.classList.add('heart__btn_active');
  });
}

function toggleHeart(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}
