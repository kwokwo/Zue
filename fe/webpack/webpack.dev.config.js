const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const config = require('./config');
const baseWebpackConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

 // hot script
 const devClient = path.resolve(__dirname, './multi-route/hot-reload');
 Object.keys(baseWebpackConfig.entry).forEach((name) => {
    let extras = [devClient];
    baseWebpackConfig.entry[name] = extras.concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
    devServer: {
        contentBase: path.resolve(__dirname, '../build'),
        host: '0.0.0.0',
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin([config.frontendProject + '/build'], {root: process.cwd()}),
        // 在 webpack 插件中引入 webpack.HotModuleReplacementPlugin
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
          {
            test: /\.(less|css)$/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'less-loader'],
            })),
          },
        ],
      },
    }
);
