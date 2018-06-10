# react-script-loader
[![Build Status](https://travis-ci.org/hupe1980/wapps-components.svg?branch=master)](https://travis-ci.org/hupe1980/wapps-components)

React script loader

## Example
```js
import React, { Component } from 'react';
import withScriptLoader from '@wapps/react-script-loader';

class GoogleMaps extends Component {
  ...

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

  ...
}

export default withScriptLoader({
  src: 'https://maps.googleapis.com/maps/api/js...'
})(GoogleMaps)
```

## Installation
- `npm install --save @wapps/react-script-loader`
