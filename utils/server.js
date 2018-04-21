const Logger = require('./logger');

let logger = new Logger('Server');
let port = process.env.PORT || 3000;

/**
 * This binds the server to a port by incrementing the port numbers if they are in use
 * @param {HttpServer} httpServer the http server object
 */
function start(httpServer) {
    server = httpServer.listen(port, () => {
        logger.info(`API service app is listening on port ${port}`);
        return;
    }).on('error', () => {
        logger.error(`Port ${port} is in use`);
        port += 1;
        start(httpServer);
    });
}

module.exports = { start };