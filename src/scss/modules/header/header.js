!(function() {
  if (
    document.body.id === 'index' ||
    document.body.id === 'details' ||
    document.body.id === 'product'
  ) {
    window.onscroll = () => {
      myFunction();
    };
    var header = document.querySelector('.header');
    var sticky = header.offsetTop;
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  }
  let user = document.querySelectorAll('.header__user_js');
  if (user[1]) {
    user[1].parentNode.querySelector('.header__buttons').style.display = 'none';
    user[1].style.display = 'block';
  }
})();
