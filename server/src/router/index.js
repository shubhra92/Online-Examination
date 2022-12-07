//require node module
const mainRoute = require('express').Router();

//require all routes
const userRoute = require('./user-route');




mainRoute.use( '/user', userRoute )




//route exports
module.exports = mainRoute;
