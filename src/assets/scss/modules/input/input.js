'use strict';
import { amountList } from '../../../../js/amountList';
import { setSiblingIteration } from '../../../../js/getSibling';

let guesName = [
    ['взрослый', 'взрослых', 'взрослых'],
    ['ребёнок', 'ребёнка', 'детей'],
    ['младенец', 'младенца', 'младенцев']
  ];
let roomName = [
    ['спальня', 'спальни', 'спален'],
    ['кровать', 'кровати', 'кроватей'],
    ['вання комната', 'ванные комнаты', 'ванных комнат']
  ];

function addButtonsPanel( btn ) {
  if ( btn ) {
     btn.addEventListener('click', event => {
      if ( event.target.classList.contains('button_js-prev') ) {
        gues.clearDef();
      }
      else {
        gues.btnNext();
        const eventArrow = new Event('click');
        const eventTarget = setSiblingIteration(4, event.target, 'js--click');
        eventTarget.dispatchEvent(eventArrow);
      }
    });
  }
}

amountList.createGuesList = function(list, name, btn) {
  let gues = new amountList(list.querySelectorAll('.input-options__opt'), name);
  gues.amountPerson();
  addButtonsPanel( btn );
}

amountList.createRoomList = function(list, name, btn) {
  let room = new amountList(list.querySelectorAll('.input-options__opt'), name);
  room.amountPerson();
  addButtonsPanel( btn );
}

let list = document.querySelectorAll('.input-dropdown_event--js');
if ( list ) {
  list.forEach( (v) => {

    const options = v.parentNode.querySelector('.input-options');
    const btn = v.parentNode.querySelector('.input__btns');

    if ( v.getAttribute('data-role') === 'gues' ) {
      if ( options ) {
        new amountList.createGuesList(options, guesName, btn);
      }
      else {
        throw new Error('Отсутствует класс input-options');
      }
    }
    else if ( v.getAttribute('data-role') === 'room' ) {
      if ( options ) {
        // new amountList.createGuesList(options, roomName, btn);
        new amountList.createRoomList(options, roomName, btn);
      }
      else {
        throw new Error('Отсутствует класс input-options');
      }
    }
    else return;
  });
}







