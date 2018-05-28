import React from 'react';
import { storiesOf } from '@storybook/react';

import Lex from '../Lex';

storiesOf('Lex', module).add('with BookTripBot', () => (
  <Lex
    botName="BookTrip"
    identityPoolId={process.env.REACT_LEX_IDENTITY_POOL_ID}
    initialText="Hello, what can I help you with?"
    placeholder="Type here"
  />
));
