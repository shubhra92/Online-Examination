//requred node modules
const route = require('express').Router();

//import user handelers
const { userCreate } = require('../controllers')


route.post('/register', userCreate );


//exports user routes
module.exports = route


