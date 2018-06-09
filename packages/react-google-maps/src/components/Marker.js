import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../internal/utils';
import EventHandler from '../internal/EventHandler';
import OptionsHandler from '../internal/OptionsHandler';
import { withMapContext } from './Context';

const propTypes = {
  /** Which animation to play when marker is added to a map. */
  animation: PropTypes.oneOf(['bounce', 'drop']),
  /** Marker position. */
  position: PropTypes.object.isRequired,
  entityRef: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  entityRef: noop,
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

const propertyNames = [
  'anchorPoint',
  'animation',
  'clickable',
  'crossOnDrag',
  'cursor',
  'draggable',
  'icon',
  'label',
  'map',
  'opacity',
  'optimized',
  'position',
  'shape',
  'title',
  'visible',
  'zIndex',
];

class Marker extends Component {
  constructor(props) {
    super(props);

    this.optionsHandler = null;
    this.eventHandler = null;
    this.createMarker();
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }

    this.eventHandler.clearInstanceListeners();
  }

  componentDidUpdate(prevProps) {
    this.optionsHandler.updateOptionsFormProps(this.props, prevProps);
  }

  createMarker = () => {
    const { googleMaps, animation, entityRef, ...rest } = this.props;

    let ani = animation;
    if (ani) {
      ani = ani.toLowerCase();

      switch (ani) {
        case 'bounce':
          ani = googleMaps.Animation.BOUNCE;
          break;
        case 'drop':
          ani = googleMaps.Animation.DROP;
          break;
        default:
          ani = null;
      }
    }

    this.marker = new googleMaps.Marker();

    this.optionsHandler = new OptionsHandler(
      googleMaps,
      this.marker,
      propertyNames,
    );
    this.optionsHandler.setOptions({
      animation: ani,
      ...rest,
    });

    this.eventHandler = new EventHandler(googleMaps, this.marker);
    this.eventHandler.addListenersFromProps(this.props, evtNames);

    entityRef(this.marker);
  };

  render() {
    if (!this.props.children) return null;

    const children = React.cloneElement(this.props.children, {
      anchor: this.marker,
    });
    return React.Children.only(children);
  }
}

Marker.propTypes = propTypes;
Marker.defaultProps = defaultProps;

export default withMapContext(Marker);
