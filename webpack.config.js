const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
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
    new UglifyPlugin(),
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: 'assets/index.html',
      favicon: ''
    }),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: '[name].[hash].css'
    })
  ]
}
