'use strict';

import 'swiper/swiper-bundle.min.css';
import '../scss/modules/input-dropdown/input-dropdown';

// main
import '../scss/modules/input/input';
import '../scss/modules/input-range/input-range';
import '../scss/modules/input-date/input-date';
import '../scss/modules/header/header';
import '../scss/modules/heart/heart';
import '../scss/modules/nav/nav';
import '../scss/modules/input-options/input-options';
import '../scss/modules/input-list/input-list';

// ui-kit
import '../scss/templates/uikit-cards/uikit-cards';
import '../scss/templates/uikit-dropdowns/uikit-dropdowns';
import '../scss/templates/uikit-boxes/uikit-boxes';

import '../scss/modules/calendar/calendar';

import './listSwiper';

//--- require ---
/* подключаем какой-нибудь модуль. Для того, чтобы webpack вынес его отдельно используется require.ensure(). В
результате модуль подгрузится, только когда нажмут на кнопку, а не сразу*/
/*document.querySelector('.btn').onclick = function() {
  require.ensure(['./login'], function() { // ['./login', '...'], но можно ничего не ставить, он просматривает тело
    let login = require('./login');
    login();
// не обязательный, поместит в файл auth и не будет создавать свой для каждого модуля
  }, 'auth');
};*/
// При выполнении перестаёт использовать кэш и обращается к dist, dev-server не будет показывать изм-я

//svg4everybody();
