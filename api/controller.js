/**
 * This is the controller file for the {@link routes.js}
 */

const jsonpatch = require('jsonpatch');
const Jimp = require('jimp');
const {app} = require('../index');
const jwt = require('../utils/jwt');
const file = require('../utils/file');
const Logger = require('../utils/logger');

let logger = new Logger('Controller');

module.exports = class Controller {

    /**
     * Logins in users and signs JWTs for requests
     * @param {object} req - The request object. This contains a property called 'body'.
     * This body property is an object in the format { username: 'username', password: 'password'}
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */
    static login(req, res, next) {
        let token = jwt.getToken(req.body);
        res.json(token);
    }

    /**
     * Responsible for Applying patches
     * @param {object} req - The request object. This contains a property called 'body'.
     * This body property is an object in the format { 
     *      jsonObj: {"name": "Leo",  "city": "Umuahia"}, 
     *      patchObj: {"op": "replace", "path": "/name", "value": "Ikechukwu"}
     * }
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */
    static applyPatch(req, res, next) {
        if (! req.body.jsonObj || ! req.body.patchObj) {
            return res.json({error: 'JSON Object and JSON Patch Object are both required'});
        }
        let jsonObj = req.body.jsonObj;
        let patchObj = req.body.patchObj;
        let patchedObj = null;
        try {
            if (typeof jsonObj == 'string') jsonObj = JSON.parse(jsonObj);
            if (typeof patchObj == 'string') patchObj = JSON.parse(patchObj);
            patchedObj = jsonpatch.apply_patch(jsonObj, [ patchObj ]);
        } catch (e) {
            logger.error(e);
        }
        if (patchedObj == null) res.json({error: "An error occurred while applying patch"});
        else res.json(patchedObj);
    }

    /**
     * This downloads, resizes and returns an image thumbnail.
     * @param {object} req - The request object. This contains a property called 'query'.
     * This query property is an object that contains another object, 'image'. It has a format
     * { image: 'https://hackerbay.io/assets/CloudBoostLogo.png' }
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */
    static generateThumbnail(req, res, next) {
        if (! req.query.image) return res.json({error: "No image URL found"});

        Jimp.read(req.query.image)
        .then((lenna) => {
            lenna.resize(50, 50)
            .write("images/image.jpg");
            setTimeout(() => {
                // Timeout is used to account for any delays during the write operation
                let filePath = `${file.getBaseDirPath(__dirname)}/images/image.jpg`;
                return res.sendFile(filePath);
            }, 3000);
        })
        .catch((err) => {
            logger.error(err);
            res.json({error: 'An error occurred while resizing image. Please try again'});
        });
    }
};