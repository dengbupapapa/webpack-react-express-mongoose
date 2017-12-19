'use strict';

module.exports = {
    env: (process.env.NODE_ENV == 'development'),
    devWebpackProxyHost: 'localhost',
    port: 8686,
    notTemplateRequestUriPrefix: '/api',
    needTool: JSON.parse(process.env.npm_config_argv).cooked[2] == '--tool',
    session: {
        name: 'dbp',
        secret: 'dbp',
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        }
    },
    dbUri: 'mongodb://localhost:27017/refdemo',
    MongoStoreArg: {
        url: 'mongodb://localhost:27017/session'
    }
}