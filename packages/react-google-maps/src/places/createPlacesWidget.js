import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { camelize, noop } from '../utils';

const createPlacesWidget = (type, evtNames = []) => props => {
  const propTypes = {
    entityRef: PropTypes.func,
    controlPosition: PropTypes.string,
  };

  const defaultProps = {
    entityRef: noop,
    controlPosition: 'TOP',
  };

  class Widget extends Component {
    constructor(props) {
      super(props);

      this.listeners = {};
      this.containerElement = document.createElement('div');
      this.nodeRef = React.createRef();
    }

    componentDidMount() {
      this.createWidget();
    }

    componentWillUnmount() {
      Object.keys(this.listeners).forEach(evtName => {
        this.listeners[evtName].remove();
      });
    }

    componentDidUpdate(prevProps) {}

    createWidget = () => {
      const {
        controlPosition,
        googleMaps,
        map,
        entityRef,
        options,
        ...rest
      } = this.props;

      const node = this.nodeRef.current;

      this.autocomplete = new googleMaps.places[type](node, {
        ...options,
        ...rest,
      });

      evtNames.forEach(evtName => {
        this.listeners[evtName] = this.autocomplete.addListener(
          evtName,
          this.handleEvent(evtName),
        );
      });

      if (map) {
        map.controls[googleMaps.ControlPosition[controlPosition]].push(node);
        this.autocomplete.bindTo('bounds', map);
      }

      entityRef(this.autocomplete);
    };

    handleEvent = evtName => event => {
      const handlerName = camelize(`on_${evtName}`);
      if (this.props[handlerName]) {
        this.props[handlerName](this.autocomplete, this.props.map, event);
      }
    };

    render() {
      const children = React.cloneElement(this.props.children, {
        ref: this.nodeRef,
      });

      return React.Children.only(children);
    }
  }

  Widget.displayName = type;
  Widget.propTypes = propTypes;
  Widget.defaultProps = defaultProps;

  return <Widget {...props} />;
};

export default createPlacesWidget;
