import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { camelize, noop } from '../internal/utils';
import EventHandler from '../internal/EventHandler';
import { withMapContext } from './Context';

const propTypes = {
  entityRef: PropTypes.func,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  entityRef: noop,
};

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/info-window?hl=de */
const evtNames = [
  'closeclick',
  'content_changed',
  'domready',
  'position_changed',
  'zindex_changed',
];

const updatablePropertyNames = ['content', 'options', 'position', 'zIndex'];

class InfoWindow extends Component {
  constructor(props) {
    super(props);

    this.eventHandler = null;
    this.containerElement = document.createElement('div');
    this.createInfoWindow();
  }

  componentDidUpdate(prevProps) {
    updatablePropertyNames.forEach(name => {
      if (this.props[name] !== prevProps[name]) {
        const func = camelize(`set_${name}`);

        if (typeof this.infoWindow[func] === 'function') {
          this.infoWindow[func](this.props[name]);
        } else {
          throw Error(`There is no method named ${func}!`);
        }
      }
    });

    const { open } = this.props;

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
    const { googleMaps, open, options, entityRef, ...rest } = this.props;

    this.infoWindow = new googleMaps.InfoWindow({
      content: this.containerElement,
      ...options,
      ...rest,
    });

    this.eventHandler = new EventHandler(this.infoWindow, this.props, evtNames);

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
