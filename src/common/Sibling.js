class Sibling {
  static getSibling({ $start, find }) {
    const sibling = $start.parent().find(`.${find}`);
    return sibling.length ? sibling : null;
  }

  static getOlderSibling({ iter, $elem, find }) {
    let $start = $elem;
    let sibling;
    for (let i = 0; i < iter; i += 1) {
      sibling = this.getSibling({ $start, find });
      if (!sibling) {
        $start = $start.parent();
      } else {
        break;
      }
    }
    return sibling;
  }
}

export default Sibling;
