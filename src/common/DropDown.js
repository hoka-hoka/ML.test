import Sibling from '../common/Sibling';

class DropDown {
  constructor({ $elem, $par, $list, $focus, addedClass, aria }) {
    this.state = { active: false, overflow: false };

    this.props = {
      $element: $elem,
      $parent: $par,
      $options: $list,
      $focused: $focus,
      class: addedClass,
      aria: aria ?? false,
    };
    this.timeOutId = undefined;

    if (!$par.closest($elem)) {
      return;
    }

    this.handleClick = this.handleClick.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);

    $elem.on('mousedown', this.handleClick);

    if (aria) {
      $par.get(0).addEventListener('blur', this.onBlurHandler, true);
      $par.get(0).addEventListener('focus', this.onFocusHandler, false);
    }
  }

  setState(state) {
    this.componentDidUpdate(state);
    this.state = { ...state };
  }

  handleClick() {
    const $elem = this.props.$element;
    const $par = this.props.$parent;
    this.setState({
      ...this.state,
      active: !this.state.active,
      overflow: !this.state.overflow,
    });
    this.rasingFocus();
  }

  rasingFocus() {
    const $focused = this.props.$focused;
    setTimeout(() => {
      $focused.focus();
    });
  }

  onFocusHandler() {
    const $focused = this.props.$focused;
    $focused.on('keydown', this.handleKeydown);
  }

  onBlurHandler(event) {
    const $par = this.props.$parent;
    $par.off('keydown');
    setTimeout(() => {
      const $active = $(document.activeElement);

      if (!$par.is($active) && !$par.find($active).length) {
        this.setState({ ...this.state, active: false, overflow: false });
      }
    });
  }

  handleKeydown(event) {
    const $par = this.props.$parent;
    if (!$par.get(0).isSameNode(event.target)) {
      return;
    }
    const keyCode = event.keyCode || event.charCode;
    if (![32, 13].includes(keyCode)) return;
    this.setState({
      active: !this.state.active,
      overflow: !this.state.overflow,
    });
  }

  changeActive(newState) {
    const $par = this.props.$parent;
    if (newState.active == this.state.active) {
      return;
    }
    newState.active
      ? $par.addClass(this.props.class)
      : $par.removeClass(this.props.class);
  }

  changeOverflow(newState) {
    if (newState.active === this.state.active) {
      return;
    }
    if (newState.overflow) {
      $(document.body).css('overflow', 'hidden');
    } else {
      $(document.body).css('overflow', 'auto');
    }
  }

  componentDidUpdate(newState) {
    this.changeActive(newState);
    this.changeOverflow(newState);
  }
}

export default DropDown;
