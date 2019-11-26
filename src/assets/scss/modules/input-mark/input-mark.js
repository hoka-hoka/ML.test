let dropDownGues = document.querySelectorAll('.rectangle__gues_js_click');
function dropDownGueses(obj) {
  obj.forEach(function(item) {
    item.addEventListener('click', function() {
      let drop = item.parentNode.querySelector('.input-options');
      if ( drop.classList.contains('hidden') ) {
        drop.classList.remove('hidden')
      } else {
        drop.classList.add('hidden');
      }
    });
  });
}
let drop2 = new dropDownGueses(dropDownGues);