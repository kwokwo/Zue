import nunjucks from 'nunjucks';
import express from 'express';
import bodyParser from 'bodyParser';
const app = express();

// 引入nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.use(bodyParser);


