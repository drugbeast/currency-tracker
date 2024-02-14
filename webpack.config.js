const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_CURRENCYBEACON_API_KEY: JSON.stringify(
          process.env.REACT_APP_CURRENCYBEACON_API_KEY,
        ),
        REACT_APP_ALPHAVANTAGE_API_KEY: JSON.stringify(
          process.env.REACT_APP_ALPHAVANTAGE_API_KEY,
        ),
        REACT_APP_MAPTILER_API_KEY: JSON.stringify(
          process.env.REACT_APP_MAPTILER_API_KEY,
        ),
      },
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
}
