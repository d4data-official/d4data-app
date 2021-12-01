const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const { name, version } = require('./package.json')

module.exports = {
  // specify an alternate main src directory, defaults to 'main'
  mainSrcDir: 'main',
  // specify an alternate renderer src directory, defaults to 'renderer'
  rendererSrcDir: 'renderer',

  // main process' webpack config
  webpack: (defaultConfig) => (
    {
      ...defaultConfig,
      resolve: {
        ...defaultConfig.resolve,
        alias: {
          ...defaultConfig.resolve.alias,
          helpers: path.resolve(__dirname, 'main/helpers'),
          '@shared': path.resolve(__dirname, 'shared'),
        },
      },
      plugins: [
        ...defaultConfig.plugins,
        new SentryWebpackPlugin({
          // sentry-cli configuration
          org: 'd4data',
          project: 'd4data-app',
          release: process.env.SENTRY_RELEASE || `${ name }@${ version }`,
          dryRun: process.env.NODE_ENV !== 'production' || process.env.SENTRY_DRY_RUN === 'true',
          cleanArtifacts: true,

          // webpack specific configuration
          include: './app/',
          ignore: ['node_modules', 'webpack.config.js'],
        }),
      ],
    }
  ),
}
