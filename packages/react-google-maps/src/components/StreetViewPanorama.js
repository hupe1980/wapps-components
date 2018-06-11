import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../internal/utils';
import EventHandler, { getHandlerName } from '../internal/EventHandler';
import OptionsHandler from '../internal/OptionsHandler';
import { withMapContext } from './Context';

const evtNames = [
  'closeclick',
  'pano_changed',
  'position_changed',
  'pov_changed',
  'resize',
  'status_changed',
  'visible_changed',
  'zoom_changed',
];

const propertyNames = [
  'addressControl',
  'addressControlOption',
  'clickToGo',
  'disableDefaultUI',
  'disableDoubleClickZoom',
  'enableCloseButton',
  'fullscreenControl',
  'fullscreenControlOptions',
  'imageDateControl',
  'linksControl',
  'motionTracking',
  'motionTrackingControl',
  'motionTrackingControlOptions',
  'panControl',
  'panControlOptions',
  'pano',
  'position',
  'pov',
  'scrollwheel',
  'showRoadLabels',
  'visible',
  'zoom',
  'zoomControl',
  'zoomControlOptions',
];

const propTypes = {
  container: PropTypes.node,
  entityRef: PropTypes.func,
};

const defaultProps = {
  container: <div style={{ height: '100%' }} role="application" />,
  entityRef: noop,
};

evtNames.forEach(name => {
  const handlerName = getHandlerName(name);
  propTypes[handlerName] = PropTypes.func;
});

class StreetViewPanorama extends Component {
  constructor(props) {
    super(props);

    this.optionsHandler = null;
    this.eventHandler = null;
    this.nodeRef = React.createRef();
  }

  componentDidMount() {
    this.createPanorama();
  }

  componentDidUpdate(prevProps) {
    this.optionsHandler.updateOptionsFormProps(this.props, prevProps);
  }

  componentWillUnmount() {
    const { map } = this.props;

    this.eventHandler.clearInstanceListeners();

    if (map) map.setStreetView(null);
  }

  createPanorama = () => {
    const { googleMaps, map, entityRef, ...rest } = this.props;

    const node = this.nodeRef.current;

    this.panorama = new googleMaps.StreetViewPanorama(node);

    this.optionsHandler = new OptionsHandler(
      googleMaps,
      this.panorama,
      propertyNames,
    );
    this.optionsHandler.setOptions({
      ...rest,
    });

    this.eventHandler = new EventHandler(googleMaps, this.panorama);
    this.eventHandler.addListenersFromProps(this.props, evtNames);

    if (map) map.setStreetView(this.panorama);

    entityRef(this.panorama);
  };

  render() {
    const { container } = this.props;
    return React.cloneElement(container, {
      ref: this.nodeRef,
    });
  }
}

StreetViewPanorama.propTypes = propTypes;
StreetViewPanorama.defaultProps = defaultProps;

export default withMapContext(StreetViewPanorama);
