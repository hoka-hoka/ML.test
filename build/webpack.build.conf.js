const merge = require('webpack-merge') // объединяет базу и режимы
const baseWebpackConfig = require('./webpack.base.conf')
const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	plugins: [

	],
})

module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig)
});