import React from 'react';
import { storiesOf } from '@storybook/react';

import Scroll from '../Scroll';

const messages = [];
let index = 0;
while (index < 200) {
  messages.push(<p>Text Text Text {index}</p>);
  index++;
}

storiesOf('Scroll', module)
  .add('with behavior smooth', () => (
    <div style={{ overflow: 'scroll' }}>
      {messages.map((message, index) => (
        <Scroll key={index} behavior="smooth">
          {message}
        </Scroll>
      ))}
    </div>
  ))
  .add('with behavior instant', () => (
    <div style={{ overflow: 'scroll' }}>
      {messages.map((message, index) => (
        <Scroll key={index} behavior="instant">
          {message}
        </Scroll>
      ))}
    </div>
  ));
