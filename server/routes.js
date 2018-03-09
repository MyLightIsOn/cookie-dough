const routes = require('express').Router();
const companies = require('./services/companies/companies.service');
const reviews = require('./services/reviews/reviews.service');
const login = require('./services/login/login.service');
const register = require('./services/register/register.service');

routes.get('/', function(req, res) {
    res.status(200).json({ message: 'Connected!' });
});

// Company Routes
routes.get('/api/companies', companies.getAll);

// Review Routes
routes.get('/api/reviews', reviews.getAll);

// Login Routes
routes.post('/api/login', function(req, res){ return login.login(req, res)});

// Register Routes
routes.post('/api/register', function(req, res){ return register.register(req, res)});

module.exports = routes;