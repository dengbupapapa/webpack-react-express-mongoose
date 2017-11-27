'use strict';

const mongoose = require('mongoose');
const configLite = require('config-lite');
const config = configLite(__dirname);

var db = mongoose.connect(config.dbUri, {
    useMongoClient: true,
    /* other options */
});
mongoose.Promise = global.Promise;
/* Use `db`, for instance `db.model()`*/
db.once('open', () => {
    console.log('连接数据库成功')
})

db.on('error', (error) => {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', () => {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(config.dbUri, {
        useMongoClient: true,
        /* other options */
    });
});

module.exports = db;