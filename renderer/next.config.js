module.exports = {
  // future: {
  //   webpack5: true,
  // },
  webpack: (config) => Object.assign(config, {
    target: 'electron-renderer',
  }),
};
