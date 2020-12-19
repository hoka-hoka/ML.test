// vue.config.js
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const plugins = [];
if (!devMode) {
  // enable in production only
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  );
}
plugins.push(
  new CopyPlugin([
    {
      from: path.resolve(__dirname, 'src/assets/img'),
      to: path.resolve(__dirname, 'dist/img'),
    },
    {
      from: path.resolve(__dirname, 'src/assets/fonts'),
      to: path.resolve(__dirname, 'dist/fonts'),
    },
  ]),
);

module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? './' : './', // Если используется многостраничный режим (pages), то не писать
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
    // 'rooom-details': {
    //   entry: 'src/js/entries/rooom-details.js',
    //   template: 'public/pages/website/rooom-details.pug',
    //   chunks: ['chunk-vendors', 'chunk-common', 'rooom-details'],
    // },
    // registration: {
    //   entry: 'src/js/entries/registration.js',
    //   template: 'public/pages/website/registration.pug',
    //   chunks: ['chunk-vendors', 'chunk-common', 'registration'],
    // },
    // 'sign-in': {
    //   entry: 'src/js/entries/sign-in.js',
    //   template: 'public/pages/website/sign-in.pug',
    //   chunks: ['chunk-vendors', 'chunk-common', 'sign-in'],
    // },
    // 'colors-type': {
    //   entry: 'src/js/entries/colors-type.js',
    //   template: 'public/pages/ui-kit/colors-type.pug',
    //   chunks: ['chunk-vendors', 'chunk-common', 'colors-type'],
    // },
    // cards: {
    //   entry: 'src/js/entries/cards.js',
    //   template: 'public/pages/ui-kit/cards.pug',
    //   chunks: ['chunk-vendors', 'chunk-common', 'cards'],
    // },
    // 'headers-footers': {
    //   entry: 'src/js/entries/headers-footers.js',
    //   template: 'public/pages/ui-kit/headers-footers.pug',
    //   chunks: ['chunk-vendors', 'chunk-common', 'headers-footers'],
    // },
    // 'form-elements': {
    //   entry: 'src/js/entries/form-elements.js',
    //   template: 'public/pages/ui-kit/form-elements.pug',
    //   chunks: ['chunk-vendors', 'chunk-common', 'form-elements'],
    // },
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
              ? {
                  loader: 'style-loader',
                }
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
                additionalData: (content, loaderContext) => {
                  const { resourcePath, rootContext } = loaderContext;
                  const relativePath = path.relative(rootContext, resourcePath);
                  if (/components/g.test(relativePath)) {
                    return `@import "scss/variables";
                            @import "scss/fonts";
                            @import "scss/mixins";`;
                  } else {
                    return `@import "scss/variables";
                            @import "scss/mixins";`;
                  }
                },
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

  chainWebpack: config => {
    config.module.rules.delete('sass');
    config.module.rules.delete('postcss');
    config.module.rules.delete('less');
    config.module.rules.delete('stylus');
    config.module.rules.delete('scss');

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

    // const fontsRule = config.module.rule('fonts');
    // fontsRule.uses.clear();
    // fontsRule
    //   .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     limit: 4096,
    //     fallback: 'file-loader',
    //     name: '[name].[ext]',
    //     outputPath: 'fonts',
    //     publicPath: 'src/scss',
    //   });
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
  url-loader - преобразует в base64
*/
