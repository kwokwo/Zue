'use strict';

const webpackMiddleWare = require('./webpack.middleware');
const bodyParser = require('body-parser');
// const compression = require('compression');
const csurf = require('./csurf');
const helmet = require('helmet');
module.exports = (app) => {
    // xss
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
    // app.use(compression());
};
