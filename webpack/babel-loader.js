module.exports = function() {
  return {
    module: { // погрузщики преобразований
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, // исключаем
          use: ['babel-loader']
        }
      ]
    }
  }
};