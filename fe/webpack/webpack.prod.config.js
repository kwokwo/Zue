const merge = require('webpack-merge');
const config = require('./config');
const baseWebpackConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {

    plugins: [
        new CleanWebpackPlugin([config.rootPath + '/build'], {root: process.cwd()}),
        // 复制 partial 公共部分到views
          new CopyWebpackPlugin([
            {
              context: path.resolve(__dirname, '../src/partial/'+config.partial),
              from: '**/*.html',
              to: config.root + '/server/views/partial'},
          ]),
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
