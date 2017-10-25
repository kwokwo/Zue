'use strict';
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
module.exports = (app) => {
    app.use(cookieParser());
    app.use(csurf({
        cookie: true,
    }));
};
