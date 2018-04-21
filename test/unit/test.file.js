const {assert} = require('chai');
const file = require('../../utils/file');

describe('utils/file.js', () => {

    describe('#getBaseDirPath()', () => {

        it('should return the parent directory path', () => {

            let currentPath = "/home/user/nodejs_projects/hackerbay";
            let parentPath = file.getBaseDirPath(currentPath);
            assert.deepEqual("/home/user/nodejs_projects", parentPath);
        });
    });
});