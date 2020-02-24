'use strict';
let elemActive = 0;
export function dropDown(elem) {
  elem.forEach(function(item) {
    item.addEventListener('click', function() {


      let abr = new createElem(item);

      let elemShow = item;
      while( !getSibling(elemShow) ) {
        elemShow = elemShow.parentNode;
      }
      elemShow = getSibling(elemShow);
      elemShow.classList.toggle('hidden');

      if ( elemActive && !elemActive.classList.contains('hidden') && elemActive != elemShow ) {
        elemActive.classList.toggle('hidden');
        /*let elemRotate = new getRotate(elemActive);
        btnRotate(elemRotate, elemActive);*/  
      }
      elemActive = elemShow;

      let elemRotate = getRotate(item);
      btnRotate(elemRotate, elemShow);
      
    });
  });
}

function createElem(item) {
  this.item = item;
  this.getSibling = function() {
    console.log(this.item);
  }
}

function getSibling(elem) {
  let sibling = elem.parentNode.firstElementChild;
  while( sibling ) {
    if ( sibling !== elem && sibling.classList.contains('js--show') ) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }
}

function btnRotate(elem, show) {
  if ( elem ) {
    if ( show.classList.contains('hidden') ) {
      elem.style.setProperty('--btnRotate', '');
    } else {
      elem.style.setProperty('--btnRotate', -135);
    }
  }
}

function getRotate(elem) {
  return elem.closest('.js--rotate') ? elem.closest('.js--rotate') : elem.nextElementSibling ? elem.nextElementSibling.closest('.js--rotate') : null;
}
