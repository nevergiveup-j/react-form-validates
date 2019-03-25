const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./webpack.config.base');
const rootPath = path.resolve(__dirname, '../../');

config.mode = 'development';

config.entry = {
  index: [
    rootPath + '/examples/index.js'
  ]
}

config.devServer = {
  publicPath: '/',
  historyApiFallback: true,
  quiet: true,
};

module.exports = config;
