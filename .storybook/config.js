import requireContext from 'require-context.macro';
import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

addDecorator(
  withOptions({
    name: 'wapps-components',
    url: 'https://github.com/hupe1980/wapps-components',
    showAddonPanel: true,
    showSearchBox: false,
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
  }),
);

const loadStories = () => {
  const req = requireContext('../packages', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
