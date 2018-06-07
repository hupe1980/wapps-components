import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { camelize, noop } from '../internal/utils';
import EventHandler from '../internal/EventHandler';
import { MapContext, withGoogleMapsContext } from './Context';

const propTypes = {
  googleMaps: PropTypes.object.isRequired,
  /** The initial Map center. */
  center: PropTypes.object.isRequired,
  /** The initial Map zoom level. */
  zoom: PropTypes.number.isRequired,
  entityRef: PropTypes.func,
};

const defaultProps = {
  entityRef: noop,
};

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/map?hl=de */
const evtNames = [
  'bounds_changed',
  'center_changed',
  'click',
  'dblclick',
  'drag',
  'dragstart',
  'heading_change',
  'idle',
  'maptypeid_changed',
  'mousemove',
  'mouseout',
  'mouseover',
  'projection_changed',
  'rightclick',
  'tilesloaded',
  'tilt_changed',
  'zoom_changed',
];

const updatablePropertyNames = [
  'center',
  'clickableIcons',
  'heading',
  'mapTypeId',
  'options',
  'streetView',
  'tilt',
  'zoom',
];

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
    };

    this.eventHandler = null;
    this.nodeRef = React.createRef();
  }

  componentDidMount() {
    this.createMap();
  }

  componentDidUpdate(prevProps) {
    updatablePropertyNames.forEach(name => {
      if (this.props[name] !== prevProps[name]) {
        const func = camelize(`set_${name}`);

        if (typeof this.state.map[func] === 'function') {
          this.state.map[func](this.props[name]);
        } else {
          throw Error(`There is no method named ${func}!`);
        }
      }
    });
  }

  componentWillUnmount() {
    if (this.state.map) {
      this.setState({ map: null });
    }

    this.eventHandler.clearInstanceListeners();
  }

  createMap = () => {
    const { googleMaps, entityRef, options, ...rest } = this.props;

    const node = this.nodeRef.current;

    const map = new googleMaps.Map(node, {
      ...options,
      ...rest,
    });

    this.eventHandler = new EventHandler(map, this.props, evtNames);

    entityRef(map);

    this.setState({ map });
  };

  render() {
    const { map } = this.state;
    const { children } = this.props;

    return (
      <MapContext.Provider value={map}>
        <div style={{ height: '100%' }} ref={this.nodeRef} role="application">
          Loading map...
        </div>
        {map && children}
      </MapContext.Provider>
    );
  }
}

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default withGoogleMapsContext(Map);
