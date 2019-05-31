import React from 'react';
import PropTypes from 'prop-types';
import useScript from 'react-script-hook';

const propTypes = {
  src: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  children: PropTypes.node,
  LoadingIndicator: PropTypes.func,
  ErrorIndicator: PropTypes.func,
  token: PropTypes.func,
  source: PropTypes.func,
  //Highly recommended
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  amount: PropTypes.number,
  locale: PropTypes.string,
  zipCode: PropTypes.bool,
  billingAddress: PropTypes.bool,
  //Optional
  currency: PropTypes.string,
  panelLabel: PropTypes.string,
  shippingAddress: PropTypes.bool,
  email: PropTypes.string,
  allowRememberMe: PropTypes.bool,
  opened: PropTypes.func,
  closed: PropTypes.func,
};

const defaultProps = {
  src: 'https://checkout.stripe.com/checkout.js',
  children: <button>Purchase</button>,
  LoadingIndicator: () => <h3>Loading Stripe API...</h3>,
  ErrorIndicator: error => <h3>Failed to load Stripe API: {error.message}</h3>,
  token: undefined,
  source: undefined,
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  name: '',
  description: '',
  amount: 0,
  locale: 'auto',
  zipCode: false,
  billingAddress: false,
};

function getOptionsFromProps(props) {
  return [
    'token',
    'source',
    'image',
    'name',
    'description',
    'amount',
    'locale',
    'zipCode',
    'billingAddress',
    'currency',
    'panelLabel',
    'shippingAddress',
    'email',
    'allowRememberMe',
    'opened',
    'closed',
  ].reduce((options, key) => {
    if (props[key]) {
      options[key] = props[key];
    }
    return options;
  }, {});
}

export default function StripeCheckout(props) {
  const { apiKey, src, LoadingIndicator, ErrorIndicator } = props;
  const [loading, error] = useScript({
    src,
  });

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  const handler = window.StripeCheckout.configure({
    key: apiKey,
  });

  const children = React.cloneElement(props.children, {
    onClick: event => {
      event.preventDefault();
      const options = getOptionsFromProps(props);
      handler.open(options);
    },
  });

  return React.Children.only(children);
}

StripeCheckout.propTypes = propTypes;
StripeCheckout.defaultProps = defaultProps;
