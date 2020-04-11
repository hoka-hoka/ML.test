function getSibling(start, list) { // find element with class of js--show
  let sibling = start.parentNode.firstElementChild;
  while ( sibling ) {
    if ( sibling.classList.contains(list) ) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }
}

function setSiblingIteration(iter, elem, find) {
  while ( iter-- ) {
    if ( getSibling(elem, find ) ) {
      return getSibling(elem, find);
    } else {
      elem = elem.parentNode;
    }
  }
}
export { setSiblingIteration, getSibling }