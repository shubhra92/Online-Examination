//require node module
const mainRoute = require('express').Router();

//require all routes
const userRoute = require('./allRoutes/user-route');
const questionRoute = require('./allRoutes/question-route');
const answerRoute = require('./allRoutes/answer-route');




mainRoute.use( '/user', userRoute );
mainRoute.use('/question', questionRoute );
mainRoute.use('/answer', answerRoute );



//route exports
module.exports = mainRoute;
