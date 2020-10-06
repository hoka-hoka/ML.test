module.exports = function() {
  return {
    module: { // погрузщики преобразований
      rules: [
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './[path][name].[contenthash].[ext]',
              }
              // ?name=./assets/fonts/[name].[ext]'
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './[path][name].[contenthash].[ext]',
              }
            }
          ]
        }
      ]
    }
  }
};
