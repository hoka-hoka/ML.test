import { mainSwiper, month, dropDownCalendar, getDay } from '../../../../js/calendar';
let calendar = document.querySelectorAll('.input-date+.button');
let calendarAdd = '.calendar__swiper-container .swiper-wrapper';
dropDownCalendar(calendar, calendarAdd); // btn, ElemPriviousAdd
