import { Component } from 'react';
import PropTypes from 'prop-types';

import EventHandler, { getHandlerName } from '../internal/EventHandler';
import OptionsHandler from '../internal/OptionsHandler';
import { noop } from '../internal/utils';
import { withMapContext } from './Context';

/** @see https://developers.google.com/maps/documentation/javascript/reference/3.exp/image-overlay?hl=de#GroundOverlay */
const evtNames = ['click', 'dblclick'];

const propertyNames = ['clickable', 'map', 'opacity'];

const propTypes = {
  entityRef: PropTypes.func,
  visible: PropTypes.bool,
};

const defaultProps = {
  entityRef: noop,
  visible: true,
};

evtNames.forEach(name => {
  const handlerName = getHandlerName(name);
  propTypes[handlerName] = PropTypes.func;
});

class GroundOverlay extends Component {
  constructor(props) {
    super(props);

    this.optionsHandler = null;
    this.eventHandler = null;
    this.createGroundOverlay();
  }

  componentWillUnmount() {
    this.eventHandler.clearInstanceListeners();
    if (this.overlay) {
      this.overlay.setMap(null);
    }
  }

  componentDidUpdate(prevProps) {
    const { map, visible } = this.props;

    this.optionsHandler.updateOptionsFormProps(this.props, prevProps);

    if (visible !== prevProps.visible) {
      visible ? this.overlay.setMap(map) : this.overlay.setMap(null);
    }
  }

  createGroundOverlay = () => {
    const {
      googleMaps,
      entityRef,
      url,
      bounds,
      map,
      visible,
      ...rest
    } = this.props;

    this.overlay = new googleMaps.GroundOverlay(url, bounds);

    this.optionsHandler = new OptionsHandler(
      googleMaps,
      this.overlay,
      propertyNames,
    );
    this.optionsHandler.setOptions({
      ...rest,
    });

    this.eventHandler = new EventHandler(googleMaps, this.overlay);
    this.eventHandler.addListenersFromProps(this.props, evtNames);

    if (visible) {
      this.overlay.setMap(map);
    }

    entityRef(this.overlay);
  };

  render() {
    return null;
  }
}

GroundOverlay.propTypes = propTypes;
GroundOverlay.defaultProps = defaultProps;

export default withMapContext(GroundOverlay);
