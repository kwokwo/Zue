const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const webpackEntry = require('./multi-route/entry');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let baseEntry = webpackEntry.getMultiEntry();
let webpackPlugins = [
  new ExtractTextPlugin('[name].[hash].css'),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'static/common',
    chunks: ['static/common'],
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
];
// 添加多个路由的编译html

webpackPlugins = webpackPlugins.concat(baseEntry.htmls);
module.exports = {
  entry: Object.assign({
    'static/common': path.resolve(__dirname, '../src/chunks/common.js'),
  }, baseEntry.entrys),
  output: {
    path: path.resolve(__dirname, config.output.path),
    filename: config.output.filename,
    publicPath: 'http://localhost:8080',
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css'],
  },
  plugins: webpackPlugins,
};
