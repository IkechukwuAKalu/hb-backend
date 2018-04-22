const {Router} = require('express');
const Middleware = require('../utils/middleware'); /** {@link ../utils/middleware.js} */
const Controller = require('./controller'); /** {@link controller.js} */

const router = Router();

/** Authentication URL */
router.post('/login', Middleware.checkUsernameAndPassword, Controller.login);

/** JSON Patch URL */
router.patch('/apply-patch', Middleware.verifyToken, Controller.applyPatch);

/** Image thumbnail URL */
router.get('/gen-thumbnail', Middleware.verifyToken, Controller.generateThumbnail);

module.exports = { router };