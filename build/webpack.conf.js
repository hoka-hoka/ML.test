const fs = require('fs'); // утилиты для работы с файлами
const paths = require('./webpack.paths.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // для копирования файлов при build
const HtmlWebpackPlugin = require('html-webpack-plugin'); // создаёт автоматически index.html, может

const PAGES_DIR = `${paths.PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

/* При создании webpakc формирует граф зависимостей, где стартовая точка это точка входя entry */

module.exports = function(){
  return {
    externals: { // для обращения к path из build и dev
      paths: paths.PATHS
    },
    entry: { // точка входа указывает на начало приложения
      app: paths.PATHS.src // сам найдёт index.js
    },
    output: {
      filename: `${paths.PATHS.assets}js/[name].js`, // для каждой точки входа свой выход (EC6 - ${})
      path: paths.PATHS.dist, // __dirname + 'dist' (конкатенация путей)
      publicPath: '/' // путь выходного каталога
    },
    performance: {
      hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    plugins: [
      new CopyWebpackPlugin(
        [
          { from: `${paths.PATHS.src}/${paths.PATHS.assets}img`, to: `${paths.PATHS.assets}img`},
          { from: `${paths.PATHS.src}/${paths.PATHS.assets}fonts`, to: `${paths.PATHS.assets}fonts`},
          { from: `${paths.PATHS.src}/static`, to: ''}
        ]
      ),
      ...PAGES.map(page => new HtmlWebpackPlugin(
        {
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/,'.html')}` // исходный index с заменой
        }
      ))
    ]
  }
};

/* При использовании HtmlWebpackPlugin "Ручной" файл index.html можно удалить. В результате сборки сгенерируется пустой index.html
с тегом script, по пути точки выхода. Если мы хотим, чтобы в сгенерированном файле был и пользовательский
контент, то нужно указать HtmlWebpackPlugin шаблон, на который он будет ссылаться */

/*new HtmlWebpackPlugin({
  hash: true, // md5 ?
  template: `${paths.PATHS.src}/index.html`, // тот шаблон
  filename: './index.html'
}),*/