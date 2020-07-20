'use strict';
import { getSibling, setSiblingIteration } from './getSibling';

class amountList {
  constructor(box, name) {
    this.container = box;
    this.name = name;
    this.rezult = new Array();
  }
  amountPerson() {
    this.container.forEach( (value, index) => {
      value.addEventListener( 'click', (event) => {
        let btnPrev = getSibling(event.target, 'button__mark_minus');
        let amount = getSibling(event.target, 'input-options__offensive');
        let btnNext = getSibling(event.target, 'button__mark_plus');
        if ( event.target === btnNext ) {
          amount.innerText = +amount.innerText + 1;
        }
        else if ( event.target === btnPrev && amount.innerHTML > 0 ) {
          amount.innerText = +amount.innerText - 1;
        }
        +amount.innerText ? btnPrev.classList.remove('button__mark_default') : btnPrev.classList.add('button__mark_default');
        this.rezult[index] = +amount.innerText;
        this.amountInp = setSiblingIteration(5,event.target,'input');
        this.amountInp.value = this.vocabularyDef()[0].join(', ');
        this.amountInp.title = this.vocabularyDef()[1].join(', ');
      });
    });
  }
  vocabularyDef() {
    let rezultAnswer = [];
    let row = 0;
    this.rezult.forEach( (value, index) => {
      switch(value) {
        case 0: break;
        case 1: rezultAnswer[index] = value + ' ' + this.name[index][0]; break;
        case 2:
        case 3:
        case 4: rezultAnswer[index] = value + ' ' + this.name[index][1]; break;
        default: rezultAnswer[index] = value + ' ' + this.name[index][2];
      }
    });
    rezultAnswer = rezultAnswer.filter(word => word !== undefined);
    let rezultTitle = rezultAnswer.slice();
    if ( rezultAnswer.length == 3 ) {
      rezultAnswer[2] = '...';
    }
    return [rezultAnswer, rezultTitle];
  }
  btnNext() {
    this.amountInp.value = this.vocabularyDef()[0].join(', ');
    this.amountInp.title = this.vocabularyDef()[1].join(', ');
  }
  clearDef() {
    this.amountInp.value = null;
    this.amountInp.title = null;
  }

}
export { amountList }