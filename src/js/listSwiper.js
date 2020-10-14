import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Scrollbar]);

let mainSwiper = new Swiper(".banner__swiper-container", {
  //loop: true, don't work width the cssMode
  cssMode: true,
  initialSlide: 2,
});

let detailsSwiper = new Swiper('.details__swiper', {
  speed: 400,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  }
});

let cardSwiper = new Swiper(".card__swiper-container", {
  speed: 400,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
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