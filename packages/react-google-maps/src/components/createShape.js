import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventHandler from '../internal/EventHandler';
import { camelize, noop } from '../internal/utils';

const createShape = (
  type,
  evtNames = [],
  updatablePropertyNames = [],
) => props => {
  const propTypes = {
    entityRef: PropTypes.func,
  };

  const defaultProps = {
    entityRef: noop,
  };

  class Shape extends Component {
    constructor(props) {
      super(props);

      this.eventHandler = null;
      this.createShape();
    }

    componentWillUnmount() {
      if (this.shape) {
        this.shape.setMap(null);
      }

      this.eventHandler.clearInstanceListeners();
    }

    componentDidUpdate(prevProps) {
      updatablePropertyNames.forEach(name => {
        if (this.props[name] !== prevProps[name]) {
          const func = camelize(`set_${name}`);

          if (typeof this.shape[func] === 'function') {
            this.shape[func](this.props[name]);
          } else {
            throw Error(`There is no method named ${func}!`);
          }
        }
      });
    }

    createShape = () => {
      const { googleMaps, map, entityRef, options, ...rest } = this.props;

      this.shape = new googleMaps[type]({
        ...options,
        ...rest,
      });

      this.eventHandler = new EventHandler(this.shape, this.props, evtNames);

      this.shape.setMap(map);

      entityRef(this.shape);
    };

    render() {
      if (!this.props.children) return null;

      const children = React.cloneElement(this.props.children, {
        anchor: this.shape,
      });
      return React.Children.only(children);
    }
  }

  Shape.displayName = type;
  Shape.propTypes = propTypes;
  Shape.defaultProps = defaultProps;

  return <Shape {...props} />;
};

export default createShape;
