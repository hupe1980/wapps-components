import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { camelize } from './utils';
import { withMapContext } from './Context';

const evtNames = [
  'closeclick',
  'content_changed',
  'domready',
  'position_changed',
  'zindex_changed',
];

class InfoWindow extends Component {
  constructor(props) {
    super(props);

    this.listeners = {};
    this.containerElement = document.createElement('div');
  }

  componentDidMount() {
    this.renderInfoWindow();
  }

  componentDidUpdate(prevProps) {
    const { map, position, open, marker } = this.props;

    if (map !== prevProps.map) {
      this.renderInfoWindow();
    }

    if (position !== prevProps.position) {
      this.updatePosition();
    }

    if (
      open !== prevProps.open ||
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

  updatePosition() {
    const { position } = this.props;
    this.infoWindow.setPosition(position);
  }

  openWindow() {
    const { map, marker } = this.props;
    this.infoWindow.open(map, marker);
  }

  closeWindow() {
    this.infoWindow.close();
  }

  renderInfoWindow() {
    const { api, open, position, ...rest } = this.props;

    if (!api) {
      return;
    }

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
  }

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
