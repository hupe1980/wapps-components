import React from 'react';
import { storiesOf } from '@storybook/react';

import State from '../State';
import Store from '../Store';
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
