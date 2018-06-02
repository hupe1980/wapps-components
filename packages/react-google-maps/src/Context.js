import React from 'react';

const ApiContext = React.createContext(null);

const MapContext = React.createContext(null);

const withApiContext = Component => props => (
  <ApiContext.Consumer>
    {api => <Component {...props} api={api} />}
  </ApiContext.Consumer>
);

const withMapContext = Component => props => (
  <ApiContext.Consumer>
    {api => (
      <MapContext.Consumer>
        {map => <Component {...props} api={api} map={map} />}
      </MapContext.Consumer>
    )}
  </ApiContext.Consumer>
);

export { ApiContext, withApiContext, MapContext, withMapContext };
