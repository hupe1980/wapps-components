import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scrollIntoView from 'scroll-into-view-if-needed';
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed';

const propTypes = {
  behavior: PropTypes.oneOf(['auto', 'smooth', 'instant']),
  scrollMode: PropTypes.oneOf(['always', 'if-needed']),
};

const defaultProps = {
  behavior: 'auto',
  scrollMode: 'always',
};

class Scroll extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.scroll();
  }

  componentDidUpdate() {
    this.scroll();
  }

  scroll = () => {
    const { scrollMode, behavior } = this.props;
    const node = this.ref.current;

    if (node) {
      const scrollIntoViewSmoothly =
        'scrollBehavior' in document.documentElement.style
          ? scrollIntoView
          : smoothScrollIntoView;

      scrollIntoViewSmoothly(node, {
        scrollMode,
        behavior,
      });
    }
  };

  render() {
    const { children } = this.props;
    return <div ref={this.ref}>{children}</div>;
  }
}

Scroll.propTypes = propTypes;
Scroll.defaultProps = defaultProps;

export default Scroll;
