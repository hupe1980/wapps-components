import { Component } from 'react';
import ReactDOMServer from 'react-dom/server';

import { withMapContext } from './Context';

class OverlayView extends Component {
  componentDidMount() {
    this.renderOverlayView();
  }

  componentWillUnmount() {
    if (this.overlayView) {
      this.overlayView.setMap(null);
      this.overlayView = null;
    }
  }

  componentDidUpdate(prevProps) {
    const { map, position, children } = this.props;

    if (
      map !== prevProps.map ||
      position !== prevProps.position ||
      children !== prevProps.children
    ) {
      if (this.overlayView) {
        this.overlayView.setMap(null);
      }
      this.renderOverlayView();
    }
  }

  onAdd() {
    const { children } = this.props;

    this.div = document.createElement('div');

    this.div.innerHTML = ReactDOMServer.renderToString(children);

    const panes = this.overlayView.getPanes();
    panes.markerLayer.appendChild(this.div);
  }

  draw() {
    const { api, position } = this.props;

    const latLng = new api.LatLng(position);
    const overlayProjection = this.overlayView.getProjection();
    const pixel = overlayProjection.fromLatLngToDivPixel(latLng);

    this.div.style.position = 'absolute';
    this.div.style.left = `${pixel.x}px`;
    this.div.style.top = `${pixel.y}px`;
  }

  onRemove() {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  }

  renderOverlayView() {
    const { api, map } = this.props;

    if (!api) {
      return;
    }

    this.overlayView = new api.OverlayView();
    this.overlayView.onAdd = this.onAdd.bind(this);
    this.overlayView.draw = this.draw.bind(this);
    this.overlayView.onRemove = this.onRemove.bind(this);

    this.overlayView.setMap(map);
  }

  render() {
    return null;
  }
}

export default withMapContext(OverlayView);
