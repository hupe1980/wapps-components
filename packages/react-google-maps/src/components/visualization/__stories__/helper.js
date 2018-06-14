import React from 'react';

import GoogleMaps from '../../GoogleMaps';

const apiKey = process.env.REACT_GOOGLE_MAPS_API_KEY;

export const Api = ({ children }) => (
  <GoogleMaps api={{ key: apiKey, libraries: ['visualization'] }}>
    {children}
  </GoogleMaps>
);

export const Container = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
    }}
  >
    {children}
  </div>
);
