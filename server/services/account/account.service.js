const request = require('request-promise');
const config = require('../../config');

module.exports = {
    update : function (req, res) {
        function checkEnv(){
            if(config.baseURL === 'http://localhost:3000'){
                return 'GET'
            } else {
                return 'POST'
            }
        }
        config.updatedHeaders['Authorization'] = req.body[1];

        const options = {
            method: checkEnv(),
            headers: config.updatedHeaders,
            url: config.baseURL + '/v1/pages/scene_2/views/view_1/records/' + req.body[2],
            body: req.body[0],
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