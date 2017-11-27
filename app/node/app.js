const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectMongo = require('connect-mongo');
const db = require('./mongoose/db.js');

const middleware = require('./middleware/index.js');
const controller = require('./controller/index.js');
// const url = require('url');
const useResources = require('../useResources.js');
const configLite = require('config-lite');

const config = configLite(__dirname);
const MongoStore = connectMongo(session);

require('./model/index.js');

// const debug = require('debug')('app');

app.use(cookieParser());

app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new MongoStore({
        // url: config.url
        url: 'mongodb://localhost:27017/session',
        // autoRemove: 'native'
        // host: 'mongodb://localhost', //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        // port: 27017, //数据库的端口号
        // db: 'session' //数据库的名称。
    })
}))

app.use(logger('dev'));
app.disable('x-powered-by'); //禁用x-powered-by
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

middleware.init(app); //middleware
controller.init(app); //minirouter
if (!config.env) {
    useResources.init(app);
} //useResources

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => { //errer middleware
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;