const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // позволяет разделить js от css в dist
module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader', // подключение подгрузчика (помещает css-строку в <style> в DOM index.html)
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', // заменяеи все импорты стилей на модули js
// importLoaders - сообщает сколько загрузчиков должно быть выполнено перед, для найденный импортов
              options: { importLoaders : 2, sourceMap: true }
            }, {
            loader: 'postcss-loader', // добавляет погрузчики из post.config.js
            options: { sourceMap: true }
            }, {
            loader: 'sass-loader', // компилирует scss в css
            options: { sourceMap: true }
            }
          ]
        }
      ]
    }
  }
};