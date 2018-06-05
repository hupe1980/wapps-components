# react-google-maps
React google maps component

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

### Marker
To place a marker on the Map, include it as a child of the <Map /> component.

```js
import React from 'react';
import GoogleMaps, { Map, Marker } from '@wapps/react-google-maps';

const App = () => (
  <GoogleMaps api={{ key: YOUR_googleMaps_KEY }}>
    <div style={{ height: '100vh', width: '100wh'}}>
      <Map
        center={{
          lat: 52.520008,
          lng: 13.404954,
        }}
        zoom={15}
      >
        <Marker
          position={{
            lat: 52.520008,
            lng: 13.404954,
          }}
        />
      </Map>
    </div>
  </GoogleMaps>
);

export default App;
```

### OverlayView
To place a overlay on the Map, include it as a child of the <Map /> component.

```js
import React from 'react';
import GoogleMaps, { Map, OverlayView } from '@wapps/react-google-maps';

const App = () => (
  <GoogleMaps api={{ key: YOUR_googleMaps_KEY }}>
    <div style={{ height: '100vh', width: '100wh'}}>
      <Map
        center={{
          lat: 52.520008,
          lng: 13.404954,
        }}
        zoom={15}
      >
      <OverlayView
        position={{
          lat: 52.520008,
          lng: 13.404954,
        }}
      >
        <div
          style={{ backgroundColor: 'blue', color: 'white', padding: '15px' }}
        >
          Hello!
        </div>
      </OverlayView>
      </Map>
    </div>
  </GoogleMaps>
);

export default App;
```
