const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const webpackEntry = require('./multi-route/entry');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InsterNunjucksHtml = require('./multi-route/inster-nunjucks-html');
// get entrys for webpack config
let baseEntry = webpackEntry.getMultiEntry();
let webpackPlugins = [
  new ExtractTextPlugin('[name].[hash].css'),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'static/common',
    chunks: ['static/common'],
  }),
  // 自动引入jquery
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
  // 写入硬盘 -- 需要htmlwebpackPlugins 配置
  new HtmlWebpackHarddiskPlugin(),
  // 复制 partial 公共部分到views

  new CopyWebpackPlugin([
    {
      context: path.resolve(__dirname, '../src/partial/'+config.partial),
      from: '**/*.html',
      to: config.root + '/server/views/partial/'+config.partial},
  ]),
];
// 添加多个路由的编译html
webpackPlugins = webpackPlugins.concat(baseEntry.htmls);
webpackPlugins.push(new InsterNunjucksHtml());

module.exports = {
  entry: Object.assign({
    'static/common': path.resolve(__dirname, '../src/chunks/common.js'),
  }, baseEntry.entrys),
  output: {
    path: path.resolve(__dirname, config.output.path),
    filename: config.output.filename,
    publicPath: config.output.publicPath,
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
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css'],
  },
  plugins: webpackPlugins,
};
