const path = require('path')

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
    }
  )
  ,
}
