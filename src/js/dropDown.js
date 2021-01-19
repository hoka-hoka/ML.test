import { setSiblingIteration } from './getSibling';

function dropDown(elem, parent = elem.parentNode, className) {
  if (!elem) {
    return;
  }
  const elementClass = className;
  const elementFound = setSiblingIteration(6, elem, parent);

  dropDown.active = undefined;
  elem.addEventListener('click', () => {
    if (dropDown.active && dropDown.active !== elementFound) {
      dropDown.active.classList.remove(elementClass);
    }
    if (elementFound && !elementFound.classList.contains(elementClass)) {
      elementFound.classList.add(elementClass);
      dropDown.active = elementFound;
    } else if (elementFound.classList.contains(elementClass)) {
      elementFound.classList.remove(elementClass);
    } else {
      throw new Error(`элемент parent: ${parent} не найден!`);
    }
  });
}
export default dropDown;
