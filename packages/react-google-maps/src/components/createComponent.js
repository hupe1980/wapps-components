import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventHandler, { getHandlerName } from '../internal/EventHandler';
import OptionsHandler from '../internal/OptionsHandler';
import { noop } from '../internal/utils';

const createComponent = (type, evtNames, propertyNames) => props => {
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

  class Comp extends Component {
    constructor(props) {
      super(props);

      this.optionsHandler = null;
      this.eventHandler = null;
      this.createComp();
    }

    componentWillUnmount() {
      this.eventHandler.clearInstanceListeners();
      if (this.comp) {
        this.comp.setMap(null);
      }
    }

    componentDidUpdate(prevProps) {
      this.optionsHandler.updateOptionsFormProps(this.props, prevProps);
    }

    createComp = () => {
      const { googleMaps, entityRef, ...rest } = this.props;

      this.comp = new googleMaps[type]();

      this.optionsHandler = new OptionsHandler(
        googleMaps,
        this.comp,
        propertyNames,
      );
      this.optionsHandler.setOptions({
        ...rest,
      });

      this.eventHandler = new EventHandler(googleMaps, this.comp);
      this.eventHandler.addListenersFromProps(this.props, evtNames);

      entityRef(this.comp);
    };

    render() {
      if (!this.props.children) return null;

      const children = React.cloneElement(this.props.children, {
        anchor: this.comp,
      });
      return React.Children.only(children);
    }
  }

  Comp.displayName = type;
  Comp.propTypes = propTypes;
  Comp.defaultProps = defaultProps;

  return <Comp {...props} />;
};

export default createComponent;
