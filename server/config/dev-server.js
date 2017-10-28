'use strict';
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const controllers = require('../controllers/controllers');
const middlewares = require('../middlewares');
const config = require('./server.config');
let app = express();
// 引入nunjucks
nunjucks.configure(path.join(__dirname, '../views'), {
    autoescape: true,
    noCache: config.env == 'production' ? false : true,
    express: app,
});
app.set('view engine', 'html');

// 设置路由
app.use(controllers);

middlewares(app);


// error handler
app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    // handle CSRF token errors here
    res.status(403);
    res.send('form tampered with');
});

app.listen(config.port, () => {
    console.log('listen on port ' + config.port);
});
