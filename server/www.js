'use strict';
const express = require('express');
const controllers = require('./controllers');
const middlewares = require('./middlewares');
const config = require('./config/server.config');
let app = express();

// 设置中间件
middlewares(app);

// 设置路由
app.use(controllers);

app.listen(config.port, ()=>{
    console.log('listen on port '+ config.port);
});
