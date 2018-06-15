# react-google-maps
[![Build Status](https://travis-ci.org/hupe1980/wapps-components.svg?branch=master)](https://travis-ci.org/hupe1980/wapps-components)

React google maps components

## Example
```js
import React from 'react';
import GoogleMaps, { Map } from '@wapps/react-google-maps';

const App = () => (
  <GoogleMaps api={{ key: YOUR_googleMaps_KEY }}>
    <div style={{ height: '100vh', width: '100wh'}}>
      <Map
        center={{
          lat: 52.520008,
          lng: 13.404954,
        }}
        zoom={15}
      />
    </div>
  </GoogleMaps>
);

export default App;
```

## Live Demo
For a demo, check out https://hupe1980.github.io/wapps-components/

## Installation
- `npm install --save @wapps/react-google-maps`
