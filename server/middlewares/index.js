'use strict';
const nunjucks = require('nunjucks');
const webpackMiddleWare = require('./webpack.middleware');
const bodyParser = require('body-parser');

module.exports = (app) => {
    // 引入nunjucks
    nunjucks.configure('views', {
        autoescape: true,
        express: app,
    });
    // 引入webpack 相关中间件
    webpackMiddleWare(app);
    // 引入bodyParser 中间件
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: false,
    }));

    // parse application/json
    app.use(bodyParser.json());
};
