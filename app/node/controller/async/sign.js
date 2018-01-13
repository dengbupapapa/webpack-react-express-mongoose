const express = require('express');
const router = express.Router();
const debug = require('debug')('sign');
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

router.post('/in', async (req, res, next) => { //登录

    let user = new UserModel(req.body);

    try {
        let result = await user.save();
        res.json({
            sign: '登录',
            messages: result
        });
    } catch (e) {
        res.json({
            sign: '登录',
            messages: e
        });
    }

});

router.post('/out', (req, res, next) => { //登出

    // let user = new UserModel(req.body);

    // try {
    //     let result = await user.save();
    //     res.json({
    //         sign: '登出',
    //         messages: result
    //     });
    // } catch (e) {
    //     res.json({
    //         sign: '登出',
    //         messages: e
    //     });
    // }

});

router.post('/register', async (req, res, next) => { //注册

    // debug(req.body);

    let user = new UserModel(req.body);

    try {

        let result = await user.save();

        res.json({
            sign: '注册',
            messages: result
        });

    } catch (e) {

        res.json({
            sign: '注册e',
            messages: e
        });
        // next(e);
    }

});

module.exports = router;