//requred node modules
const route = require('express').Router();

//import user handelers
const { userCreate, loginUser } = require('../../controllers')


route.post('/register', userCreate );
route.post('/login', loginUser );


//exports user routes
module.exports = route


