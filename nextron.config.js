const path = require('path');

console.log(path.resolve(__dirname, 'main/helpers'))

module.exports = {
	// specify an alternate main src directory, defaults to 'main'
	mainSrcDir: 'main',
	// specify an alternate renderer src directory, defaults to 'renderer'
	rendererSrcDir: 'renderer',

	// main process' webpack config
	webpack: (defaultConfig, env) => {
		// do some stuff here
		return {
			...defaultConfig,
			resolve: {
				...defaultConfig.resolve,
				alias: {
					...defaultConfig.resolve?.alias,
					helpers: path.resolve(__dirname, 'main/helpers')
				}
			}
		};
	},
};