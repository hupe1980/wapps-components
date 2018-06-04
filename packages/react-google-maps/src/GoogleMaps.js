import React, { Component, Fragment } from 'react';

import { ApiContext } from './Context';
import withGoogleMapsApi from './withGoogleMapsApi';

class GoogleMaps extends Component {
  state = {
    api: null,
  };

  componentDidMount() {
    const { hasScriptsLoaded, hasScriptsLoadedSuccessfully } = this.props;
    if (hasScriptsLoaded && hasScriptsLoadedSuccessfully) {
      this.setState({
        api: window.google.maps,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { hasScriptsLoaded, hasScriptsLoadedSuccessfully } = this.props;
    if (hasScriptsLoaded && !prevProps.hasScriptsLoaded) {
      if (hasScriptsLoadedSuccessfully) {
        this.setState({
          api: window.google.maps,
        });
      }
    }
  }

  render() {
    const { api } = this.state;
    const { children } = this.props;

    if (!api) return null;

    return (
      <ApiContext.Provider value={api}>
        <Fragment>{children}</Fragment>
      </ApiContext.Provider>
    );
  }
}

export default withGoogleMapsApi(GoogleMaps);
