import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { camelize } from './utils';
import { MapContext, withApiContext } from './Context';

const propTypes = {
  api: PropTypes.object,
  /** The initial Map center. */
  center: PropTypes.object.isRequired,
  /** The initial Map zoom level. */
  zoom: PropTypes.number.isRequired,
};

const defaultProps = {};

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

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
    };

    this.listeners = {};
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    if (!this.state.map) this.loadMap();
  }

  componentDidUpdate(prevProps) {
    const { api, ...rest } = this.props;

    if (!this.state.map) {
      this.loadMap();
    } else {
      this.state.map.setOptions(rest);
    }
  }

  componentWillUnmount() {
    if (this.state.map) {
      this.setState({ map: null });

      Object.keys(this.listeners).forEach(evtName => {
        this.listeners[evtName].remove();
      });
    }
  }

  loadMap = () => {
    const { api, ...rest } = this.props;

    if (!api) {
      return;
    }

    const node = this.mapRef.current;

    const map = new api.Map(node, {
      ...rest,
    });

    evtNames.forEach(evtName => {
      this.listeners[evtName] = map.addListener(
        evtName,
        this.handleEvent(evtName),
      );
    });

    this.setState({ map });
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
        <div style={{ height: '100%' }} ref={this.mapRef} role="application">
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
