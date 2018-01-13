'use strict';

const debug = require('debug')('signService');
const crypto = require('crypto');
const assert = require('assert');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *User schema
 */
const userSchema = new Schema({
    phoneNo: {
        type: String
    },
    hashed_password: {
        type: String
    },
    secret: {
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
 * Virtuals
 */

userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.secret = this.generateSecret();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema
    .virtual('confirmPassword')
    .set(function(confirmPassword) {
        this._confirmPassword = confirmPassword;
    })
    .get(function() {
        return this._confirmPassword;
    });

/**
 * Validations
 */

userSchema.path('phoneNo').required(true, '手机号码不能为空！');
userSchema.path('phoneNo').unique(true, '手机号码已存在！');
userSchema.path('phoneNo').validate((value) => /^[1][358][0-9]{9}$/.test(value), '请输入正确的手机号码格式！');

// debug('userSchema:', userSchema.virtuals.__proto__);
// debug('phoneNo:', userSchema.phoneNo);
// debug('password:', userSchema.virtuals.path);

userSchema.path('hashed_password').validate(function(value) {
    return assert.equal(this.password, this.confirmPassword);
}, '两次密码不相同！');

userSchema.path('hashed_password').required(true, '用户密码不能为空！');

userSchema.path('email').required(true, '用户邮箱不能为空！');
userSchema.path('email').unique(true, '用户邮箱已存在！');

/**
 * Pre hook
 */

userSchema.pre('save', function(next) {
    // debug(this.password, this.confirmPassword, this.__proto__.path);
    // assert.equal(this.password, this.confirmPassword, '密码与确认密码不等！');
    // this.update({}, {
    //     $set: {
    //         updatedAt: new Date()
    //     }
    // });
    next();
});

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
     *生成Secret
     */
    generateSecret() {

        return crypto
            .createHash('md5')
            .update(new Date().getTime().toString())
            .digest('hex')

    }

    /**
     *加密密码
     */
    encryptPassword(password) {

        if (!password) return '';

        return crypto
            .createHmac('sha1', this.secret)
            .update(password)
            .digest('hex');

    }

    /**
     * Statics
     */

}

userSchema.loadClass(userClass);
mongoose.model('User', userSchema);