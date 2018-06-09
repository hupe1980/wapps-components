import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventHandler, { getHandlerName } from '../internal/EventHandler';
import OptionsHandler from '../internal/OptionsHandler';
import { noop, compose } from '../internal/utils';
import withDirectionsService from './withDirectionsService';
import { withMapContext } from './Context';

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/directions?hl=de#DirectionsRenderer */
const evtNames = ['directions_changed'];

const propertyNames = [
  'directions',
  'draggable',
  'hideRouteList',
  'infoWindow',
  'map',
  'markerOptions',
  'panel',
  'polylineOptions',
  'preserveViewport',
  'routeIndex',
  'suppressBicyclingLayer',
  'suppressInfoWindows',
  'suppressMarkers',
  'suppressPolylines',
];

const propTypes = {
  entityRef: PropTypes.func,
};

const defaultProps = {
  entityRef: noop,
};

evtNames.forEach(name => {
  const handlerName = getHandlerName(name);
  propTypes[handlerName] = PropTypes.func;
  defaultProps[handlerName] = noop;
});

class DirectionsRenderer extends Component {
  constructor(props) {
    super(props);

    this.optionsHandler = null;
    this.eventHandler = null;
    this.nodeRef = React.createRef();
  }

  componentDidMount() {
    this.createDirectionsRenderer();
  }

  componentWillUnmount() {
    this.eventHandler.clearInstanceListeners();
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    }
  }

  componentDidUpdate(prevProps) {
    this.optionsHandler.updateOptionsFormProps(this.props, prevProps);
  }

  createDirectionsRenderer = () => {
    const { googleMaps, entityRef, panel, ...rest } = this.props;

    this.directionsRenderer = new googleMaps.DirectionsRenderer();

    const node = panel ? document.querySelector(panel) : this.nodeRef.current;
    if (node) {
      this.directionsRenderer.setPanel(node);
    }

    this.optionsHandler = new OptionsHandler(
      googleMaps,
      this.directionsRenderer,
      propertyNames,
    );
    this.optionsHandler.setOptions({
      ...rest,
    });

    this.eventHandler = new EventHandler(googleMaps, this.directionsRenderer);
    this.eventHandler.addListenersFromProps(this.props, evtNames);

    entityRef(this.directionsRenderer);
  };

  render() {
    if (!this.props.children) return null;

    const children = React.cloneElement(this.props.children, {
      ref: this.nodeRef,
    });
    return React.Children.only(children);
  }
}

DirectionsRenderer.propTypes = propTypes;
DirectionsRenderer.defaultProps = defaultProps;

export default compose(withMapContext, withDirectionsService)(
  DirectionsRenderer,
);
