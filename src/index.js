// ищет вначале в текущей директории, затем в node_modules
import './js/'
import './assets/css/main.css'
import './assets/scss/main.scss'

// import 'vue'
// import Bootstrap from
// window.Vue = require('vue');
import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper/js/swiper.esm.js';
Swiper.use([Navigation, Pagination, Scrollbar]);


import css from 'swiper/css/swiper.css';
/*
window.addEventListener('DOMContentLoaded', function() {
  var swiper = new Swiper('.swiper-container', {
    speed: 500,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
});*/