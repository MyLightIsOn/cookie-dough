const request = require('request-promise');
const config = require('../../config');

module.exports = {
    login : function (req, res) {
        const options = {
            method: 'POST',
            url: config.baseURL + '/v1/applications/' + config.appId + '/session',
            body: {
                email: req.body.email,
                password: req.body.password
            },
            json: true
        };

        request(options)
            .then(function (parsedBody) {
                return res.send(parsedBody);
            })
            .catch(function (err) {
                return res.send(err)
            });
    }
};