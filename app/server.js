const app = require('./node/app');
const configLite = require('config-lite');
const config = configLite(__dirname);
const openDB = require('./node/mongoose/db.js');

app.set('port', config.port + 1);

openDB(() => {

    app.listen(app.get('port'), () => {
        if (!config.env) {
            console.log('Server started: http://localhost:' + app.get('port'));
        }
    });

})