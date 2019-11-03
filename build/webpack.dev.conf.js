const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const devserver = require('../webpack/devserver');

const devdWebpackConfig = merge([
  baseWebpackConfig,
  {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
      })
    ]
  },
  devserver()
])

module.exports = new Promise((resolve, reject) => {
	resolve(devdWebpackConfig)
});



