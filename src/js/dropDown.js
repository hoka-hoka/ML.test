export function dropDown(elem) {
  elem.forEach(function(item) {
    item.addEventListener('click', function() {
      item.parentNode.nextElementSibling.classList.toggle('hidden');
    });
  });
}
