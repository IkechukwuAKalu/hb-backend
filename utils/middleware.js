/**
 * This file contains route middlewares
 */

const jwt = require('./jwt'); /** {@link jwt.js} */

module.exports = class Middleware {

    /** Checks if the username and password are supplied */
    static checkUsernameAndPassword(req, res, next) {
        if (! req.body.username || ! req.body.password) {
            return res.json({error: 'Username and password must be provided'});
        }
        next();
    }

    /** Checks if the token is valid or invalid */
    static verifyToken(req, res, next) {
        if (! jwt.verifyToken(req.headers.token || '')) {
            return res.status(401).json({error: 'Token is invalid or missing'});
        }
        next();
    }
};