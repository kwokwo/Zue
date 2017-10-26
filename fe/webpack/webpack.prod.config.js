const merge = require('webpack-merge');
const path = require('path');
const config = require('./config');
const baseWebpackConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'less-loader'],
                }),
              },
        ],
      },
    }
);
