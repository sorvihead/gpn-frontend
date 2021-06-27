const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const webpackCommon = require('./webpack.common');

const proxy = {
    '/': {
        target: 'http://localhost:5000',
        changeOrigin: true,
    }
};

module.exports = {
  ...webpackCommon,
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    proxy,
    historyApiFallback: true,
  },
  plugins: [
    ...webpackCommon.plugins,
    new ErrorOverlayPlugin(),
    new DotenvPlugin(),
  ],
  devtool: 'cheap-module-source-map',
};
