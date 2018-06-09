import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventHandler from '../internal/EventHandler';
import OptionsHandler from '../internal/OptionsHandler';
import { noop } from '../internal/utils';

const createEntity = (type, evtNames, propertyNames) => props => {
  const propTypes = {
    entityRef: PropTypes.func,
  };

  const defaultProps = {
    entityRef: noop,
  };

  class Entity extends Component {
    constructor(props) {
      super(props);

      this.optionsHandler = null;
      this.eventHandler = null;
      this.createEntity();
    }

    componentWillUnmount() {
      if (this.entity) {
        this.entity.setMap(null);
      }

      this.eventHandler.clearInstanceListeners();
    }

    componentDidUpdate(prevProps) {
      this.optionsHandler.updateOptionsFormProps(this.props, prevProps);
    }

    createEntity = () => {
      const { googleMaps, map, entityRef, options, ...rest } = this.props;

      this.entity = new googleMaps[type]();

      this.optionsHandler = new OptionsHandler(
        googleMaps,
        this.entity,
        propertyNames,
      );
      this.optionsHandler.setOptions({
        ...options,
        ...rest,
      });

      this.eventHandler = new EventHandler(googleMaps, this.entity);
      this.eventHandler.addListenersFromProps(this.props, evtNames);

      this.entity.setMap(map);

      entityRef(this.entity);
    };

    render() {
      return null;
    }
  }

  Entity.displayName = type;
  Entity.propTypes = propTypes;
  Entity.defaultProps = defaultProps;

  return <Entity {...props} />;
};

export default createEntity;
