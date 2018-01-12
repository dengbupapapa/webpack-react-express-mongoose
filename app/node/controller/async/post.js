const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const UserModel = mongoose.model('User');

router.get('/', (req, res, next) => {
    res.json({
        "a": "1",
        "b": "2"
    });
});

router.post('/', (req, res, next) => {
    res.json({
        "a": "post",
        "b": "2"
    });
});
module.exports = router;