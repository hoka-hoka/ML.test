module.exports = function() {
  return {
    module: { // погрузщики преобразований
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(swiper)\/).*/, // исключаем
          use: ['babel-loader']
        }
      ]
    }
  }
};