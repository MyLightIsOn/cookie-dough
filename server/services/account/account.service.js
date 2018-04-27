const request = require('request-promise');
const fs = require('fs');
const config = require('../../config');

module.exports = {
    updateAccount : function (req, res) {
		console.log(req.body);
        function checkEnv(){
            if(config.baseURL === 'http://localhost:3000'){
                return 'GET'
            } else {
                return 'PUT'
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
    },

	updateCompany : function (req, res) {
		function checkEnv(){
			if(config.baseURL === 'http://localhost:3000'){
				return 'GET'
			} else {
				return 'PUT'
			}
		}
		
		const options = {
			method: checkEnv(),
			url: config.baseURL + '/v1/objects/object_1/records/' + req.query.id,
			headers: config.headers,
			body: req.body[0],
			json: true,
		};

		request(options)
			.then(function (parsedBody) {
				return res.send(parsedBody);
			})
			.catch(function (err) {
				return res.send(err)
			});
	},

	uploadImage : function (req, res) {
		function checkEnv(){
			if(config.baseURL === 'http://localhost:3000'){
				return 'GET'
			} else {
				return 'POST'
			}
		}

		const formData = {
           files: fs.createReadStream('uploads/' + req.file.filename)
        };

		const options = {
			method: checkEnv(),
			headers: config.headers,
			url: config.baseURL + '/v1/applications/' + config.appId + '/assets/image/upload',
			formData: formData
		};

		request(options)
			.then(function (parsedBody) {
				fs.unlink('uploads/' + req.file.filename, function (err) {
					if (err) throw err;
				});
				return res.send(parsedBody);
			})
			.catch(function (err) {
				return res.send(err)
			});
	}
};