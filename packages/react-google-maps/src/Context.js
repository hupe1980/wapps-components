import React from 'react';

const GoogleMapsContext = React.createContext(null);

const MapContext = React.createContext(null);

const withGoogleMapsContext = Component => props => (
  <GoogleMapsContext.Consumer>
    {googleMaps => <Component {...props} googleMaps={googleMaps} />}
  </GoogleMapsContext.Consumer>
);

const withMapContext = Component => props => (
  <GoogleMapsContext.Consumer>
    {googleMaps => (
      <MapContext.Consumer>
        {map => <Component {...props} googleMaps={googleMaps} map={map} />}
      </MapContext.Consumer>
    )}
  </GoogleMapsContext.Consumer>
);

export { GoogleMapsContext, withGoogleMapsContext, MapContext, withMapContext };
