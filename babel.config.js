module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/env',
        {
          targets: {
            browsers: 'Last 2 Chrome versions, Firefox ESR',
            node: '8.9',
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          development: process.env.BABEL_ENV !== 'build',
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-modules-commonjs',
      'macros',
    ],
    env: {
      build: {
        ignore: ['**/__snapshots__/**', '**/__tests__/**', '**/__stories__/**'],
      },
    },
    ignore: ['node_modules'],
  };
};
