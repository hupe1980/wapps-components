import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  storyKindRegex: /^react-stripe-checkout|(StripeCheckout)$/,
});
