import React from 'react';
import { storiesOf } from '@storybook/react';

import LexChat from '../LexChat';

storiesOf('LexChat', module).add('with BookTripBot', () => (
  <LexChat
    botName="BookTrip"
    identityPoolId={process.env.REACT_LEX_IDENTITY_POOL_ID}
    initialText="Hello, what can I help you with?"
  />
));
