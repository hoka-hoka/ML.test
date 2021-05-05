import './swiper-container.scss';

import { Swiper, Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

import 'swiper/swiper-bundle.min.css';

new Swiper('.swiper-container_banner-js', {
  loop: true,
  initialSlide: 2,
});

new Swiper('.details__swiper', {
  speed: 400,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper__next',
    prevEl: '.swiper__prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
});

new Swiper('.swiper-container_card-js', {
  speed: 400,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '.swiper__next',
    prevEl: '.swiper__prev',
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
