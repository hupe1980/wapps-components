import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventHandler from '../internal/EventHandler';
import OptionsHandler from '../internal/OptionsHandler';
import { noop } from '../internal/utils';

const createShape = (type, evtNames, propertyNames) => props => {
  const propTypes = {
    entityRef: PropTypes.func,
  };

  const defaultProps = {
    entityRef: noop,
  };

  class Shape extends Component {
    constructor(props) {
      super(props);

      this.optionsHandler = null;
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
      this.optionsHandler.updateOptionsFormProps(this.props, prevProps);
    }

    createShape = () => {
      const { googleMaps, map, entityRef, options, ...rest } = this.props;

      this.shape = new googleMaps[type]();

      this.optionsHandler = new OptionsHandler(
        googleMaps,
        this.shape,
        propertyNames,
      );
      this.optionsHandler.setOptions({
        ...options,
        ...rest,
      });

      this.eventHandler = new EventHandler(googleMaps, this.shape);
      this.eventHandler.addListenersFromProps(this.props, evtNames);

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
