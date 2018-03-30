const {smart} = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base')

module.exports = smart(base, {
  module: {
    rules: [],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
})

