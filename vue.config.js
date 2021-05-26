// vue.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

const setMiniCssExtractPlugin = () => {
  const rezult = new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: 'css/[id].css',
  });
  return rezult;
};

const setCopyPlugin = () => {
  const rezult = new CopyPlugin([
    {
      from: path.resolve(__dirname, 'src/assets/img'),
      to: path.resolve(__dirname, 'docs/img'),
    },
    {
      from: path.resolve(__dirname, 'src/assets/fonts'),
      to: path.resolve(__dirname, 'docs/fonts'),
    },
  ]);
  if (!devMode) {
    rezult.patterns.push({
      from: path.resolve(__dirname, 'dll/vendor.bundle.js'),
      to: path.resolve(__dirname, 'docs/js'),
    });
  }
  return rezult;
};

const setProvidePlugin = () => {
  const rezult = new webpack.ProvidePlugin({
    $: 'jquery/dist/jquery.min.js',
    jQuery: 'jquery/dist/jquery.min.js',
  });
  return rezult;
};

const plugins = [setCopyPlugin(), setProvidePlugin()];
if (!devMode) {
  plugins.push(setMiniCssExtractPlugin());
}

module.exports = {
  filenameHashing: false,
  outputDir: 'docs',
  publicPath: './', // Если используется многостраничный режим (pages), то не писать
  assetsDir: '',
  indexPath: 'index.html', // по умолчанию index.html
  pages: {
    index: {
      entry: 'src/js/entries/home.js',
      template: 'public/pages/website/home.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    'landing-page': {
      entry: 'src/js/entries/landing-page.js',
      template: 'public/pages/website/landing-page.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'landing-page'],
    },
    'search-room': {
      entry: 'src/js/entries/search-room.js',
      template: 'public/pages/website/search-room.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'search-room'],
    },
    'rooom-details': {
      entry: 'src/js/entries/rooom-details.js',
      template: 'public/pages/website/rooom-details.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'rooom-details'],
    },
    reg: {
      entry: 'src/js/entries/reg.js',
      template: 'public/pages/website/registration.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'reg'],
    },
    auth: {
      entry: 'src/js/entries/auth.js',
      template: 'public/pages/website/authorization.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'auth'],
    },
    'colors-type': {
      entry: 'src/js/entries/colors-type.js',
      template: 'public/pages/ui-kit/colors-type.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'colors-type'],
    },
    cards: {
      entry: 'src/js/entries/cards.js',
      template: 'public/pages/ui-kit/cards.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'cards'],
    },
    'headers-footers': {
      entry: 'src/js/entries/headers-footers.js',
      template: 'public/pages/ui-kit/headers-footers.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'headers-footers'],
    },
    'form-elements': {
      entry: 'src/js/entries/form-elements.js',
      template: 'public/pages/ui-kit/form-elements.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'form-elements'],
    },
  },

  devServer: {
    // publicPath не использовать в многостраничном режиме
    port: 8081,
    open: false,
    // watch: true,
    overlay: {
      // вывод ошибок на экране браузера
      warnings: false,
      errors: true,
    },
    watchOptions: {
      watch: true,
      ignored: /node_modules/,
    },
  },

  configureWebpack: {
    plugins,
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /node_modules/,
          use: [
            devMode
              ? { loader: 'vue-style-loader' }
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 2,
                url: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: [],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                additionalData: '@import "scss/utils";',
                sassOptions: {
                  includePaths: [__dirname, 'src'],
                },
              },
            },
          ],
        },
      ],
    },
  },

  chainWebpack: (config) => {
    config.module.rules.delete('sass');
    config.module.rules.delete('postcss');
    config.module.rules.delete('less');
    config.module.rules.delete('stylus');
    config.module.rules.delete('scss');

    /* delete config.plugins('CopyPlugin') */
    config.plugins.delete('copy');

    /* clear config.module.rule('svg') */
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    /* add config.module.rule('svg') */
    svgRule
      .test(/\.svg$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
      });

    /* clear config.module.rule('fonts') */
    const font = config.module.rule('fonts');
    font.uses.clear();
    font
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('file-loader')
      .loader('file-loader')
      .options({
        publicPath: '../', // url(../fonts/...)
        name: 'fonts/[name]/[name].[ext]',
      });

    /* reference to DLL manifest */
    !devMode
      ? config.plugin('vendorDll').use(webpack.DllReferencePlugin, [
          {
            context: __dirname,
            manifest: require('./dll/vendor-manifest.json'),
          },
        ])
      : false;
  },

  productionSourceMap: false,
  integrity: false,
};

// 1. Если есть изображения в html они не обрабатываются url-loader и file-loader -и.
/* 2. minCssExtractPlugin - создаёт файлы стилей для каждой точки входа.
Также он поддерживает модульное подключение стилей через import */
/*
  style-loader - создаёт узлы стилей из строк JS
  css-loader - переводит css в commonJS
  sass-loader - компилирует scss в css
  url-loader - преобразует в base64.
*/
