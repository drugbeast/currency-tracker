const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      favicon: './src/assets/images/logo.svg',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_CURRENCYBEACON_API_KEY: JSON.stringify(
          process.env.REACT_APP_CURRENCYBEACON_API_KEY,
        ),
        REACT_APP_MAPTILER_API_KEY: JSON.stringify(
          process.env.REACT_APP_MAPTILER_API_KEY,
        ),
        REACT_APP_CURRENCYBEACON_REQUEST: JSON.stringify(
          process.env.REACT_APP_CURRENCYBEACON_REQUEST,
        ),
        REACT_APP_MOCKAPI_REQUEST: JSON.stringify(
          process.env.REACT_APP_MOCKAPI_REQUEST,
        ),
      },
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
