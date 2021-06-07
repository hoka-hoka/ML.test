export default class Mark {
  constructor(name, parent, moveCallback) {
    this.today = parent.querySelector('.calendar__day-num_current');
    this.mark = document.createElement('span');
    this.moveCallback = moveCallback;
    this.mark.className = name;
    this.prev = 0;
    this.parent = parent;
  }

  moveAt = (td) => {
    if (td.nodeName !== 'TD') {
      return;
    }
    if (td.classList.contains('calendar__day-other')) {
      return;
    }
    td.classList.add('calendar__day-num_active');
    if (this.prev && td !== this.prev) {
      if (
        this.prev.childNodes.length === 2 ||
        (this.prev === this.today && this.prev.childNodes.length !== 4)
      ) {
        this.prev.classList.remove('calendar__day-num_active');
      }
    }
    this.prev = td;
    td.appendChild(this.mark);
    Track('calendar__day-num_active', this.parent);

    this.day = td;
  };

  pullOf = () => {
    document.onmousemove = (event) => {
      if (
        (this.day && this.day.isSameNode(event.target)) ||
        event.target.nodeName != 'TD'
      ) {
        return;
      }
      this.moveAt(event.target);
      if (this.moveCallback) {
        this.moveCallback();
      }
    };
  };

  reload = () => {
    document.onmouseup = () => {
      document.onmousemove = null;
      this.mark.onmouseup = null;
    };
    document.ondragstart = () => {
      return false;
    };
  };

  markFullStack = (td) => {
    this.pullOf();
    this.moveAt(td);
    this.reload();

    if (this.moveCallback) {
      this.moveCallback();
    }
  };
}

function Track(find, parent) {
  let cells = parent.querySelectorAll('.calendar__day-num');
  let cellFind = [];
  let borderRs = parent.querySelectorAll(
    '.calendar__day-num_left_border, .calendar__day-num_right_border',
  );
  if (borderRs.length) {
    borderRs[0].classList.remove('calendar__day-num_left_border');
    borderRs[1].classList.remove('calendar__day-num_right_border');
  }
  let cellActive = parent.querySelectorAll('.calendar__day-num_painted');
  if (cellActive.length) {
    for (let val of cellActive) {
      val.classList.remove('calendar__day-num_painted');
    }
  }
  [...cells].findIndex((element, index) => {
    if (element.classList.contains(find)) {
      cellFind.push(index);
    }
  });
  var trackElements = [...cells].slice(
    cellFind[0],
    cellFind[cellFind.length - 1] + 1,
  );
  if (trackElements.length >= 2) {
    trackElements[0].classList.add('calendar__day-num_left_border');
    trackElements[trackElements.length - 1].classList.add(
      'calendar__day-num_right_border',
    );
  }
  for (let val of trackElements) {
    if (!val.classList.contains('calendar__day-other')) {
      val.classList.add('calendar__day-num_painted');
    }
  }
}
