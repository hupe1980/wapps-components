import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { noop } from '../internal/utils';
import EventHandler, { getHandlerName } from '../internal/EventHandler';
import OptionsHandler from '../internal/OptionsHandler';
import { withMapContext } from './Context';

/** @see https://developers.google.com/maps/documentation/javascript/reference/3.exp/info-window?hl=de */
const evtNames = [
  'closeclick',
  'content_changed',
  'domready',
  'position_changed',
  'zindex_changed',
];

const propertyNames = ['content', 'options', 'position', 'zIndex'];

const propTypes = {
  entityRef: PropTypes.func,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  entityRef: noop,
};

evtNames.forEach(name => {
  const handlerName = getHandlerName(name);
  propTypes[handlerName] = PropTypes.func;
});

class InfoWindow extends Component {
  constructor(props) {
    super(props);

    this.optionsHandler = null;
    this.eventHandler = null;
    this.containerElement = document.createElement('div');
    this.createInfoWindow();
  }

  componentDidUpdate(prevProps) {
    const { open, ...rest } = this.props;

    this.optionsHandler.updateOptionsFormProps(rest, prevProps);

    if (open !== prevProps.open) {
      open ? this.openWindow() : this.closeWindow();
    }
  }

  componentWillUnmount() {
    if (this.infoWindow) {
      this.infoWindow.setMap(null);
    }

    this.eventHandler.clearInstanceListeners();
  }

  openWindow = () => {
    const { map, anchor, googleMaps } = this.props;

    if (!anchor) return this.infoWindow.open(map);

    if (anchor instanceof googleMaps.Marker) {
      return this.infoWindow.open(map, anchor);
    }

    const position = anchor.getBounds().getCenter();
    this.infoWindow.setPosition(position);
    this.infoWindow.open(map);
  };

  closeWindow = () => {
    this.infoWindow.close();
  };

  createInfoWindow = () => {
    const { googleMaps, open, entityRef, ...rest } = this.props;

    this.infoWindow = new googleMaps.InfoWindow();

    this.optionsHandler = new OptionsHandler(
      googleMaps,
      this.infoWindow,
      propertyNames,
    );
    this.optionsHandler.setOptions({
      content: this.containerElement,
      ...rest,
    });

    this.eventHandler = new EventHandler(googleMaps, this.infoWindow);
    this.eventHandler.addListenersFromProps(this.props, evtNames);

    if (open) this.openWindow();

    entityRef(this.infoWindow);
  };

  render() {
    return ReactDOM.createPortal(
      React.Children.only(this.props.children),
      this.containerElement,
    );
  }
}

InfoWindow.propTypes = propTypes;
InfoWindow.defaultProps = defaultProps;

export default withMapContext(InfoWindow);
