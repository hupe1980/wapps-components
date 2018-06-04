import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { withMapContext } from './Context';

const propTypes = {
  visible: PropTypes.bool,
};

const defaultProps = {
  visible: true,
};

class OverlayView extends Component {
  constructor(props) {
    super(props);

    this.containerElement = document.createElement('div');

    this.createOverlayView();
  }

  componentWillUnmount() {
    if (this.overlayView) {
      this.overlayView.setMap(null);
    }
  }

  componentDidUpdate(prevProps) {
    const { position, children, visible } = this.props;

    if (
      position !== prevProps.position ||
      children !== prevProps.children ||
      visible !== prevProps.visible
    ) {
      this.draw();
    }
  }

  onAdd = () => {
    const panes = this.overlayView.getPanes();
    panes.markerLayer.appendChild(this.containerElement);
  };

  draw = () => {
    const { api, position, visible } = this.props;

    const overlayProjection = this.overlayView.getProjection();
    const latLng = new api.LatLng(position);
    const pixel = overlayProjection.fromLatLngToDivPixel(latLng);

    this.containerElement.style.position = 'absolute';
    this.containerElement.style.left = `${pixel.x}px`;
    this.containerElement.style.top = `${pixel.y}px`;

    if (visible) {
      this.containerElement.style.visibility = 'visible';
    } else {
      this.containerElement.style.visibility = 'hidden';
    }
  };

  onRemove = () => {
    if (this.containerElement) {
      this.containerElement.remove();
    }
  };

  createOverlayView = () => {
    const { api, map } = this.props;

    this.overlayView = new api.OverlayView();

    this.overlayView.onAdd = this.onAdd;
    this.overlayView.draw = this.draw;
    this.overlayView.onRemove = this.onRemove;

    this.overlayView.setMap(map);
  };

  render() {
    return ReactDOM.createPortal(
      React.Children.only(this.props.children),
      this.containerElement,
    );
  }
}

OverlayView.propTypes = propTypes;
OverlayView.defaultProps = defaultProps;

export default withMapContext(OverlayView);
