const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * This signs and returns a Json Web Token
 * @param {object} data the JWT payload
 * @param {string} secret - A secret key for use in JWT signing
 * @returns a signed JWT
 */
module.exports.getToken = (data) => {
    let token = jwt.sign(data, config.jwtSecret);
    return token;
};

/**
 * This verifies that a JWT is valid using the secret
 * @param {string} token - A signed JWT
 * @returns true if it is signed, else false
 */
module.exports.verifyToken = (token) => {
    let decryptedToken = null;
    try {
        decryptedToken = jwt.verify(token, config.jwtSecret);
    } catch(e) {
        return false;
    }
    if (decryptedToken == null) return false;
    if (! decryptedToken.username || ! decryptedToken.password) return false;
    return true;
};