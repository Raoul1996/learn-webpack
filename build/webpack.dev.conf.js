const {smart} = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.conf')
module.exports = smart(base, {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  devServer: {
    // 如果使用 Nginx 做反向代理时候，需要制定 Nginx 配置使用的服务域名
    public: 'http://localhost:8080/',
    publicPath: '/',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api': ''}
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
})