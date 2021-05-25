import './input-options.scss';
import AmountList from '../../common/AmountList';
import Sibling from '../../common/Sibling';

let guesName = [
  ['гость', 'гостя', 'гостей'],
  ['младенец', 'младенца', 'младенцев'],
];

let roomName = [
  ['спальня', 'спальни', 'спален'],
  ['кровать', 'кровати', 'кроватей'],
  ['вання комната', 'ванные комнаты', 'ванных комнат'],
];

let input = document.querySelectorAll('.input__field_clicked-js');
if (input) {
  input.forEach((value) => {
    const optionList = Sibling.getOlderSibling({
      iter: 2,
      $elem: $(value),
      find: 'input-options_init-js',
    });
    if (!optionList) {
      return;
    }
    if (value.dataset.role == 'gues') {
      createList(optionList.get(0), guesName);
    } else if (value.dataset.role == 'room') {
      createList(optionList.get(0), roomName);
    } else return;
  });
}

function createList(list, name) {
  let newList = new AmountList(list, name);
  newList.computeAmountPerson();
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
  optionList.addEventListener('click', (event) => {
    if (event.target.classList.contains('button_prev-js')) {
      objList.clearAmount();
    } else if (event.target.classList.contains('button_next-js')) {
      objList.toApply();
      const eventTarget = Sibling.getOlderSibling({
        iter: 4,
        $elem: $(optionList),
        find: 'input__field_clicked-js',
      });
      if (eventTarget?.length) {
        const inputEvent = new Event('click');
        eventTarget.get(0).dispatchEvent(inputEvent);
      }
    } else return;
  });
}
