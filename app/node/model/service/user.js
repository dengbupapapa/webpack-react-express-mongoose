'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 *User schema
 */
const userSchema = new Schema({
    phoneNo: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    registerTime: {
        type: Date
    },
    lastSignInTime: {
        type: Date
        // default: new Date().getTime();
    }
});

/**
 * Validations
 */

userSchema.path('phoneNo').required(true, '手机号码不能为空！');
userSchema.path('phoneNo').unique(true, '手机号码已存在！');
userSchema.path('phoneNo').validate((value) => /^[1][358][0-9]{9}$/.test(value), '请输入正确的手机号码格式！');

userSchema.path('password').required(true, '用户密码不能为空！');

userSchema.path('email').required(true, '用户邮箱不能为空！');
userSchema.path('email').unique(true, '用户邮箱已存在！');

/**
 * Virtuals
 */

/**
 * Pre hook
 */

userSchema.pre('update', function(next) {
    // this.update({}, {
    //     $set: {
    //         updatedAt: new Date()
    //     }
    // });
    next();
});

class userClass {

    /**
     * Methods
     */

    /**
     * Statics
     */

}

userSchema.loadClass(userClass);
mongoose.model('User', userSchema);