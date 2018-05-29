import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'wapps-components',
  url: 'https://github.com/hupe1980/wapps-components',
});

const loadStories = () => {
  const req = require.context('../packages', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
