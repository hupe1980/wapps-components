import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { camelize, noop } from './utils';
import { MapContext, withApiContext } from './Context';

const propTypes = {
  api: PropTypes.object,
  /** The initial Map center. */
  center: PropTypes.object.isRequired,
  /** The initial Map zoom level. */
  zoom: PropTypes.number.isRequired,
  mapRef: PropTypes.func,
};

const defaultProps = {
  panTo: null,
  mapRef: noop,
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

    this.listeners = {};
    this.nodeRef = React.createRef();
  }

  componentDidMount() {
    if (!this.state.map) this.loadMap();
  }

  componentDidUpdate(prevProps) {
    if (!this.state.map) return this.loadMap();

    updatablePropertyNames.forEach(name => {
      if (this.props[name] !== prevProps[name]) {
        const func = camelize(`set_${name}`);

        if (typeof this.state.map[func] === 'function') {
          return this.state.map[func](this.props[name]);
        }

        throw Error(`There is no method named ${func}!`);
      }
    });
  }

  componentWillUnmount() {
    if (this.state.map) {
      this.setState({ map: null });
    }

    Object.keys(this.listeners).forEach(evtName => {
      this.listeners[evtName].remove();
    });
  }

  loadMap = () => {
    const { api, mapRef, ...rest } = this.props;

    if (!api) {
      return;
    }

    const node = this.nodeRef.current;

    const map = new api.Map(node, {
      ...rest,
    });

    evtNames.forEach(evtName => {
      this.listeners[evtName] = map.addListener(
        evtName,
        this.handleEvent(evtName),
      );
    });

    mapRef(map);

    this.setState({ map }, () => {});
  };

  handleEvent = evtName => event => {
    const handlerName = camelize(`on_${evtName}`);
    if (this.props[handlerName]) {
      this.props[handlerName](this.state.map, event);
    }
  };

  render() {
    const { map } = this.state;
    const { children } = this.props;

    return (
      <MapContext.Provider value={map}>
        <div style={{ height: '100%' }} ref={this.nodeRef} role="application">
          Loading map...
        </div>
        {children}
      </MapContext.Provider>
    );
  }
}

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default withApiContext(Map);
