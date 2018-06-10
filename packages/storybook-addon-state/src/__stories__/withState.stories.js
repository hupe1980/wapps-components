import React from 'react';
import { storiesOf } from '@storybook/react';

import withState from '../withState';
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
