const path = require('path')
const webpack = require('webpack')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?/,
      exclude: /node-modules/,
      loader: 'eslint-loader'
    }, {
      // 支持 '.jsx' '.js' 文件
      test: /\.jsx?/,
      include: [
        path.resolve(__dirname, 'src')
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
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {},
      }]
    }]
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'src/utils')
    },
    modules: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ],
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
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
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: path.resolve(__dirname, 'favicon.ico')
    }),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: '[name].[hash].css'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'dist/static'),
        ignore: ['.*']
      }
    ]),
    new UglifyPlugin(),
  ]
}
