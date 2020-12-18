function getSibling(start, list) {
  // ищет элемент list внутри родителя элемента start

  let sibling = start.parentNode.firstElementChild;
  while (sibling) {
    if (typeof list === 'object') {
      if (sibling.isEqualNode(list)) {
        return sibling;
      }
    } else {
      if (sibling.classList.contains(list)) {
        return sibling;
      }
    }
    sibling = sibling.nextElementSibling;
  }
}

function setSiblingIteration(iter, elem, find) {
  // ищет элемент find, начиная с родителя elem
  while (iter--) {
    if (getSibling(elem, find)) {
      return getSibling(elem, find);
    } else {
      elem = elem.parentNode;
    }
  }
}

export { setSiblingIteration, getSibling };
