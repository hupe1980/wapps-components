import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStripeCheckoutApi from './withStripeCheckoutApi';

const propTypes = {
  apiKey: PropTypes.string.isRequired,
  children: PropTypes.node,
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
  children: <button>Purchase</button>,
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

class StripeCheckout extends Component {
  constructor(props) {
    super(props);

    this.handler = null;
  }

  componentDidMount() {
    const { hasScriptsLoaded, hasScriptsLoadedSuccessfully } = this.props;
    if (hasScriptsLoaded && hasScriptsLoadedSuccessfully) {
      this.createHandler();
    }
  }

  componentDidUpdate(prevProps) {
    const { hasScriptsLoaded, hasScriptsLoadedSuccessfully } = this.props;
    if (hasScriptsLoaded && !prevProps.hasScriptsLoaded) {
      if (hasScriptsLoadedSuccessfully) {
        this.createHandler();
      }
    }
  }

  createHandler = () => {
    const { apiKey } = this.props;

    this.handler = window.StripeCheckout.configure({
      key: apiKey,
    });

    //Close Checkout on page navigation
    window.addEventListener('popstate', () => {
      this.handler.close();
    });
  };

  getOptionsFromProps = () =>
    [
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
      if (this.props[key]) {
        options[key] = this.props[key];
      }
      return options;
    }, {});

  onClick = event => {
    const options = this.getOptionsFromProps();
    this.handler.open(options);
    event.preventDefault();
  };

  render() {
    const children = React.cloneElement(this.props.children, {
      onClick: this.onClick,
    });

    return React.Children.only(children);
  }
}

StripeCheckout.propTypes = propTypes;
StripeCheckout.defaultProps = defaultProps;

export default withStripeCheckoutApi(StripeCheckout);
