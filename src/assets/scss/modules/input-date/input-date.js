let inputDate = document.querySelector('.input-date');
let timer;

// разделитель
let delimiter = '.';

class dataEvents {
  handleEvent(event) {
    let method = "on"+event.type[0].toUpperCase() + event.type.slice(1);
    this[method]();
  }
  onClick() {
    let cursorPosition = String(inputDate.selectionStart);
    let dataStr = inputDate.value;

    let pos = -1;
    let posArr = [];
    while ( (pos = dataStr.indexOf('.', pos+1)) != -1 ) {
      posArr.push(pos);
    }
    let dataRegExp = [
      new RegExp(`\\b[0-${posArr[0]}]\\b`, 'g'),
      new RegExp(`\\b[${posArr[0]+1}-${posArr[1]}]\\b`, 'g'),
      new RegExp(`\\b[${posArr[1]+1}-9]\\b`, 'g')
    ];
    let data = dataRegExp.find(function(element, index, array){
        return element.test(cursorPosition);
    });
    console.log('0 1 2 3 4 5 6 7 8 9 10'.match(data));
  }
  onInput() {

  }
}

let a = 2;

console.log('1 5 6 7 8 10.'.match(/([0-9])/g));

if ( inputDate ) {
  let move = new dataEvents;
  inputDate.addEventListener('click', move);
  inputDate.addEventListener('input', move);
}





function selection(start, end) {
  inputDate.selectionStart = start;
  inputDate.selectionEnd = end;
}

function rules(e) {

  let str = e.data;
  regexp = /[0-9]/;

  if (regexp.test(str) || str == null) {
    //console.log(str);
  }
  else {
    inputDate.value = start;
  }
}



