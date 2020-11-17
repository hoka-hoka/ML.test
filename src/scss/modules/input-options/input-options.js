import { amountList } from '../../../js/amountList';
import { setSiblingIteration } from '../../../js/getSibling';

let guesName = [
  ['гость', 'гостя', 'гостей'],
  ['младенец', 'младенца', 'младенцев'],
];

let roomName = [
  ['спальня', 'спальни', 'спален'],
  ['кровать', 'кровати', 'кроватей'],
  ['вання комната', 'ванные комнаты', 'ванных комнат'],
];

let input = document.querySelectorAll('.input_clicked-js');
if (input) {
  input.forEach(value => {
    const optionList = setSiblingIteration(2, value, 'input-options_init-js');
    if (!optionList) {
      return;
    }
    if (value.getAttribute('data-role') === 'gues') {
      createList(optionList, guesName);
    } else if (value.getAttribute('data-role') === 'room') {
      createList(optionList, roomName);
    } else return;
  });
}

function createList(list, name) {
  let newList = new amountList(list, name);
  newList.amountPerson();
  addButtonsPanel(newList);
}

function addButtonsPanel(objList) {
  let optionList = objList.optionList;
  let buttonsPanel = optionList.querySelectorAll(
    '.button_prev-js, button_next-js',
  );
  if (!buttonsPanel) {
    return;
  }
  optionList.addEventListener('click', event => {
    if (event.target.classList.contains('button_prev-js')) {
      objList.clearAmount();
    } else if (event.target.classList.contains('button_next-js')) {
      objList.toApply();
      const inputEvent = new Event('click');
      const eventTarget = setSiblingIteration(
        4,
        optionList,
        'input_clicked-js',
      );
      eventTarget.dispatchEvent(inputEvent);
    } else return;
  });
}
