const path = require('path')

module.exports = {
  // future: {
  //   webpack5: true,
  // },
  webpack: (config) => {
    // Add root shared folder to webpack renderer config
    config.module.rules[0].include.push(path.resolve(__dirname, '../shared'))
    // eslint-disable-next-line no-param-reassign
    config.output.globalObject = 'this'

    return Object.assign(config, {
      target: 'electron-renderer',
    })
  },
}
