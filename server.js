// server.js

const express = require('express');
const app = express();

// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + '/dist'));
app.use('/', express.static('app', { redirect: false }));
app.get('*', function (req, res) {
    res.sendfile('./dist/index.html'); // load our index.html file
});

// Start the app by listening on the default
// Heroku port


app.listen(process.env.PORT || 8080);
