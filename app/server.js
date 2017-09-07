const app = require('./node/app');
const configLite = require('config-lite');
const config = configLite(__dirname);

app.set('port', config.port + 1);
app.listen(app.get('port'), function() {
    if (!config.env) {
        console.log('Server started: http://localhost:' + app.get('port'));
    }
});