//required node modules
const Qroute = require('express').Router();

//required controllers
const { createQuestion, getQuestion } = require('../../controllers')

//create route
Qroute.post( '/create', createQuestion );
Qroute.get('/questions', getQuestion)

//export question routes
module.exports = Qroute
