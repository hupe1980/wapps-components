import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { camelize, noop } from '../internal/utils';
import EventHandler from '../internal/EventHandler';
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

const updatablePropertyNames = [
  'animation',
  'clickable',
  'cursor',
  'draggable',
  'icon',
  'label',
  'map',
  'opacity',
  'options',
  'position',
  'shape',
  'title',
  'visible',
  'zIndex',
];

class Marker extends Component {
  constructor(props) {
    super(props);

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
    updatablePropertyNames.forEach(name => {
      if (this.props[name] !== prevProps[name]) {
        const func = camelize(`set_${name}`);

        if (typeof this.marker[func] === 'function') {
          this.marker[func](this.props[name]);
        } else {
          throw Error(`There is no method named ${func}!`);
        }
      }
    });
  }

  createMarker = () => {
    const { googleMaps, animation, entityRef, options, ...rest } = this.props;

    let ani = animation;
    if (ani) {
      ani = ani.toLowerCase();

      if (ani === 'bounce') {
        ani = googleMaps.Animation.BOUNCE;
      } else if (ani === 'drop') {
        ani = googleMaps.Animation.DROP;
      }
    }

    this.marker = new googleMaps.Marker({
      animation: ani,
      ...options,
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
