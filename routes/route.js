const route = require('express').Router();
const register = require('../controllers/register')
const login = require('../controllers/login')


route.post('/register',register)
route.post('/login',login)


module.exports = route;