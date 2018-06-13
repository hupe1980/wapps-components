import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import withScriptLoader from '@wapps/react-script-loader';

const propTypes = {
  api: PropTypes.object,
};

const defaultProps = {
  api: {},
};

const getDisplayName = name => `withStripeCheckoutApi(${name})`;

const getAttributes = ({ url, ...attributes }) => ({
  src: url || 'https://checkout.stripe.com/checkout.js',
  ...attributes,
});

const withStripeCheckoutApi = WrappedComponent => {
  class StripeCheckoutApi extends Component {
    constructor(props) {
      super(props);

      const { api } = props;
      this.component = withScriptLoader(getAttributes(api))(WrappedComponent);
    }

    render() {
      const { api, ...rest } = this.props;
      const Api = this.component;

      return <Api {...rest} />;
    }
  }

  const name =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  StripeCheckoutApi.displayName = getDisplayName(name);
  StripeCheckoutApi.WrappedComponent = WrappedComponent;
  StripeCheckoutApi.propTypes = propTypes;
  StripeCheckoutApi.defaultProps = defaultProps;

  return hoistStatics(StripeCheckoutApi, WrappedComponent);
};

export default withStripeCheckoutApi;
