import React from 'react';

const GoogleMapsContext = React.createContext(null);

const MapContext = React.createContext(null);

const withGoogleMapsContext = Component => props => (
  <GoogleMapsContext.Consumer>
    {googleMaps => <Component googleMaps={googleMaps} {...props} />}
  </GoogleMapsContext.Consumer>
);

const withMapContext = Component => props => (
  <GoogleMapsContext.Consumer>
    {googleMaps => (
      <MapContext.Consumer>
        {map => <Component googleMaps={googleMaps} map={map} {...props} />}
      </MapContext.Consumer>
    )}
  </GoogleMapsContext.Consumer>
);

export { GoogleMapsContext, withGoogleMapsContext, MapContext, withMapContext };
