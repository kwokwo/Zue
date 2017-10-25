const path = require('path');
let config = {
    output: {
        filename: '[name].[hash].js',
        path: '../build',
        publicPath: 'http://localhost:8080/',
    },
    root: path.resolve(__dirname, '../../'),
    templateExt: 'html',
    frontendProject: 'fe',
    partial: 'nunjucks',
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV || 'dev',

};
Object.assign(config, {
    webpack: {
        devConfig: path.resolve(__dirname, '../../', config.frontendProject + '/webpack/webpack.dev.config.js'),
        testConfig: path.resolve(__dirname, '../../', config.frontendProject + '/webpack/webpack.test.config.js'),
        prodConfig: path.resolve(__dirname, '../../', config.frontendProject + '/webpack/webpack.prod.config.js'),
    },
});
module.exports = config;
