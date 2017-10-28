'use strict';
const ora = require('ora');
const chalk = require('chalk');
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
        console.log(config.output.publicPath);
        let devMiddleware = webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
            hot: true,
            quiet: true,
            stats: {
                colors: true,
            },
        });
        let hotMiddleware = webpackHotMiddleware(compiler, {
            heartbeat: 2000,
        });
        // add html hmr
        compiler.plugin('compilation', (compilation) => {
            compilation.plugin('html-webpack-plugin-after-emit', (data, callback) => {
                setTimeout(()=>{
                    hotMiddleware.publish({
                        action: 'reload',
                    });
                }, 1000);
                callback();
            });
        });
        // use webpackDevMiddleware
        app.use(devMiddleware);
        // user webpackHotMiddleware
        app.use(hotMiddleware);
    } else {
        const spinner = ora('building for production...');
        spinner.start();
        webpack(webpackConfig, function(err, stats) {
            spinner.stop();
            if (err) throw err;
            process.stdout.write(stats.toString({
              colors: true,
              modules: false,
              children: false,
              chunks: false,
              chunkModules: false,
            }) + '\n\n');

            if (stats.hasErrors()) {
              console.log(chalk.red('  Build failed with errors.\n'));
              process.exit(1);
            }

            console.log(chalk.cyan('  Build complete.\n'));
            console.log(chalk.yellow(
              '  Tip: built files are meant to be served over an HTTP server.\n' +
              '  Opening index.html over file:// won\'t work.\n'
            ));
          });
    }
};
