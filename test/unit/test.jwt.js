const {assert} = require('chai');
const jwt = require('../../utils/jwt');

describe('utils/jwt.js', () => {

    describe('#getToken()', () => {

        it('should return a valid JSON Web Token', () => {

            let token = jwt.getToken({
                username: 'Leo',
                password: 'leospassword'
            });
            assert.isNotEmpty(token);
            assert.match(token, /^.+\..+\..+$/);
        });
    });

    describe('#verifyToken()', () => {

        it('should return true while verifying a valid token', () => {

            let token = jwt.getToken({
                username: 'Mary',
                password: 'maryspassword'
            });
            let isValid = jwt.verifyToken(token);
            assert.isTrue(isValid);
        });

        it('should return false while verifying an invalid', () => {

            let token = jwt.getToken({
                username: 'Mary'
            });
            let isValid = jwt.verifyToken(token);
            assert.isFalse(isValid);
        });

        it('should return false while verifying an empty token', () => {

            let token = '';
            let isValid = jwt.verifyToken(token);
            assert.isFalse(isValid);
        });
    });
});