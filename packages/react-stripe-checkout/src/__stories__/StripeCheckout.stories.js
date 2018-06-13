import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import StripeCheckout from '../StripeCheckout';

const apiKey = process.env.REACT_STRIPE_API_KEY || 'testApiKey';

storiesOf('react-stripe-checkout|StripeCheckout', module)
  .add('default', () => (
    <StripeCheckout apiKey={apiKey} token={action('token')} />
  ))
  .add('with custom button', () => (
    <StripeCheckout apiKey={apiKey} token={action('token')}>
      <button>Custom</button>
    </StripeCheckout>
  ));
