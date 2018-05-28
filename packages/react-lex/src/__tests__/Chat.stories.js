import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Chat from '../Chat';

const botMessage = {
  type: 'bot',
  text: 'Hello Human!',
};

const humanMessage = {
  type: 'human',
  text: 'Hello Bot!',
};

const messages = [];
let index = 0;
while (index < 20) {
  messages.push(botMessage);
  messages.push(humanMessage);
  index++;
}

const withPreventDefault = handler => e => {
  e.preventDefault();
  handler(e);
};

storiesOf('Chat', module).add('with Messages', () => (
  <Chat onSubmit={withPreventDefault(action('onSubmit'))} messages={messages} />
));
