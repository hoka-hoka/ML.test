'use strict';

import 'swiper/swiper-bundle.min.css';
import '../scss/modules/input-dropdown/input-dropdown';
import '../scss/modules/js--click/js--click';

// main
import '../scss/modules/input/input';
import '../scss/modules/input-range/input-range';
import '../scss/modules/input-date/input-date';
import '../scss/modules/overlay/overlay';
import '../scss/modules/header/header';
import '../scss/modules/customer/customer';
import '../scss/modules/nav/nav';
import '../scss/modules/input-options/input-options';
import '../scss/modules/input-list/input-list';

// ui-kit
import '../scss/templates/uikit-dropdown/uikit-dropdown';
import '../scss/templates/uikit-expandable-checkbox/uikit-expandable-checkbox';
import '../scss/templates/input-range/input-range';

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
