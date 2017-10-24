import express from 'express';
import controllers from './controllers';
import middlewares from './middlewares';
let port = 8080;
let app = express();

// 设置中间件
app.use(middlewares);

// 设置路由
app.use(controllers);


app.listen(port, ()=>{
    console.log('listen on port '+ port);
});
