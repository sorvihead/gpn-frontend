const path = require('path');
const webpackCommon = require('./webpack.common');

module.exports = {
  ...webpackCommon,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'static/js/[name].[hash].js',
    publicPath: '/',
  },
};
