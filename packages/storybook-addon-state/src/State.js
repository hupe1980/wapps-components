import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  storyFn: PropTypes.func,
  context: PropTypes.object,
  children: PropTypes.node,
  store: PropTypes.object.isRequired,
};

const defaultProps = {
  storyFn: null,
  context: null,
  children: null,
};

class State extends Component {
  constructor(props) {
    super(props);

    this.state = props.store.state;
  }

  componentDidMount() {
    const { store } = this.props;
    this.subscription = store.subscribe(state => this.setState(state));
  }

  componentWillUnmount() {
    const { store } = this.props;
    store.unsubscribe(this.subscription);
  }

  render() {
    const { storyFn, context, children } = this.props;

    const child = children
      ? React.cloneElement(this.props.children, {
          ...this.state,
        })
      : storyFn(context);
    return React.Children.only(child);
  }
}

State.propTypes = propTypes;
State.defaultProps = defaultProps;

export default State;
