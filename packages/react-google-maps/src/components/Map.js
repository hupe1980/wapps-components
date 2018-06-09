import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../internal/utils';
import EventHandler, { getHandlerName } from '../internal/EventHandler';
import OptionsHandler from '../internal/OptionsHandler';
import { MapContext, withGoogleMapsContext } from './Context';

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

const propertyNames = [
  'backgroundColor',
  'center',
  'clickableIcons',
  'disableDefaultUI',
  'disableDoubleClickZoom',
  'draggable',
  'draggingCursor',
  'fullscreenControl',
  'fullscreenControlOption',
  'gestureHandling',
  'heading',
  'keyboardShortcuts',
  'mapTypeControl',
  'mapTypeControlOptions',
  'mapTypeId',
  'maxZoom',
  'minZoom',
  'noClear',
  'panControl',
  'panControlOptions',
  'rotateControl',
  'rotateControlOptions',
  'scaleControl',
  'scaleControlOptions',
  'scrollwheel',
  'streetView',
  'streetViewControl',
  'streetViewControlOption',
  'styles',
  'tilt',
  'zoom',
  'zoomControl',
  'zoomControlOptions',
];

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

evtNames.forEach(name => {
  const handlerName = getHandlerName(name);
  propTypes[handlerName] = PropTypes.func;
  defaultProps[handlerName] = noop;
});

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
    };

    this.optionsHandler = null;
    this.eventHandler = null;
    this.nodeRef = React.createRef();
  }

  componentDidMount() {
    this.createMap();
  }

  componentDidUpdate(prevProps) {
    this.optionsHandler.updateOptionsFormProps(this.props, prevProps);
  }

  componentWillUnmount() {
    this.eventHandler.clearInstanceListeners();
  }

  createMap = () => {
    const { googleMaps, entityRef, options, ...rest } = this.props;

    const node = this.nodeRef.current;

    const map = new googleMaps.Map(node);

    this.optionsHandler = new OptionsHandler(googleMaps, map, propertyNames);
    this.optionsHandler.setOptionsFromProps({
      ...options,
      ...rest,
    });

    this.eventHandler = new EventHandler(googleMaps, map);
    this.eventHandler.addListenersFromProps(this.props, evtNames);

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
