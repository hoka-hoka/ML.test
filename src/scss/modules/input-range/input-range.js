import multirange from '../../../js/multiRange';

if (document.querySelector('#product')) {
  let range = document.querySelector('.input-range_pull-js');
  let inputRange = range.querySelector('.input-range__field');
  let priceElem = range.querySelector('.input-range__price');
  multirange(inputRange, priceElem, '5000');
}
