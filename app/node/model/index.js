// 'use strict';

// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// function userNameValidator(value) {
//     if (!/^[1][358][0-9]{9}$/.test(value)) return false;
// }

// /*
//  *user concentration
//  */
// const userSchema = new Schema({
//     userName: {
//         type: String,
//         required: true,
//         validate: [userNameValidator, '请输入正确的手机号码'] //validator是一个验证函数，err是验证失败的错误信息
//     },
//     password: {
//         type: String
//     }
// });

// mongoose.model('User', userSchema);

// /*
//  *say concentration
//  */
// const saySchema = new Schema({
//     content: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         required: true
//     },
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     }
// })

// mongoose.model('Say', saySchema);

require('./service/user.js');