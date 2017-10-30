const merge = require('webpack-merge');
const config = require('./config');
const baseWebpackConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {

    plugins: [
        // 清空缓存
        new CleanWebpackPlugin([config.rootPath + '/output'], {root: process.cwd()}),
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
