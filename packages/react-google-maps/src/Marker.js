import { Component } from 'react';
import PropTypes from 'prop-types';

import { camelize } from './utils';
import { withMapContext } from './Context';

const propTypes = {
  /** Which animation to play when marker is added to a map. */
  animation: PropTypes.oneOf(['bounce', 'drop']),
  /** Marker position. */
  position: PropTypes.object.isRequired,
};

const evtNames = [
  'animation_changed',
  'click',
  'clickable_changed',
  'cursor_changed',
  'dblclick',
  'drag',
  'dragend',
  'draggable_changed',
  'dragstart',
  'flat_changed',
  'icon_changed',
  'mousedown',
  'mouseout',
  'mouseover',
  'mouseup',
  'position_changed',
  'rightclick',
  'shape_changed',
  'title_changed',
  'visible_changed',
  'zindex_changed',
];

class Marker extends Component {
  constructor(props) {
    super(props);

    this.listeners = {};
  }

  componentDidMount() {
    this.renderMarker();
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;

      Object.keys(this.listeners).forEach(evtName => {
        this.listeners[evtName].remove();
      });
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
    const { api, animation, position, markerRef, ...rest } = this.props;

    if (!api) {
      return;
    }

    let pos = position;
    if (!(pos instanceof api.LatLng)) {
      pos = new api.LatLng(position.lat, position.lng);
    }

    let ani = animation;
    if (ani) {
      ani = ani.toLowerCase();

      if (ani === 'bounce') {
        ani = api.Animation.BOUNCE;
      } else if (ani === 'drop') {
        ani = api.Animation.DROP;
      }
    }

    this.marker = new api.Marker({
      position: pos,
      animation: ani,
      ...rest,
    });

    evtNames.forEach(evtName => {
      this.listeners[evtName] = this.marker.addListener(
        evtName,
        this.handleEvent(evtName),
      );
    });

    if (markerRef) markerRef(this.marker);
  };

  handleEvent = evtName => event => {
    const handlerName = camelize(`on_${evtName}`);
    if (this.props[handlerName]) {
      this.props[handlerName](this.marker, event);
    }
  };

  render() {
    return null;
  }
}

Marker.propTypes = propTypes;

export default withMapContext(Marker);