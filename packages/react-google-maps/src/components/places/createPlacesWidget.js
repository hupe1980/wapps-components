import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../../internal/utils';
import EventHandler from '../../internal/EventHandler';

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

      this.eventHandler = null;
      this.containerElement = document.createElement('div');
      this.nodeRef = React.createRef();
    }

    componentDidMount() {
      this.createWidget();
    }

    componentWillUnmount() {
      this.eventHandler.clearInstanceListeners();
    }

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

      this.widget = new googleMaps.places[type](node, {
        ...options,
        ...rest,
      });

      this.eventHandler = new EventHandler(googleMaps, this.widget);
      this.eventHandler.addListenersFromProps(this.props, evtNames);

      if (map) {
        map.controls[googleMaps.ControlPosition[controlPosition]].push(node);
        this.widget.bindTo('bounds', map);
      }

      entityRef(this.widget);
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
