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
        let devMiddleware = webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
            hot: true,
            quiet: true,
        });
        let hotMiddleware = webpackHotMiddleware(compiler);
        // add html hmr
        compiler.plugin('compilation', (compilation) => {
            compilation.plugin('html-webpack-plugin-after-emit', (data, callback) => {
                hotMiddleware.publish({
                    action: 'reload',
                });
                callback();
            });
        });
        // use webpackDevMiddleware
        app.use(devMiddleware);
        // user webpackHotMiddleware
        app.use(hotMiddleware);
    } else {
        webpack(webpackConfig);
    }
};
