'use strict';
import '../assets/scss/modules/js--click/js--click'

// main
import '../assets/scss/modules/input/input'
import '../assets/scss/modules/input-range/input-range'
import '../assets/scss/modules/input-date/input-date'
import '../assets/scss/modules/overlay/overlay'
import '../assets/scss/modules/header/header'
import '../assets/scss/modules/customer/customer'
import '../assets/scss/modules/nav/nav'

// ui-kit
import '../assets/scss/templates/rectangle/rectangle'
import '../assets/scss/templates/input-range/input-range'

// error
import '../assets/scss/modules/calendar/calendar'




import './listSwiper'


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