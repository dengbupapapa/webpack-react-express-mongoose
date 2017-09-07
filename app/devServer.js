const express = require('express');
const app = express();
const useResources = require('./useResources.js');
const proxy = require('express-http-proxy');
const url = require('url');
const configLite = require('config-lite');
const config = configLite(__dirname);
// const logger = require('morgan');
const apiProxy = proxy(config.devWebpackProxyHost + ':' + (config.port + 1), {
    proxyReqPathResolver(req) {
        // console.log(req.url, url.parse(req.url).path)
        return url.parse(req.url).path;
    },
    // maybeSkipToNextHandler(proxyRes) {
    //     console.log(proxyRes);
    //     return 1;
    // }
});
//app.use(logger('dev'));
useResources.init(app);
app.use(apiProxy);

app.set('port', config.port);
app.listen(app.get('port'), function() {
    console.log('devServer started: http://localhost:' + app.get('port'));
});