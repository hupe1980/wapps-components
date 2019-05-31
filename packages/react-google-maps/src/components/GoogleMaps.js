import React from 'react';
import useScript from 'react-script-hook';

import { GoogleMapsContext } from './Context';

export default function GoogleMaps(props) {
  const { api, children } = props;
  const [loading, error] = useScript(getAttributes(api));

  if (loading || error) return null;

  return (
    <GoogleMapsContext.Provider value={window.google.maps}>
      <>{children}</>
    </GoogleMapsContext.Provider>
  );
}

const getAttributes = ({ key, libraries, version, url, ...attributes }) => {
  const scriptSrc = url || 'https://maps.googleapis.com/maps/api/js';

  const params = {
    key,
    libraries: libraries ? libraries.join(',') : null,
    v: version || '3.exp',
  };

  const paramStr = Object.keys(params)
    .filter(k => !!params[k])
    .map(k => `${k}=${params[k]}`)
    .join('&');

  return {
    src: `${scriptSrc}?${paramStr}`,
    ...attributes,
  };
};
