const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const middleware = require('./middleware/index.js');
const controller = require('./controller/index.js');
const url = require('url');
const useResources = require('../useResources.js');
const configLite = require('config-lite');
const config = configLite(__dirname);

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