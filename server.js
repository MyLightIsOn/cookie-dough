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
    console.log('help');
    res.sendFile(path.join(__dirname, 'dist/index.html')); // load our index.html file
});

// Start the app by listening on the default
// Heroku port                                                                              0

app.headers = {};
app.headers[process.env.API_ID_HEADER] = process.env.API_ID;
app.headers[process.env.API_KEY_HEADER] = process.env.API_KEY;

app.get('/companies', function (req, res) {
    var options = { method: 'GET',
        url: process.env.BASEURL + 'v1/objects/object_1/records',
        qs: { rows_per_page: '1000' },
        headers: app.headers
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
    res.send(body)
});

app.listen(process.env.PORT || 8080);