# react-stripe-checkout

[![Build Status](https://travis-ci.org/hupe1980/wapps-components.svg?branch=master)](https://travis-ci.org/hupe1980/wapps-components)

> React stripe checkout compoment

## Installation

```bash
npm install @wapps/react-stripe-checkout
```

## How to use

```js
import React from 'react';
import StripeCheckout from '@wapps/react-stripe-checkout';

const App = () => (
  <StripeCheckout apiKey={YOUR_STRIPE_KEY} token={token => console.log(token)}>
    <button>Purchase</button>
  </StripeCheckout>
);

export default App;
```

## Live Demo

For a demo, check out https://hupe1980.github.io/wapps-components/

## License

[MIT](../../LICENSE)
