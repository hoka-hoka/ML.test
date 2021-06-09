import './input-date.scss';
import DropDown from '../../common/DropDown';
import DateFormat from '../../common/DateFormat';

const calendarDropdown = (item) => {
  const $calendar = $(item).find('.calendar');

  const listOptions = {
    $elem: $(item).find('.input-date__field_js'),
    $par: $(item),
    $list: $calendar,
    $focus: $(item),
    aria: true,
  };
  new DropDown(listOptions);
};

const $drop = $(
  '.search__date, .filter__date, .description__date, .uikit-cards__date-dropdown, .uikit-cards__filter-date',
);
if ($drop.length) {
  $drop.each((_, item) => {
    calendarDropdown(item);
  });
}

const formatDate = (item) => {
  const fields = $(item).find('.input__field');
  fields.each((_, elem) => {
    if (!elem.dataset.dateFormat) {
      new DateFormat(elem, elem.dataset.dateFormat);
      return;
    }
  });
};

const $dateFields = $('.input-date_js');
if ($dateFields.length) {
  $dateFields.each((_, item) => {
    formatDate(item);
  });
}
