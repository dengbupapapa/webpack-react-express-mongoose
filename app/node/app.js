const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectMongo = require('connect-mongo');

const middleware = require('./controller/middleware/index.js');
const controller = require('./controller/async/index.js');
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
    store: new MongoStore(config.MongoStoreArg)
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