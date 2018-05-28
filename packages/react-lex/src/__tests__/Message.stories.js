import React from 'react';
import { storiesOf } from '@storybook/react';

import Message from '../Message';

const botMessage = {
  type: 'bot',
  text: 'Hello Human!',
};

const humanMessage = {
  type: 'human',
  text: 'Hello Bot!',
};

storiesOf('Message', module)
  .add('with botMessage', () => <Message {...botMessage} />)
  .add('with humanMessage', () => <Message {...humanMessage} />);
