let webpack, ExtractTextPlugin, webpackConfigBase, entryFile, configLite, config;

webpack = require('webpack');
webpackConfigBase = require('./webpack/webpack.base.config');
entryFile = require('./webpack/entryFile.config');
configLite = require('config-lite');
config = configLite(__dirname);

if (config.env) {

    entryFile.plugins.push( //开发模式下热替换插件
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    );

    webpackConfigBase.module.loaders[0].query['env'] = {
        // this plugin will be included only in development mode, e.g.
        // if NODE_ENV (or BABEL_ENV) environment variable is not set
        // or is equal to "development"
        "development": {
            "plugins": [
                // must be an array with options object as second item
                ["react-transform", {
                    // must be an array of objects
                    "transforms": [{
                            // can be an NPM module name or a local path
                            "transform": "react-transform-hmr",
                            // see transform docs for "imports" and "locals" dependencies
                            "imports": ["react"],
                            "locals": ["module"]
                        }, {
                            // you can have many transforms, not just one
                            "transform": "react-transform-catch-errors",
                            "imports": ["react", "redbox-react"]
                        }]
                        // by default we only look for `React.createClass` (and ES6 classes)
                        // but you can tell the plugin to look for different component factories:
                        // factoryMethods: ["React.createClass", "createClass"]
                }]
            ]
        }
    }

    webpackConfigBase.module.loaders[2].loader = 'style-loader!css-loader!postcss-loader';
    webpackConfigBase.module.loaders[3].loader = 'style-loader!css-loader!less-loader!postcss-loader';
    webpackConfigBase.module.loaders[4].loader = 'style-loader!css-loader!postcss-loader';
    webpackConfigBase.module.loaders[5].loader = 'style-loader!css-loader!less-loader!postcss-loader';

} else {

    ExtractTextPlugin = require('extract-text-webpack-plugin');

    entryFile.plugins.push( //生产模式
        new ExtractTextPlugin('css/[name].css?[hash]', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );

    webpackConfigBase.module.loaders[2].loader = ExtractTextPlugin.extract(['css-loader', 'postcss-loader']);
    webpackConfigBase.module.loaders[3].loader = ExtractTextPlugin.extract(['css-loader', 'less-loader', 'postcss-loader']);
    webpackConfigBase.module.loaders[4].loader = ExtractTextPlugin.extract(['css-loader', 'postcss-loader']);
    webpackConfigBase.module.loaders[5].loader = ExtractTextPlugin.extract(['css-loader', 'less-loader', 'postcss-loader']);

}

webpackConfigBase.entry = entryFile.javascriptFiles; //js入口文件
webpackConfigBase.plugins = webpackConfigBase.plugins.concat(entryFile.plugins); //插件集合

module.exports = webpackConfigBase;