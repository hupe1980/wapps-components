const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig 
  defaultConfig.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {
          prettierConfig: {
            parser: 'babylon', //The default prettier parser (we might want 'flow' in future)
          },
        },
      },
    ],
    enforce: 'pre',
  });

  return defaultConfig;
};
