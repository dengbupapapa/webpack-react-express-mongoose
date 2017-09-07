const glob = require('glob');
const path = require('path');
const configLite = require('config-lite');
const config = configLite(__dirname);

module.exports.init = function(app) {

    let dirname = __dirname.match(/.*\/(.*)/)[1];
    let reg = new RegExp(dirname + '(\/.*)');

    let files = glob.sync(path.join(__dirname, '@(**|!index.js)/**'), {
        nodir: true
    });

    let logRoutes = files.map((item, i) => {

        let fileDir = item.match(reg)[1];
        let routerMini = require('.' + fileDir);

        if (typeof routerMini.route === 'function') {

            app.use(config.notTemplateRequestUriPrefix + fileDir.replace(/\.js$/, ''), routerMini);

            return fileDir;

        }

    });

    console.log(logRoutes);

}