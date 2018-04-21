const {Router} = require('express');
const Middleware = require('../utils/middleware');
const Controller = require('./controller');

const router = Router();

/** Authentication */
router.post('/login', Middleware.checkUsernameAndPassword, Controller.login);

/** JSON Patch */
router.patch('/apply-patch', Middleware.verifyToken, Controller.applyPatch);

/** Image thumbnail */
router.get('/gen-thumbnail', Middleware.verifyToken, Controller.generateThumbnail);

module.exports = { router };