const request = require('request-promise');
const config = require('../../config');

module.exports = {
    register : function (req, res) {
        const options = {
            method: 'POST',
            url: config.baseURL + '/v1/pages/scene_5/views/view_10/records',
            headers: config.headers,
            body: req.body,
            json: true
        };

        request(options)
            .then(function (parsedBody) {
                return res.send(parsedBody);
            })
            .catch(function (err) {
                return res.send(err)
            });
    },

    verifyAccount : function (req, res) {
        const options = {
            method: 'PUT',
            url: config.baseURL + '/v1/objects/object_2/records/' + req.query.id,
            headers: config.headers,
            body: req.body,
            json: true
        };

        request(options)
            .then(function (parsedBody) {
                return res.send(parsedBody);
            })
            .catch(function (err) {
                console.log(err);
                return res.send(err)
            });
    }
};