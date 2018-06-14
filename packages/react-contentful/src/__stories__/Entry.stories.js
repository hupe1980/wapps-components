import React from 'react';
import { storiesOf } from '@storybook/react';

import { Api } from './helper';
import Entry from '../Entry';

storiesOf('react-contentful|Entry', module).add('default', () => (
  <Api>
    <Entry id="6ucY5w3oswEU6EYSCEi0C8">
      {({ entry }) => entry && <span>{entry.fields.title}</span>}
    </Entry>
  </Api>
));
