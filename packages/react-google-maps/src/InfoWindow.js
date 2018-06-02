import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { withMapContext } from './Context';

class InfoWindow extends Component {
  constructor(props) {
    super(props);

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
      this.infowWindow = null;
    }
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

  onOpen() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  renderInfoWindow() {
    const { api, disableAutoPan, open, position } = this.props;

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
      disableAutoPan,
      position: pos,
    });

    this.infoWindow.addListener('closeclick', this.onClose.bind(this));
    this.infoWindow.addListener('domready', this.onOpen.bind(this));

    if (open) this.openWindow();
  }

  render() {
    return ReactDOM.createPortal(
      React.Children.only(this.props.children),
      this.containerElement,
    );
  }
}

export default withMapContext(InfoWindow);
