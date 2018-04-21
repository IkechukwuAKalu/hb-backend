/**
 * A Logger wrapper class.
 */
const winston = require('winston');

module.exports = class Logger {

    constructor(name) {
        this.logger = new winston.Logger({
            transports: [
                new winston.transports.File({
                    name: 'info-file',
                    filename: 'filelog-info.log',
                    level: 'info'
                }),
                new winston.transports.File({
                    name: 'error-file',
                    filename: 'filelog-error.log',
                    level: 'error'
                }),
                new winston.transports.Console({
                    name: 'console-log',
                    colorize: true
                })
            ]
        });
        winston.addColors({
            info: 'blue',
            error: 'red'
        });
    }

    info(message) {
        this.logger.info(message);
    }

    error(message) {
        this.logger.error(message);
    }
};