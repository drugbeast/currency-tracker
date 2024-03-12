const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(?:js|jsx|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_CURRENCYBEACON_API_KEY: JSON.stringify(
          'UMBHqIhSJ08irV0mHLKF0CjIxrxvngdl',
        ),
        REACT_APP_CURRENCYBEACON_REQUEST: JSON.stringify(
          'https://api.currencybeacon.com/v1/latest',
        ),
        REACT_APP_MAPTILER_API_KEY: JSON.stringify('VyOY3rI2tsepj8NNxxyg'),
        REACT_APP_MOCKAPI_REQUEST: JSON.stringify(
          'https://65cbe39eefec34d9ed883c24.mockapi.io/api/v1/',
        ),
      },
    }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      favicon: './src/assets/images/logo.svg',
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Constants: path.resolve(__dirname, 'src/constants'),
      Utils: path.resolve(__dirname, 'src/utils'),
      Assets: path.resolve(__dirname, 'src/assets'),
      Pages: path.resolve(__dirname, 'src/pages'),
    },
  },
}
