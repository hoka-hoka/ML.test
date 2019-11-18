/*
При использовании режима dev webpack сохраняет всё в кэш, а не работает с файловой структурой папки dist.
А при использовании плагина CopyWebpackPlugin мы из режима разработки организуем в кэше такую же структуру,
как и при build и работаем с её экземпляром.
При использовании режима build информация из кэша дополняет или создаёт структуру dist.
*/

/*
Загрузчики(loader) трансформируют файлы в модули, выполняют какие-либо с ними действиями и добаляют в граф зависимостей.
Выполняются снизу вверх.
/*

/* Точка входа не должна использоваться ни каким другим модулем. Для многостраничного сайта точек входа может быть несколько.

погрузчики из postcss.config.js webpack определяет сам
*/

const wepackbase = require('./webpack.conf');
const merge = require('webpack-merge');
const pug = require('../webpack/pug');
const babel = require('../webpack/babel-loader');
const fileloader = require('../webpack/fileloader');
const css = require('../webpack/css-loader');

module.exports = merge(
  wepackbase(),
  pug(),
  babel(),
  fileloader(),
  css(),
)
