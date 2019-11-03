const paths = require('../build/webpack.paths.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // позволяет разделить js от css в dist
const baseWebpackConfig = require('../build/webpack.conf');
module.exports = function() {
  return {
    module: { // погрузщики преобразований
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders : 1, sourceMap: true } },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin(
        {
          filename: `${paths.PATHS.assets}css/[name].css`,
        }
      )
    ]
  }
};