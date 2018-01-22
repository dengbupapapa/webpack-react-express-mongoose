let path, webpack, configLite, config;

path = require('path');
webpack = require('webpack');
configLite = require('config-lite');
config = configLite(__dirname);

let DEBUG = process.env.DEBUG

module.exports = {
    cache: true,
    context: path.join(__dirname, '../source'),
    devtool: config.env ? 'inline-source-map' : 'source-map', //cheap-source-map
    output: {
        path: path.join(__dirname, '../publish'),
        filename: 'javascript/[name].js' + (!config.env ? '?[hash]' : ''),
        publicPath: '/',
        chunkFilename: path.join('javascript/chunk/[name].chunk.js') + (!config.env ? '?[hash]' : '')
    },
    resolve: {
        alias: {
            //src下目录
            '@actions': path.join(__dirname, '../source/src/redux/actions'),
            '@reducers': path.join(__dirname, '../source/src/redux/reducers'),
            '@middlewares': path.join(__dirname, '../source/src/redux/middleware'),
            '@routes': path.join(__dirname, '../source/src/routes'),
            //static下目录
            '@js': path.join(__dirname, '../source/static/javascript'),
            '@less': path.join(__dirname, '../source/static/less'),
            '@imgs': path.join(__dirname, '../source/static/images'),
            '@libs': path.join(__dirname, '../source/static/lib'),
            //module下目录
            '@uses': path.join(__dirname, '../source/src/module/use'),
            '@widgets': path.join(__dirname, '../source/src/module/widget'),
        },
        extensions: ['', '.js', '.json', '.scss', '.css', '.less'],
    },
    module: {
        //noParse: [],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                plugins: []
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=1000&name=images/[hash].[ext]'
        }, {
            test: /\.css$/,
            exclude: [/node_modules/, path.join(__dirname, '../source/static/less')]
        }, {
            test: /\.less$/,
            exclude: [/node_modules/, path.join(__dirname, '../source/static/less')]
        }, {
            test: /\.css$/,
            include: [/node_modules/, path.join(__dirname, '../source/static/less')]
        }, {
            test: /\.less$/,
            include: [/node_modules/, path.join(__dirname, '../source/static/less')]
        }, {
            test: /\.(eot|woff|ttf|svg)/,
            loader: 'file?name=elseFile/[hash]&prefix=font/'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', path.join('javascript/public/[name].js') + (!config.env ? '?[hash]' : '')),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                TOOL: JSON.stringify(Boolean(process.env.TOOL)),
                DEBUG: JSON.stringify(process.env.DEBUG)
            },
            'notTemplateRequestUriPrefix': JSON.stringify(config.notTemplateRequestUriPrefix),
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            'PropTypes': 'prop-types',
            'Debug': 'debug'
        })
    ]
};