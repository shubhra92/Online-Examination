//require pkgs
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;


//answer schema
const answerSchema = new mongoose.Schema(
    {
        answer: { type: String, requrired: true },
        questionId: { type:ObjectId, requrired: true, ref: 'question' },
        isCorrect: { type:Boolean, requrired: true },
        userId: { type: ObjectId, requrired: true, ref: 'user' },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null }
    },
    { timestamps: true }
);



//export
module.exports = mongoose.model( 'answer', answerSchema );