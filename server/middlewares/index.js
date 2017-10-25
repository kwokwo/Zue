'use strict';
const nunjucks = require('nunjucks');
const webpackMiddleWare = require('./webpack.middleware');
const bodyParser = require('body-parser');
const compression = require('compression');
const csurf = require('./csurf');
const helmet = require('helmet');
const config = require('../config/server.config');
module.exports = (app) => {
    app.use(helmet());
    // 引入webpack 相关中间件
    webpackMiddleWare(app);
    // 引入bodyParser 中间件
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: false,
    }));

    // parse application/json
    app.use(bodyParser.json());
    csurf(app);
    // compression website
    app.use(compression());
};
