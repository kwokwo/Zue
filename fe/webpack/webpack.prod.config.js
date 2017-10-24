const merge = require('webpack-merge');
const path = require('path');
const config = require('./config');
const baseWebpackConfig = require('./webpack.base.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    devServer: {
        contentBase: path.resolve(__dirname, '../../'+config.rootPath+'/build'),
        host: '0.0.0.0',
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin([config.rootPath + '/build'], {root: process.cwd()}),
    ],
    }
);
