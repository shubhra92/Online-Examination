//required node module
const route = require('express').Router();

//required answer controller
const { createAnswer } = require('../../controllers')


//create route
route.post('/create/:quesId/:userId', createAnswer );

//exports
module.exports = route;