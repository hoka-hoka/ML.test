import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper/js/swiper.esm.js';
Swiper.use([Navigation, Pagination, Scrollbar]);

let mainSwiper = new Swiper(".banner__swiper-container", {
  loop: true,
  cssMode: true,
  initialSlide: 2,

});