import { Component } from 'react';
import PropTypes from 'prop-types';

import { withMapContext } from '../Context';
import { camelize, noop } from '../../internal/utils';
import EventHandler from '../../internal/EventHandler';

const propTypes = {
  entityRef: PropTypes.func,
};

const defaultProps = {
  entityRef: noop,
};

/** https://developers.google.com/maps/documentation/javascript/reference/3.exp/drawing?hl=de#DrawingManager */
const evtNames = [
  'circlecomplete',
  'markercomplete',
  'overlaycomplete',
  'polygoncomplete',
  'polylinecomplete',
  'rectanglecomplete',
];

const updatablePropertyNames = ['drawingMode', 'map', 'options'];

class DrawingManager extends Component {
  constructor(props) {
    super(props);

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
    updatablePropertyNames.forEach(name => {
      if (this.props[name] !== prevProps[name]) {
        const func = camelize(`set_${name}`);

        if (typeof this.drawingManager[func] === 'function') {
          this.drawingManager[func](this.props[name]);
        } else {
          throw Error(`There is no method named ${func}!`);
        }
      }
    });
  }

  createDrawingManager = () => {
    const { googleMaps, map, entityRef, options, ...rest } = this.props;

    this.drawingManager = new googleMaps.drawing.DrawingManager({
      ...options,
      ...rest,
    });

    this.eventHandler = new EventHandler(
      this.drawingManager,
      this.props,
      evtNames,
    );

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
