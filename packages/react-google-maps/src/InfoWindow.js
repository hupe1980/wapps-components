import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { camelize } from './utils';
import { withMapContext } from './Context';

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

    const { map, marker, open, position } = this.props;

    if (
      open !== prevProps.open ||
      map !== prevProps.map ||
      marker !== prevProps.marker ||
      position !== prevProps.position
    ) {
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
    const { map, marker } = this.props;
    this.infoWindow.open(map, marker);
  };

  closeWindow = () => {
    this.infoWindow.close();
  };

  createInfoWindow = () => {
    const { api, open, position, ...rest } = this.props;

    let pos = null;
    if (position) {
      if (!(pos instanceof api.LatLng)) {
        pos = new api.LatLng(position.lat, position.lng);
      }
    }

    this.infoWindow = new api.InfoWindow({
      content: this.containerElement,
      position: pos,
      ...rest,
    });

    evtNames.forEach(evtName => {
      this.listeners[evtName] = this.infoWindow.addListener(
        evtName,
        this.handleEvent(evtName),
      );
    });

    if (open) this.openWindow();
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

export default withMapContext(InfoWindow);
