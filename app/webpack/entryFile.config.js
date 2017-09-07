let path, glob;

path = require("path");
glob = require('glob');

let files, srcDir, pattern, urls, excludeLess;

files = new Array();
srcDir = path.resolve(process.cwd(), 'source');
pattern = srcDir + '/static/less/**';
urls = glob.sync(pattern, {
    nodir: true
});

excludeLess = ['reset'];

urls.forEach(function(item) {

    let matchs = item.match(/static\/less\/(.+)\.(css|less)$/);

    if (!excludeLess.includes(matchs[1])) files.push('./' + matchs[0]);

});

let HtmlWebpackPlugin, configLite, config, javascriptFiles, plugins;

HtmlWebpackPlugin = require('html-webpack-plugin');
configLite = require('config-lite');
config = configLite(__dirname);
javascriptFiles = new Object();
plugins = new Array();

javascriptFiles['vendors'] = [
    'babel-polyfill',
    'react',
    'react-dom',
    'react-router',
    'redux',
    'react-redux',
    'redux-thunk',
    'redux-promise',
    'reselect',
    'immutable',
    'prop-types',
    'fetch-default',
    './static/less/reset.less'
].concat(files);

javascriptFiles['index'] = ['./src/index.js'];

if (config.env) {

    javascriptFiles['index'].push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');

}

plugins.push(new HtmlWebpackPlugin({ //html出入口
    filename: './WEB-INF/index.html',
    template: './WEB-INF/index.html',
    inject: 'body',
    minify: {
        removeComments: !config.env,
        collapseWhitespace: !config.env,
        minifyJS: !config.env,
        minifyCSS: !config.env
    },
    cache: !config.env
}))

module.exports = {
    javascriptFiles: javascriptFiles,
    plugins: plugins
};