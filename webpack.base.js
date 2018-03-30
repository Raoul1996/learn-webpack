const path = require('path')
const webpack = require('webpack')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ROOT_PATH = path.join(__dirname, '')
console.log(path.join(__dirname))
module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['lodash']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
    // publicPath: '/'
  },
  module: {
    rules: [
      //   {
      //   enforce: 'pre',
      //   test: /\.jsx?/,
      //   exclude: /node-modules/,
      //   loader: 'eslint-loader'
      // },
      {
        // 支持 '.jsx' '.js' 文件
        test: /\.jsx?/,
        include: [
          path.resolve(ROOT_PATH, 'src')
        ],
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader',]
        })
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [{
          loader: 'file-loader',
          options: {}
        }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: { // 压缩 jpeg
              progressive: true,
              quality: 65
            },
            optipng: { // 使用imagemin-optipng 压缩 png
              enabled: false
            },
            pngquant: { // imagemin-pngquant 压缩 png
              quality: '65-90',
              speed: 4
            },
            gifsicle: { // 压缩 gif 配置
              interlaced: false
            },
            webp: { // 开启 webp，会把 jpg 和 png 图片压缩 webp 格式
              quality: 75
            }
          }
        }]
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192 // 单位是 Byte， 当文件小于 8KB 时候，作为 DataURL 处理
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      utils: path.resolve(ROOT_PATH, 'src/utils')
    },
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.json', '.jsx'],
    mainFiles: ['index']
  },
  optimization: {
    splitChunks: {
      /**
       * 隐式配置，webpack 4 推荐
       */
      chunks: 'all',
      // cacheGroups: {
      //   vendor: {
      //     chunks: 'initial',
      //     test: 'vendor',
      //     name: 'vendor',
      //     enforce: true
      //   }
      // }
    }
  },
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2')
      }
    }),
    // 引用某些模块作为应用运行时的变量，从而不必每次都用 require 或者 import
    new webpack.ProvidePlugin({
      identifier: 'module'
    }),
    // 移除 moment 中的 i18n 代码，优化大小
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: path.resolve(ROOT_PATH, 'favicon.ico'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: '[name].[hash].css'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(ROOT_PATH, 'static'),
        to: path.resolve(ROOT_PATH, 'dist/static'),
        ignore: ['.*']
      }
    ]),
    new UglifyPlugin(),
  ]
}
