import { Component } from 'react';
import PropTypes from 'prop-types';

import { withMapContext } from '../Context';
import { noop } from '../../internal/utils';
import EventHandler, { getHandlerName } from '../../internal/EventHandler';
import OptionsHandler from '../../internal/OptionsHandler';

/** @see https://developers.google.com/maps/documentation/javascript/reference/3.exp/drawing?hl=de#DrawingManager */
const evtNames = [
  'circlecomplete',
  'markercomplete',
  'overlaycomplete',
  'polygoncomplete',
  'polylinecomplete',
  'rectanglecomplete',
];

const propertyNames = ['drawingMode', 'map', 'options'];

const propTypes = {
  entityRef: PropTypes.func,
};

const defaultProps = {
  entityRef: noop,
};

evtNames.forEach(name => {
  const handlerName = getHandlerName(name);
  propTypes[handlerName] = PropTypes.func;
});

class DrawingManager extends Component {
  constructor(props) {
    super(props);

    this.optionsHandler = null;
    this.eventHandler = null;
    this.createDrawingManager();
  }

  componentWillUnmount() {
    if (this.drawingManager) {
      this.drawingManager.setMap(null);
    }

    this.eventHandler.clearInstanceListeners();
  }

  componentDidUpdate(prevProps) {
    this.optionsHandler.updateOptionsFormProps(this.props, prevProps);
  }

  createDrawingManager = () => {
    const { googleMaps, map, entityRef, options, ...rest } = this.props;

    this.drawingManager = new googleMaps.drawing.DrawingManager();

    this.optionsHandler = new OptionsHandler(
      googleMaps,
      this.drawingManager,
      propertyNames,
    );
    this.optionsHandler.setOptions({
      ...options,
      ...rest,
    });

    this.eventHandler = new EventHandler(googleMaps, this.drawingManager);
    this.eventHandler.addListenersFromProps(this.props, evtNames);

    this.drawingManager.setMap(map);

    entityRef(this.drawingManager);
  };

  render() {
    return null;
  }
}

DrawingManager.propTypes = propTypes;
DrawingManager.defaultProps = defaultProps;

export default withMapContext(DrawingManager);
