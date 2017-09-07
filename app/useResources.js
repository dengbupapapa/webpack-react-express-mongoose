let path, express, webpackDevMiddleware, webpackHotMiddleware, webpack, webpackConfig, compiler, configLite, config;

path = require("path");
express = require('express');
webpackDevMiddleware = require("webpack-dev-middleware");
webpackHotMiddleware = require("webpack-hot-middleware");
webpack = require('webpack');
webpackConfig = require('./webpack.config.js');
configLite = require('config-lite');
config = configLite(__dirname);
compiler = webpack(webpackConfig);

function disposeAsync(req, res, next) { //区分异步请求和页面渲染
    if (/^\/api/.test(req.url)) {
        next('route');
    } else {
        next();
    }
}

module.exports.init = function(app) {

    if (config.env) {

        app.use(webpackDevMiddleware(compiler, {
            //hot: true,
            //filename: 'bundle.js',
            publicPath: webpackConfig.output.publicPath,
            stats: {
                colors: true,
            },
            //historyApiFallback: true,
            //noInfo:true
        }));

        app.use(webpackHotMiddleware(compiler, {
            // log: false,
            path: '/__webpack_hmr',
            //heartbeat: 10 * 1000,
        }));

        app.get('*', disposeAsync, (req, res, next) => {

            let filepath = path.join(compiler.outputPath, 'WEB-INF/index.html');

            // 使用webpack提供的outputFileSystem
            compiler.outputFileSystem.readFile(filepath, function(err, result) {
                if (err) {
                    // something error
                    return next(err);
                }
                res.set('content-type', 'text/html');
                res.send(result);
                res.end();

            });

        });

    } else {

        app.use(express.static(path.join(__dirname, 'publish')));

        app.get('*', disposeAsync, (req, res) => {

            res.sendFile(path.join(__dirname, './publish/WEB-INF/index.html'));

        });

    }

}