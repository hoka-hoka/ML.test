{
  mode: 'development',
  context: 'C:\\Users\\Semyon\\Desktop\\task_1',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'C:\\Users\\Semyon\\Desktop\\task_1\\dist',
    filename: 'js/[name].js',
    publicPath: '',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': 'C:\\Users\\Semyon\\Desktop\\task_1\\src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules',
      'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ┬п\_(уГД)_/┬п
        },
        makePlugin: function () { /* omitted long function */ },
        moduleLoader: function () { /* omitted long function */ },
        topLevelLoader: {
          apply: function nothing() {
            // ┬п\_(уГД)_/┬п
          }
        },
        bind: function () { /* omitted long function */ },
        tsLoaderOptions: function () { /* omitted long function */ },
        forkTsCheckerOptions: function () { /* omitted long function */ }
      }
    ]
  },
  resolveLoader: {
    modules: [
      'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules',
      'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ┬п\_(уГД)_/┬п
        }
      }
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '70ce8432'
            }
          },
          {
            loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\vue-loader\\lib\\index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '70ce8432'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').rule('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\pug-plain-loader\\index.js'
              }
            ]
          },
          /* config.module.rule('pug').rule('pug-template') */
          {
            use: [
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\raw-loader\\dist\\cjs.js'
              },
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\pug-plain-loader\\index.js'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '90d07812'
            }
          },
          {
            loader: 'C:\\Users\\Semyon\\Desktop\\task_1\\node_modules\\babel-loader\\lib\\index.js'
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: false,
              shadowMode: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              plugins: []
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              additionalData: '@import "scss/variables";\n                                 @import "scss/mixins";',
              sassOptions: {
                includePaths: [
                  'C:\\Users\\Semyon\\Desktop\\task_1',
                  'src'
                ]
              }
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: false,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          BASE_URL: '""'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html-index') */
    new HtmlWebpackPlugin(
      {
        title: 'task_1',
        templateParameters: function () { /* omitted long function */ },
        chunks: [
          'chunk-vendors',
          'chunk-common',
          'index'
        ],
        template: 'public/pages/website/home.pug',
        filename: 'index.html'
      }
    ),
    /* config.plugin('html-landing-page') */
    new HtmlWebpackPlugin(
      {
        title: 'task_1',
        templateParameters: function () { /* omitted long function */ },
        chunks: [
          'chunk-vendors',
          'chunk-common',
          'landing-page'
        ],
        template: 'public/pages/website/landing-page.pug',
        filename: 'landing-page.html'
      }
    ),
    /* config.plugin('html-search-room') */
    new HtmlWebpackPlugin(
      {
        title: 'task_1',
        templateParameters: function () { /* omitted long function */ },
        chunks: [
          'chunk-vendors',
          'chunk-common',
          'search-room'
        ],
        template: 'public/pages/website/search-room.pug',
        filename: 'search-room.html'
      }
    ),
    /* config.plugin('preload-index') */
    new PreloadPlugin(
      {
        rel: 'preload',
        includeHtmlNames: [
          'index.html'
        ],
        include: {
          type: 'initial',
          entries: [
            'index'
          ]
        },
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch-index') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        includeHtmlNames: [
          'index.html'
        ],
        include: {
          type: 'asyncChunks',
          entries: [
            'index'
          ]
        }
      }
    ),
    /* config.plugin('preload-landing-page') */
    new PreloadPlugin(
      {
        rel: 'preload',
        includeHtmlNames: [
          'landing-page.html'
        ],
        include: {
          type: 'initial',
          entries: [
            'landing-page'
          ]
        },
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch-landing-page') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        includeHtmlNames: [
          'landing-page.html'
        ],
        include: {
          type: 'asyncChunks',
          entries: [
            'landing-page'
          ]
        }
      }
    ),
    /* config.plugin('preload-search-room') */
    new PreloadPlugin(
      {
        rel: 'preload',
        includeHtmlNames: [
          'search-room.html'
        ],
        include: {
          type: 'initial',
          entries: [
            'search-room'
          ]
        },
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch-search-room') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        includeHtmlNames: [
          'search-room.html'
        ],
        include: {
          type: 'asyncChunks',
          entries: [
            'search-room'
          ]
        }
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: 'C:\\Users\\Semyon\\Desktop\\task_1\\public',
          to: 'C:\\Users\\Semyon\\Desktop\\task_1\\dist',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'pages\\website\\home.pug',
              matchBase: false
            },
            {
              glob: 'pages\\website\\landing-page.pug',
              matchBase: false
            },
            {
              glob: 'pages\\website\\search-room.pug',
              matchBase: false
            }
          ]
        }
      ]
    )
  ],
  entry: {
    index: [
      'C:\\Users\\Semyon\\Desktop\\task_1\\src\\js\\entries\\home.js'
    ],
    'landing-page': [
      'C:\\Users\\Semyon\\Desktop\\task_1\\src\\js\\entries\\landing-page.js'
    ],
    'search-room': [
      'C:\\Users\\Semyon\\Desktop\\task_1\\src\\js\\entries\\search-room.js'
    ]
  }
}
