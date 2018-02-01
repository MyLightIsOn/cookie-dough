// server.js

const express = require('express');
const path = require('path');
const request = require('request-promise');

const app = express();

// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + '/dist'));
app.use('/', express.static('app', { redirect: false }));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html')); // load our index.html file
});

// Start the app by listening on the default
// Heroku port                                                                              0

app.headers = {};
app.baseURL = process.env.BASEURL;
app.headers[process.env.API_ID_HEADER] = process.env.API_ID;
app.headers[process.env.API_KEY_HEADER] = process.env.API_KEY;

app.get('/api/companies', function (req, res) {
    
    const options = {
        url: process.env.BASEURL + 'v1/objects/object_1/records',
        qs: { rows_per_page: '1000' },
        headers: app.headers
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body)
    });
});

const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});