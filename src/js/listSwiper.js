import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper/js/swiper.esm.js';
Swiper.use([Navigation, Pagination, Scrollbar]);

let mainSwiper = new Swiper(".banner__swiper-container", {
  //loop: true, don't work width the cssMode
  cssMode: true,
  initialSlide: 2,
});

let cardSwiper = new Swiper(".card__swiper-container", {
  speed: 400,
  spaceBetween: 10,
  //loop: true, don't work width the cssMode
  cssMode: true,
  navigation: {
    nextEl: '.card__button-next',
    prevEl: '.card__button-prev',
  },
  pagination: {
    el: '.card__pagination',
    type: 'bullets',
    bulletClass: 'card__bullet',
    bulletActiveClass: 'card__bullet_active',
    clickable: true,
    modifierClass: '',
    progressbarOpposite: true,
  },
});
