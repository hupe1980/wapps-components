import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

const propTypes = {
  autostart: PropTypes.bool,
  throttle: PropTypes.number,
};

const defaultProps = {
  autostart: true,
  throttle: 0,
};

const getDisplayName = name => `withAnimationFrame(${name})`;

const withAnimationFrame = WrappedComponent => {
  class AnimatedComponent extends Component {
    constructor(props) {
      super(props);

      this.animatableRef = React.createRef();
      this.lastInvocation = 0;
      this.isActive = false;
    }

    componentDidMount() {
      const { autostart } = this.props;

      if (autostart) {
        this.startAnimation();
      }
    }

    componentWillUnmount() {
      this.stopAnimation();
    }

    startAnimation = () => {
      if (!this.isActive) {
        this.isActive = true;
        this.frame = window.requestAnimationFrame(this.loop);
      }
    };

    loop = time => {
      if (!this.isActive) return;

      const { throttle } = this.props;
      const node = this.animatableRef.current;
      const hasTimeElapsed = time - this.lastInvocation >= throttle;

      if (hasTimeElapsed) {
        this.lastInvocation = time;
        node.onAnimationFrame(time, this.lastInvocation);
      }

      window.requestAnimationFrame(this.loop);
    };

    stopAnimation = () => {
      this.isActive = false;
      window.cancelAnimationFrame(this.frame);
    };

    render() {
      return (
        <WrappedComponent
          ref={this.animatableRef}
          startAnimation={this.startAnimation}
          stopAnimation={this.stopAnimation}
          {...this.props}
        />
      );
    }
  }

  const name =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  AnimatedComponent.displayName = getDisplayName(name);
  AnimatedComponent.WrappedComponent = WrappedComponent;
  AnimatedComponent.propTypes = propTypes;
  AnimatedComponent.defaultProps = defaultProps;

  return hoistStatics(AnimatedComponent, WrappedComponent);
};

export default withAnimationFrame;
