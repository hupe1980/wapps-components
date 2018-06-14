import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api } from './helper';
import Entries from '../Entries';

storiesOf('react-contentful|Entries', module).add('default', () => (
  <Api>
    <Entries query={{ content_type: 'category', limit: 5 }}>
      {({ items }) => (
        <ul>{items.map(({ fields }, i) => <li key={i}>{fields.title}</li>)}</ul>
      )}
    </Entries>
  </Api>
));
