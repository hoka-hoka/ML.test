class AmountList {
  constructor(box, name) {
    this.optionList = box; //  container
    this.name = name; // map
    this.amountInp = this.optionList.parentNode.querySelector(
      '.input__field_clicked-js',
    );
    this.rezult = this.prepareAmountPer();
  }

  prepareAmountPer = () => {
    if (!this.amountInp) {
      return;
    }
    const amount = this.amountInp.dataset.amount;
    const rezult = amount ? amount.split(' ').map((item) => +item) : [0, 0, 0];
    return rezult;
  };

  handlerBtns(target, line, index, restore = false) {
    let btnPrev = line.querySelector('.button__mark_minus-js');
    let amountPer = line.querySelector('.input-options__amount-js');
    let btnNext = line.querySelector('.button__mark_plus-js');

    if (target) {
      if (target.contains(btnNext)) {
        amountPer.innerText = restore ? 0 : +amountPer.innerText + 1;
      } else if (target.contains(btnPrev) && amountPer.innerHTML > 0) {
        amountPer.innerText = restore ? 0 : +amountPer.innerText - 1;
      }
    } else if (restore) {
      amountPer.innerText = 0;
    } else {
      amountPer.innerText = this.rezult[index];
    }

    +amountPer.innerText
      ? btnPrev.classList.remove('button__mark_default')
      : btnPrev.classList.add('button__mark_default');

    this.rezult[index] = restore ? 0 : +amountPer.innerText;

    if (this.amountInp) {
      this.amountInp.value = this.vocabularyDef()[0].join(', ');
      this.amountInp.title = this.vocabularyDef()[1].join(', ');
    }
  }

  computeAmountPerson({ restore } = {}) {
    let optionLine = this.optionList.querySelectorAll(
      '.input-options__marks_elem-js',
    );
    optionLine.forEach((line, index) => {
      if (!restore) {
        line.addEventListener('click', (event) => {
          this.handlerBtns(event.target, line, index);
        });
      }
      this.handlerBtns(false, line, index, restore);
    });
  }

  vocabularyDef() {
    let rezultAnswer = [];
    let row = 0;
    let rezult = [];
    if (this.name.length === 2) {
      rezult = [this.rezult[0] + this.rezult[1], this.rezult[2]];
    } else {
      rezult = this.rezult;
    }
    rezult.forEach((value, index) => {
      switch (value) {
        case 0:
          break;
        case 1:
          rezultAnswer[index] = value + ' ' + this.name[index][0];
          break;
        case 2:
        case 3:
        case 4:
          rezultAnswer[index] = value + ' ' + this.name[index][1];
          break;
        default:
          rezultAnswer[index] = value + ' ' + this.name[index][2];
      }
    });
    rezultAnswer = rezultAnswer.filter((word) => word !== undefined);
    let rezultTitle = rezultAnswer.slice();
    if (rezultAnswer.length == 3) {
      rezultAnswer[2] = '...';
    }
    this.defaultButtonPrev();
    return [rezultAnswer, rezultTitle];
  }

  defaultButtonPrev() {
    let btnPrev = this.optionList.querySelector('.button_prev-js');
    if (btnPrev) {
      if (this.amountInp?.value) {
        btnPrev.classList.remove('button_hidden');
      } else {
        btnPrev.classList.add('button_hidden');
      }
    }
  }

  toApply() {
    this.amountInp.value = this.vocabularyDef()[0].join(', ');
    this.amountInp.title = this.vocabularyDef()[1].join(', ');
  }

  clearAmount() {
    this.computeAmountPerson({ restore: true });
    this.amountInp.value = null;
    this.amountInp.title = null;
  }
}
export default AmountList;
