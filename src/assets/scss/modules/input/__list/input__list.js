let drop = document.querySelectorAll('.input__list');
let key = "";
let i = 0;
let b;

drop.forEach(function(item) {
  item.addEventListener('keydown', function(event) {
    b = key;
    key = key + event.key;
    i++;
    if ( key == "AltArrowDown" ) {
      event.preventDefault();
      key = "";
    }
    if ( i > 2 ) {
      key = event.key;
    }
  }, false);
});



