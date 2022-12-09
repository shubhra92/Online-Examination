//require pkgs
const mongoose = require('mongoose');

//require regexs
const { nameRegex, emailRegex, passRegex } = require('../../validation')

//user schema
const userSchema = new mongoose.Schema(
    {
        fname: { type: String, requrired: true, match: [ nameRegex, 'fname is not valid' ] },
        lname: { type: String, requrired: true, match: [ nameRegex, 'lname is not valid' ] },
        email: { type: String, requrired: true, unique: true, match: [ emailRegex, 'email is not valid' ] },
        password: { type: String, requrired: true },
        user_type: { type: String, requrired: true, enum: [ 'user', 'admin' ], default: 'user' },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null }
    },
    { timestamps: true }
);



//export
module.exports = mongoose.model( 'user', userSchema );
