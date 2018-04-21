const path = require('path');

/**
 * This returns the base directory path for a given directoty
 * @param {string} dirname - the current directory path
 * @returns the base directory path
 */
module.exports.getBaseDirPath = (dirname) => {
    let currentDir = dirname.split(path.sep);
    currentDir.pop();
    let baseDir = currentDir.join(path.sep);
    return baseDir;
};