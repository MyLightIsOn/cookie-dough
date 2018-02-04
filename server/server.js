const express = require('express');
const compress = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

// My dependecies
const path = require('path');
const routes = require('./routes');

// Enable compression and body parsing
app.use(helmet());
app.use(compress());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// Run the app by serving the static files
// in the dist directory
app.use('/', express.static(path.join(__dirname, '../dist')));

// Headers
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// My routes
app.use('/', routes);

// Catch all route
app.use('/*', express.static(path.join(__dirname, '../dist')));

// Start server
const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});


