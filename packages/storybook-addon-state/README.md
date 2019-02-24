# storybook-addon-state

[![Build Status](https://travis-ci.org/hupe1980/wapps-components.svg?branch=master)](https://travis-ci.org/hupe1980/wapps-components)

> Storybook addon to manage state

## Installation

```bash
npm install --save @wapps/storybook-addon-state
```

## How to use

```js
import React from 'react';
import { storiesOf } from '@storybook/react';
import withState from '@wapps/storybook-addon-state';

import { ClickCounter } from './helper';

storiesOf('storybook-addon-state|withState', module).add(
  'default',
  withState({ counter: 1 })(({ store }) => (
    <div>
      <ClickCounter {...store.state} />
      <button onClick={() => store.set({ counter: store.get('counter') + 1 })}>
        Click
      </button>
    </div>
  )),
);
```

```js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@wapps/storybook-addon-state';

import { ClickCounter } from './helper';

const store = new Store({
  counter: 1,
});

storiesOf('storybook-addon-state|State', module).add('default', () => (
  <div>
    <State store={store}>
      <ClickCounter />
    </State>
    <button onClick={() => store.set({ counter: store.get('counter') + 1 })}>
      Click
    </button>
  </div>
));
```

## Live Demo

For a demo, check out https://hupe1980.github.io/wapps-components/

## License

[MIT](../../LICENSE)
