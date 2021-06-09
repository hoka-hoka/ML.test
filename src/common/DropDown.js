import Sibling from '../common/Sibling';

class DropDown {
  constructor({ $elem, $par, $list, $focus, extClass, aria }) {
    this.state = { active: false };

    this.props = {
      $element: $elem,
      $parent: $par,
      $options: $list,
      $focused: $focus,
      extClass,
      aria: aria ?? false,
    };
    this.timeOutId = undefined;

    if (!$par.closest($elem)) {
      return;
    }

    $elem.each((i, item) => {
      $(item).on('click', { index: i }, this.handleClick);
    });

    if (aria) {
      $par.get(0).addEventListener('blur', this.onBlurHandler, true);
      $par.get(0).addEventListener('focus', this.onFocusHandler, false);
    }
  }

  setState(state) {
    this.componentDidUpdate(state);
    this.state = { ...state };
  }

  handleClick = (event) => {
    const { data, target } = event;
    $(target).data('trigger', data.index);
    this.setState({
      ...this.state,
      active: !this.state.active,
    });
    this.rasingFocus();
  };

  rasingFocus() {
    const $focused = this.props.$focused;
    setTimeout(() => {
      $focused.focus();
    });
  }

  onFocusHandler = () => {
    const $focused = this.props.$focused;
    $focused.on('keydown', this.handleKeydown);
  };

  onBlurHandler = (event) => {
    const $par = this.props.$parent;
    $par.off('keydown');
    setTimeout(() => {
      const $active = $(document.activeElement);
      if (!$par.is($active) && !$par.find($active).length) {
        this.setState({ ...this.state, active: false });
      }
    });
  };

  handleKeydown = (event) => {
    const $par = this.props.$parent;
    if (!$par.get(0).isSameNode(event.target)) {
      return;
    }
    const keyCode = event.keyCode || event.charCode;
    if (![32, 13].includes(keyCode)) return;
    this.setState({
      active: !this.state.active,
    });
  };

  changeActive(newState) {
    const { $parent, $options, extClass } = this.props;
    if (newState.active == this.state.active) {
      return;
    }

    if (newState.active) {
      $parent.addClass(extClass);
      $options
        .css({
          opacity: '0',
          display: 'block',
        })
        .animate({ opacity: 1 }, 200);
    } else {
      $parent.removeClass(extClass);
      $options
        .css('opacity', 1)
        .animate({ opacity: 0 }, 100, (e) => $options.css('display', 'none'));
    }
  }

  componentDidUpdate(newState) {
    this.changeActive(newState);
  }
}

export default DropDown;
