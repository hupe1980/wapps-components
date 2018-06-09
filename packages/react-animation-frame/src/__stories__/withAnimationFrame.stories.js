import React from 'react';
import { storiesOf } from '@storybook/react';

import withAnimationFrame from '../withAnimationFrame';
import Loop from './Loop';
import StartStop from './StartStop';

const AnimatedLoop = withAnimationFrame(Loop);
const AnimatedStartStop = withAnimationFrame(StartStop);

storiesOf('react-animation-frame|withAnimationFrame', module)
  .add('with loop', () => <AnimatedLoop text="BeginLoop" duration="5000" />)
  .add('with start/stop', () => (
    <AnimatedStartStop autostart={false} throttle={100} />
  ));
