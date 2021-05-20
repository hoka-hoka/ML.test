import DateFormat from '../../common/DateFormat';
import './reg.scss';

const formatDate = (item) => {
  const fields = $(item).find('.input__field');
  fields.each((_, elem) => {
    new DateFormat(elem, elem.dataset.dateFormat);
  });
};

const $dateFields = $('.input-date_js');
if ($dateFields.length) {
  $dateFields.each((_, item) => {
    formatDate(item);
    // initCalendar(item);
  });
}
