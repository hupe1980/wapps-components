import { Component } from 'react';

import { withMapContext } from './Context';

class Marker extends Component {
  componentDidMount() {
    this.renderMarker();
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.api !== prevProps.api ||
      this.props.map !== prevProps.map ||
      this.props.position !== prevProps.position ||
      this.props.animation !== prevProps.animation ||
      this.props.icon !== prevProps.icon
    ) {
      if (this.marker) {
        this.marker.setMap(null);
      }
      this.renderMarker();
    }
  }

  renderMarker = () => {
    const { api, position, onClick, markerRef, ...rest } = this.props;

    if (!api) {
      return;
    }

    let pos = position;
    if (!(pos instanceof api.LatLng)) {
      pos = new api.LatLng(position.lat, position.lng);
    }

    this.marker = new api.Marker({
      position: pos,
      ...rest,
    });

    this.marker.addListener('click', () => onClick(this.marker));

    if (markerRef) markerRef(this.marker);
  };

  render() {
    return null;
  }
}

export default withMapContext(Marker);
