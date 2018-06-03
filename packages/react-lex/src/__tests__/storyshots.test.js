import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  storyKindRegex: /^react-lex|(Lex|Chat|Message)$/,
});
