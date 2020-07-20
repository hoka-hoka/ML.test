'use strict';
import { setSiblingIteration, getSibling } from './getSibling';

let activeElem = 0;
export function dropDown(elem) {
  elem.forEach(function(item) {
    item.addEventListener('click', function() {
      let elem = new createElem(item, 'js--show');
      elem.list.classList.toggle('hidden');
      if ( elem.item.classList.contains('js--rotate')  || ( elem.item.nextElementSibling ? elem.item.nextElementSibling.classList.contains('js--rotate') : false ) ) {
        elem.rotate = true;
      }
      if ( activeElem && !activeElem.list.classList.contains('hidden') && activeElem.item != elem.item && activeElem.item.nextElementSibling != elem.item && activeElem.item.previousElementSibling != elem.item && activeElem.list != elem.list) {
        activeElem.list.classList.toggle('hidden');
        activeElem.btnRotate();
      }
      elem.btnRotate();
      activeElem = elem;
    });
  });
}

function createElem(item, listName) {
  this.item = item; // element
  this.listName = listName; // js--show
  this.list = this.setSiblingIteration(10, this.item, this.listName); // iterations 10*
}
createElem.prototype.setSiblingIteration = setSiblingIteration;
createElem.prototype.getSibling = getSibling;

createElem.prototype.btnRotate = function() {
  if ( this.rotate ) {
    let elemRotate = this.getSibling(this.item, 'js--rotate');
    if ( this.list.classList.contains('hidden') ) {
      elemRotate.style.setProperty('--btnRotate', '');
    } else {
      elemRotate.style.setProperty('--btnRotate', -135);
    }
  }
}




