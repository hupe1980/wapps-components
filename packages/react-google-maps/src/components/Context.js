import React from 'react';

export const GoogleMapsContext = React.createContext(null);

export const MapContext = React.createContext(null);

export const withGoogleMapsContext = Component => props => (
  <GoogleMapsContext.Consumer>
    {googleMaps => <Component googleMaps={googleMaps} {...props} />}
  </GoogleMapsContext.Consumer>
);

export const withMapContext = Component => props => (
  <GoogleMapsContext.Consumer>
    {googleMaps => (
      <MapContext.Consumer>
        {map => <Component googleMaps={googleMaps} map={map} {...props} />}
      </MapContext.Consumer>
    )}
  </GoogleMapsContext.Consumer>
);
