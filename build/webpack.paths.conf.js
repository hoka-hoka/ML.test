
const path = require('path'); // утилиты для работы с путями
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}
module.exports = {
  PATHS: PATHS
}