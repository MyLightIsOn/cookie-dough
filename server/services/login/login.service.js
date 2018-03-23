const request = require('request-promise');
const config = require('../../config');

module.exports = {
    login : function (req, res) {

        function checkEnv(){
            if(config.baseURL === 'http://localhost:3000'){
                return 'GET'
            } else {
                return 'POST'
            }
        }
        const options = {
            method: checkEnv(),
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