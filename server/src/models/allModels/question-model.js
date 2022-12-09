//require pkgs
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;


//question schema
const questionSchema = new mongoose.Schema(
    {
        question: { type: String, required: true },
        videoLink: { type: String },
        imgLink: { type: String },
        tag: [ String ],
        userId: { type: ObjectId, ref: 'user' },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null }
    },
    { timestamps: true }
);



//export
module.exports = mongoose.model( 'question', questionSchema );
