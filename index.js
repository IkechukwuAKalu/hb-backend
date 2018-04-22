/** Require modules */
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

/** Initialize express application */
const app = express();
let httpServer = http.createServer(app);

/** Configure express to use body parser for form data */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Export app for use in other files */
exports.app = app;

/** Set the application {@link api/routes.js} */
app.use('', require('./api/routes').router);

/** Handles 404 errors */
app.use((req, res, next) => {
    res.status(404).json({error: `Cannot ${req.method} ${req.originalUrl}`});
});

/** Start the server {@link utils/server.js} */
require('./utils/server').start(httpServer)