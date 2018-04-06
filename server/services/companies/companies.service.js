const request = require('request-promise');
const errors = require('request-promise/errors');
const config = require('../../config');

module.exports = {
    getAll : function (req, res) {
		const options = {
            url: config.baseURL + '/v1/objects/object_1/records',
            headers: config.headers,
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
    },

	getOne : function (req, res) {
		const options = {
			url: config.baseURL + '/v1/objects/object_1/records/' + req.query.id,
			headers: config.headers,
			json: true,
		};

		request(options, function (error, response, body) {
			if (error) {
				throw new Error(error);
			}
			res.send(body)
		}).catch(errors.StatusCodeError, function (reason) {
			res.send(reason.statusCode)
		});
	}
};