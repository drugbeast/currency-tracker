const { default: merge } = require('webpack-merge')
const webpackCommon = require('./webpack.common')

module.exports = merge(webpackCommon, {
  mode: 'development',
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
})
