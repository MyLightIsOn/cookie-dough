// server.js

const express = require('express');
const path = require('path');
const request = require('request-promise');
var errors = require('request-promise/errors');
const config = require('./config');

const app = express();

// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + '/dist'));
app.use('/', express.static('app', { redirect: false }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// Start the app by listening on the default
// Heroku port                                                                              0

app.get('/api/companies', function (req, res) {

    var options = {
        method: 'GET',
        url: config.baseURL + '/v1/objects/object_1/records',
        json: true,
        qs: {'rows_per_page': '1000'}
    };

    request(options, function (error, response, body) {
        if (error) {
            throw new Error(error);
        }
        res.send(body)
    }).catch(errors.StatusCodeError, function (reason) {
        res.send(reason.statusCode)
    });
});

const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html')); // load our index.html file
});
