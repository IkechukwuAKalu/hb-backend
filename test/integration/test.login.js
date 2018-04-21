const supertest = require('supertest');
const {assert} = require('chai');
const config = require('../../config');

describe('Login API', () => {

    const api = supertest(config.URL);

    it('can login and return a JWT', (done) => {

        const loginData = {
            username: 'johndoe',
            password: 'janedoe'
        };

        api.post('/login')
        .send(loginData)
        .expect((res) => {
            let token = res.body;
            assert.isNotEmpty(token);
            assert.match(token, /^.+\..+\..+$/);
        })
        .expect(200, done);
    });

    it('cannot login without a username', (done) => {

        const loginData = {
            username: 'lone_soldier'
        };

        api.post('/login')
        .send(loginData)
        .expect((res) => {
            let body = res.body;
            assert.exists(body.error);
        })
        .expect(200, done);
    });

    it('cannot login without a password', (done) => {

        const loginData = {
            password: 'some_super_tough_stuff'
        };

        api.post('/login')
        .send(loginData)
        .expect((res) => {
            let body = res.body;
            assert.exists(body.error);
        })
        .expect(200, done);
    });
});