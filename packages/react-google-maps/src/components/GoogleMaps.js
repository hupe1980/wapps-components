import React, { Component, Fragment } from 'react';

import { GoogleMapsContext } from './Context';
import withGoogleMapsApi from './withGoogleMapsApi';

class GoogleMaps extends Component {
  state = {
    googleMaps: null,
  };

  componentDidMount() {
    const { hasScriptsLoaded, hasScriptsLoadedSuccessfully } = this.props;
    if (hasScriptsLoaded && hasScriptsLoadedSuccessfully) {
      this.setState({
        googleMaps: window.google.maps,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { hasScriptsLoaded, hasScriptsLoadedSuccessfully } = this.props;
    if (hasScriptsLoaded && !prevProps.hasScriptsLoaded) {
      if (hasScriptsLoadedSuccessfully) {
        this.setState({
          googleMaps: window.google.maps,
        });
      }
    }
  }

  render() {
    const { googleMaps } = this.state;
    const { children } = this.props;

    if (!googleMaps) return null;

    return (
      <GoogleMapsContext.Provider value={googleMaps}>
        <Fragment>{children}</Fragment>
      </GoogleMapsContext.Provider>
    );
  }
}

export default withGoogleMapsApi(GoogleMaps);
