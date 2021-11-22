const path = require('path')

module.exports = {
  productionBrowserSourceMaps: true,
  // future: {
  //   webpack5: true,
  // },
  webpack: (config) => {
    // Add root shared folder to webpack renderer config
    config.module.rules[0].include.push(path.resolve(__dirname, '../shared'))

    return Object.assign(config, {
      target: 'electron-renderer',
    })
  },
}
