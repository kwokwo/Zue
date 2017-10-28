'use strict';
const express = require('express');
const router = express.Router();

/**
 * 基本设置
 */

router.use('/detail', (req, res)=>{
    res.render('user/detail/detail');
});
router.use('/login', (req, res)=>{
    res.render('pages/user/login/login', {title: '百度少年'});
});
module.exports = router;
