const paths = require("../build/webpack.paths.config");
const path = require("path"); // утилиты для работы с путями

module.exports = function () {
  return {
    devServer: {
      contentBase: path.join(__dirname, "dist/assets/js"),
      publicPath: "/",
      port: 8081,
      open: true,
      overlay: {
        // вывод ошибок на экране браузера
        warnings: false,
        errors: true,
      },
    },
  };
};
