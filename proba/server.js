
//console.log(Object.getOwnPropertyNames(HTMLInputElement.prototype));
var descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value"); // возвращает дескриптор свойства
console.log(descriptor); // {enumerable: true, configurable: true, get: ƒ, set: ƒ}
let a = 1;
function abra() {

  if ( a == 1 ) {
    return;
  }
  console.log("fefwefwf");

}
abra();