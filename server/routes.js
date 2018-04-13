const routes = require('express').Router();
const multer = require('multer');
const companies = require('./services/companies/companies.service');
const reviews = require('./services/reviews/reviews.service');
const login = require('./services/login/login.service');
const register = require('./services/register/register.service');
const account = require('./services/account/account.service');

const upload = multer({ storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'uploads/')
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname + '-' + Date.now())
		}
	})
});


routes.get('/', function(req, res) {
    res.status(200).json({ message: 'Connected!' });
});

// Company Routes
routes.get('/api/companies', companies.getAll);
routes.get('/api/company/:id?', companies.getOne);

// Review Routes
routes.get('/api/reviews', reviews.getAll);

// Login Routes
routes.post('/api/login', function(req, res){ return login.login(req, res)});

// Register Routes
routes.post('/api/register', function(req, res){ return register.register(req, res)});
routes.put('/api/verify/:id?', function(req, res){ return register.verifyAccount(req, res)});

// Account Settings Routes
routes.put('/api/update-account', function(req, res){ return account.updateAccount(req, res)});
routes.put('/api/update-company/:id?', function(req, res){ return account.updateCompany(req, res)});
routes.post('/api/upload-image', upload.single('image'),function(req, res){ return account.uploadImage(req, res)});


module.exports = routes;