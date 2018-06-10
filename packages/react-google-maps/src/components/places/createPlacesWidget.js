import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../../internal/utils';
import EventHandler, { getHandlerName } from '../../internal/EventHandler';
import OptionsHandler from '../../internal/OptionsHandler';

const createPlacesWidget = (type, evtNames, propertyNames) => props => {
  const propTypes = {
    children: PropTypes.node,
    controlPosition: PropTypes.string,
    entityRef: PropTypes.func,
  };

  const defaultProps = {
    children: <input type="text" />,
    controlPosition: 'TOP',
    entityRef: noop,
  };

  evtNames.forEach(name => {
    const handlerName = getHandlerName(name);
    propTypes[handlerName] = PropTypes.func;
  });

  class Widget extends Component {
    constructor(props) {
      super(props);

      this.optionsHandler = null;
      this.eventHandler = null;
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
        ...rest
      } = this.props;

      const node = this.nodeRef.current;

      this.widget = new googleMaps.places[type](node);

      this.optionsHandler = new OptionsHandler(
        googleMaps,
        this.widget,
        propertyNames,
      );
      this.optionsHandler.setOptions({
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
