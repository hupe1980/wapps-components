import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { camelize, noop } from './utils';
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

    this.listeners = {};
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

    Object.keys(this.listeners).forEach(evtName => {
      this.listeners[evtName].remove();
    });
  }

  openWindow = () => {
    const { map, anchor } = this.props;
    this.infoWindow.open(map, anchor);
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

    evtNames.forEach(evtName => {
      this.listeners[evtName] = this.infoWindow.addListener(
        evtName,
        this.handleEvent(evtName),
      );
    });

    if (open) this.openWindow();

    entityRef(this.infoWindow);
  };

  handleEvent = evtName => event => {
    const handlerName = camelize(`on_${evtName}`);
    if (this.props[handlerName]) {
      this.props[handlerName](this.infoWindow, event);
    }
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
