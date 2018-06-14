import { Component } from 'react';
import PropTypes from 'prop-types';

import EventHandler, { getHandlerName } from '../../internal/EventHandler';
import OptionsHandler from '../../internal/OptionsHandler';
import { noop } from '../../internal/utils';
import { withMapContext } from '../Context';

/** @see https://developers.google.com/maps/documentation/javascript/reference/3.exp/visualization?hl=de#HeatmapLayer */
const evtNames = [];

const propertyNames = [
  'data',
  'dissipating',
  'gradient',
  'map',
  'maxIntensity',
  'opacity',
  'radius',
];

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

class HeatmapLayer extends Component {
  constructor(props) {
    super(props);

    this.optionsHandler = null;
    this.eventHandler = null;
    this.createHeatmapLayer();
  }

  componentWillUnmount() {
    this.eventHandler.clearInstanceListeners();
    if (this.heatmapLayer) {
      this.heatmapLayer.setMap(null);
    }
  }

  componentDidUpdate(prevProps) {
    const { map, visible } = this.props;

    this.optionsHandler.updateOptionsFormProps(this.props, prevProps);

    if (visible !== prevProps.visible) {
      visible ? this.heatmapLayer.setMap(map) : this.heatmapLayer.setMap(null);
    }
  }

  createHeatmapLayer = () => {
    const { googleMaps, entityRef, map, visible, ...rest } = this.props;

    this.heatmapLayer = new googleMaps.visualization.HeatmapLayer();

    this.optionsHandler = new OptionsHandler(
      googleMaps,
      this.heatmapLayer,
      propertyNames,
    );
    this.optionsHandler.setOptions({
      ...rest,
    });

    this.eventHandler = new EventHandler(googleMaps, this.heatmapLayer);
    this.eventHandler.addListenersFromProps(this.props, evtNames);

    if (visible) {
      this.heatmapLayer.setMap(map);
    }

    entityRef(this.heatmapLayer);
  };

  render() {
    return null;
  }
}

HeatmapLayer.propTypes = propTypes;
HeatmapLayer.defaultProps = defaultProps;

export default withMapContext(HeatmapLayer);
