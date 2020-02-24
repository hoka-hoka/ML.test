'use strict';

import '../assets/scss/modules/input/input'
import '../assets/scss/modules/input-mark/input-mark'
import '../assets/scss/modules/input-range/input-range'
import '../assets/scss/modules/js--click/js--click'


import '../assets/scss/modules/button/button'
import '../assets/scss/modules/calendar/calendar'
import '../assets/scss/modules/banner/banner'

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