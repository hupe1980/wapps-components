import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import withScriptLoader from '@wapps/react-script-loader';

const propTypes = {
  api: PropTypes.object.isRequired,
};

const getDisplayName = name => `withGoogleMapsApi(${name})`;

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

const withGoogleMapsApi = WrappedComponent => {
  const GoogleMapsApi = props => {
    const { api, ...rest } = props;
    const Component = withScriptLoader(getAttributes(api))(WrappedComponent);

    return <Component {...rest} />;
  };

  const name =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  GoogleMapsApi.displayName = getDisplayName(name);
  GoogleMapsApi.WrappedComponent = WrappedComponent;
  GoogleMapsApi.propTypes = propTypes;

  return hoistStatics(GoogleMapsApi, WrappedComponent);
};

export default withGoogleMapsApi;
