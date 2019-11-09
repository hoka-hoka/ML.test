import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper/js/swiper.esm.js';
Swiper.use([Navigation, Pagination, Scrollbar]);

let swiperParam = {
  //loop: true,
  slideActiveClass: "clandar__slide-active",
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  navigation: {
        nextEl: '.calendar__arrow-next',
        prevEl: '.calendar__arrow-prev',
    },
}

let mainSwiper = new Swiper(".swiper-container", swiperParam);


let calendar = document.querySelector('.calendar')
let month = new Date().getMonth() - 1;









// let b = new Date;
function createCalendar(elem, year, month) {
  let mon = month; // 0-11
  let d = new Date(year, mon); // Fri Nov 01 2019 00:00:00 GMT+0700 (GMT+07:00)
  let calendarBaseMonth = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  let b = new Date(d);

  let table = '<div class="swiper-slide"><div class="calendar__nav"><div class="calendar__month">' + calendarBaseMonth[month] + '</div><table class="calendar__table"><thead class="calendar__box"><tr><th class="calendar__day">пн</th><th class="calendar__day">вт</th><th class="calendar__day">ср</th><th class="calendar__day">чт</th><th class="calendar__day">пт</th><th class="calendar__day">сб</th><th class="calendar__day">вс</th></tr></thead><tr>';

  for (let i = 0; i < getDay(d); i++) { // нет
    if ( !i ) {
      b.setDate(b.getDate() - getDay(d) - 1);
    }
    b.setDate(b.getDate() + 1);
    table += '<td>' + b.getDate() + '</td>';
  }
  while (d.getMonth() == mon) { // 10 == 10
    table += '<td class="calendar__day-num">' + d.getDate() + '</td>';
    if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки ( 6 / 7 )
      table += '</tr><tr>';
    }
    d.setDate(d.getDate() + 1);
  }
  b = new Date(d);
  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) { // 29 30 31 * * * *
      table += '<td>' + b.getDate() + '</td>';
      b.setDate(b.getDate() + 1);
    }
  }
  table += '</tr></table></div></div>';
  //elem.innerHTML += table;
  return table;
}

function getDay(date) {
  let day = date.getDay(); // получить номер дня недели, от 0 (пн) до 6 (вс)
  if (day == 0) day = 7; // сделать воскресенье (0) последним днем
  return day - 1;
}

function deleteCalendar() {

}






let calendarBtnPrev = document.querySelector('.calendar__arrow-prev');
calendarBtnPrev.addEventListener('click', function() {

  /*mainSwiper.appendSlide([
     '<div class="swiper-slide"><div class="calendar__nav"><div class="calendar__month"></div></div></div>'
  ]);*/

   //mainSwiper.slideNext (100, true);

/*
mySwiper.prependSlide([
   '<div class="swiper-slide">Slide 1"</div>',
   '<div class="swiper-slide">Slide 2"</div>'
]);
*/
});


export { mainSwiper, month, createCalendar, getDay };