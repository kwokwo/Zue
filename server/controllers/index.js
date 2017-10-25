'use strict';
const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
// 额外的路由,申明一些规定和其他的路由
router.use('/', (req, res)=>{
    res.send('main controller');
});

module.exports = router;
