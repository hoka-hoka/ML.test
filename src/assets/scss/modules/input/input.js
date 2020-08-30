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

amountList.createGuesList = function(list, name, btn) {
  let gues = new amountList(list.querySelectorAll('.input-options__opt'), name);
  gues.amountPerson();
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
amountList.createRoomList = function(list, name) {
  let room = new amountList(list.querySelectorAll('.input-options__opt'), name);
  room.amountPerson()
}

if ( document.body.id === 'index' || document.body.id === 'details') {
  let list = document.querySelector('.input-options');
  let guesBtn = list.lastElementChild;
  new amountList.createGuesList(list, guesName, guesBtn);
}
else if ( document.body.id === 'product' ) {
  let list  = document.querySelectorAll('.input-options');
  let guesBtn = list[0].lastElementChild;

  new amountList.createGuesList(list[0], guesName, guesBtn);
  new amountList.createRoomList(list[1], roomName);
}




