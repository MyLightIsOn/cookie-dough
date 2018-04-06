const request = require('request-promise');
const config = require('../../config');

module.exports = {
    register : function (req, res) {
		function checkEnv(){
			if(config.baseURL === 'http://localhost:3000'){
				return 'GET'
			} else {
				return 'POST'
			}
		}

        const options = {
            method: checkEnv(),
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
		function checkEnv(){
			if(config.baseURL === 'http://localhost:3000'){
				return 'GET'
			} else {
				return 'PUT'
			}
		}

        const options = {
            method: checkEnv(),
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
                return res.send(err)
            });
    }
};