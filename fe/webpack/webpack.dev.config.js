const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
// const config = require('./config');
const baseWebpackConfig = require('./webpack.base.config');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
    devServer: {
        contentBase: path.resolve(__dirname, '../build'),
        host: '0.0.0.0',
    },
    devtool: 'source-map',
    plugins: [
        // new CleanWebpackPlugin([config.frontendProject + '/build'], {root: process.cwd()}),
        // 在 webpack 插件中引入 webpack.HotModuleReplacementPlugin
        new webpack.HotModuleReplacementPlugin(),
    ],
    }
);
