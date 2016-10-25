const http = require('http');
const app = require('./app');
const config = require('./config/config');

let server = http.createServer(app);

server.listen(process.env.PORT || config.get('port'));
server.on('error', (error) => {
    console.error(error);
});
server.on('listening', () => {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});