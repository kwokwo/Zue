'use strict';
const webpack = require('webpack');
const config = require('../config/server.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = (app) => {
    // get webpackConfig for webpack-dev and webpack-hot
    let webpackConfig = config.env == 'production' ?
        require(config.webpack.prodConfig) :
        require(config.webpack.devConfig);

    if (config.env == 'dev') {
        // compoler  webpackConfig
        const compiler = webpack(webpackConfig);
        // use webpackDevMiddleware
        app.use(webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
            noInfo: true, // 是否启动显示
            stats: {
                colors: true,
            },
        }));
        // user webpackHotMiddleware
        app.use(webpackHotMiddleware(compiler));
    } else {
        webpack(webpackConfig);
    }
};
