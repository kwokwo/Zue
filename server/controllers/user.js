'use strict';
const express = require('express');
const router = express.Router();

/**
 * 基本设置
 */
router.use('/:id', (req, res)=>{
    res.send('123123');
});

router.use('/', (req, res)=>{
    res.send('user controller');
});
module.exports = router;
