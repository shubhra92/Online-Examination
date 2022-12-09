//import controllers
const { userCreate, loginUser } = require('./allControllers/user-controller');
const { createQuestion, getQuestion } = require('./allControllers/question-controller');
const { createAnswer } = require('./allControllers/answer-controller')

//exports controllers
module.exports = {
    userCreate,
    loginUser,
    createQuestion,
    createAnswer,
    getQuestion
}