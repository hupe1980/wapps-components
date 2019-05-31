import initStoryshots from '@storybook/addon-storyshots';

jest.mock('react-script-hook', () => ({
  __esModule: true,
  default: () => {
    return [true, null];
  },
}));

initStoryshots({
  storyKindRegex: /^react-stripe-checkout|(StripeCheckout)$/,
});
