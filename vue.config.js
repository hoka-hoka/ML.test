// vue.config.js
const CopyPlugin = require('copy-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const path = require('path');

module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '' : './', // Если используется многостраничный режим (pages), то не писать
  assetsDir: '',
  indexPath: 'index.html', // по умолчанию index.html
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/pages/website/home.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    'landing-page': {
      entry: 'src/main.js',
      template: 'public/pages/website/landing-page.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    'search-room': {
      entry: 'src/main.js',
      template: 'public/pages/website/search-room.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    'rooom-details': {
      entry: 'src/main.js',
      template: 'public/pages/website/rooom-details.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    registration: {
      entry: 'src/main.js',
      template: 'public/pages/website/registration.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    'sign-in': {
      entry: 'src/main.js',
      template: 'public/pages/website/sign-in.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    'colors-type': {
      entry: 'src/main.js',
      template: 'public/pages/ui-kit/colors-type.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    cards: {
      entry: 'src/main.js',
      template: 'public/pages/ui-kit/cards.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    'headers-footers': {
      entry: 'src/main.js',
      template: 'public/pages/ui-kit/headers-footers.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    'form-elements': {
      entry: 'src/main.js',
      template: 'public/pages/ui-kit/form-elements.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },

  devServer: {
    // publicPath не использовать в многостраничном режиме
    port: 8081,
    open: true,
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

  chainWebpack: config => {
    /* delete config.plugins('CopyPlugin') */
    config.plugins.delete('copy');
    /* delete config.module.rule('svg') */
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
  },

  configureWebpack: {
    /* add config.plugins('CopyPlugin') */
    plugins: [
      new CopyPlugin([
        {
          from: path.resolve(__dirname, 'src/assets/img'),
          to: path.resolve(__dirname, 'dist/img'),
          toType: 'dir',
        },
      ]),
    ],
  },

  productionSourceMap: false,
  integrity: false,
};

// 1. Если есть изображения в html они не обрабатываются url-loader и file-loader -и.
