import { Component } from 'react';
import PropTypes from 'prop-types';

import { withMapContext } from './Context';
import { noop } from '../internal/utils';

const propTypes = {
  map: PropTypes.object.isRequired,
  onError: PropTypes.func,
  usePanTo: PropTypes.bool,
};

const defaultProps = {
  onError: noop,
  usePanTo: true,
};

class Geolocation extends Component {
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handleLocationFound, () =>
        this.handleLocationError(true),
      );
    } else {
      this.handleLocationError(false);
    }
  }

  handleLocationFound = position => {
    const { map, usePanTo } = this.props;
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    usePanTo ? map.panTo(currentPosition) : map.setCenter(currentPosition);
  };

  handleLocationError = browserHasGeolocation => {
    const { onError } = this.props;
    onError(browserHasGeolocation);
  };

  render() {
    return null;
  }
}

Geolocation.propTypes = propTypes;
Geolocation.defaultProps = defaultProps;

export default withMapContext(Geolocation);
