import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventHandler from '../internal/EventHandler';
import { camelize, noop } from '../internal/utils';

const createEntity = (
  type,
  evtNames = [],
  updatablePropertyNames = [],
) => props => {
  const propTypes = {
    entityRef: PropTypes.func,
  };

  const defaultProps = {
    entityRef: noop,
  };

  class Entity extends Component {
    constructor(props) {
      super(props);

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
      updatablePropertyNames.forEach(name => {
        if (this.props[name] !== prevProps[name]) {
          const func = camelize(`set_${name}`);

          if (typeof this.entity[func] === 'function') {
            this.entity[func](this.props[name]);
          } else {
            throw Error(`There is no method named ${func}!`);
          }
        }
      });
    }

    createEntity = () => {
      const { googleMaps, map, entityRef, options, ...rest } = this.props;

      this.entity = new googleMaps[type]({
        ...options,
        ...rest,
      });

      this.eventHandler = new EventHandler(this.entity, this.props, evtNames);

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
