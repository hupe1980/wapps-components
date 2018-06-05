import { Component } from 'react';
import PropTypes from 'prop-types';

import { camelize, noop } from '../utils';
import { withMapContext } from '../Context';

const propTypes = {
  entityRef: PropTypes.func,
  controlPosition: PropTypes.string,
};

const defaultProps = {
  entityRef: noop,
  controlPosition: 'TOP',
};

/** see https://developers.google.com/maps/documentation/javascript/reference/3.exp/places-widget?hl=de#Autocomplete */
const evtNames = ['place_changed'];

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.listeners = {};

    this.createAutocomplete();
  }

  componentWillUnmount() {
    Object.keys(this.listeners).forEach(evtName => {
      this.listeners[evtName].remove();
    });
  }

  componentDidUpdate(prevProps) {}

  createAutocomplete = () => {
    const {
      controlPosition,
      googleMaps,
      map,
      entityRef,
      options,
      ...rest
    } = this.props;

    const input = document.createElement('input');
    map.controls[googleMaps.ControlPosition[controlPosition]].push(input);

    this.autocomplete = new googleMaps.places.Autocomplete(input, {
      ...options,
      ...rest,
    });

    evtNames.forEach(evtName => {
      this.listeners[evtName] = this.autocomplete.addListener(
        evtName,
        this.handleEvent(evtName),
      );
    });

    this.autocomplete.bindTo('bounds', map);

    entityRef(this.autocomplete);
  };

  handleEvent = evtName => event => {
    const handlerName = camelize(`on_${evtName}`);
    if (this.props[handlerName]) {
      this.props[handlerName](this.entity, this.props.map, event);
    }
  };

  render() {
    return null;
  }
}

Autocomplete.propTypes = propTypes;
Autocomplete.defaultProps = defaultProps;

export default withMapContext(Autocomplete);
