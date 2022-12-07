//required node modules
const mongoose = require('mongoose');

//required models
const { userModel } = require('../models')
const clone = userModel.schema.obj

//required validation function
const { isValid } = require('../validation')



//=========================User Create=========================
const userCreate = async ( req, res ) => {

    try {
        const data = req.body;
        if( !Object.keys( data ).length ) { 
            return res.status(400).send({ status: false, message: 'requrest body is empty, input some value to create user' })
        };

        const verifiedField = {};
        const requiredField = [];

        for ( let i in clone ) {
            //skip field
            if( i === 'isDeleted' || i === 'deletedAt' || i === 'user_type' ) continue;
            //validation fields distracture
            const { type, requrired, unique, match } = clone[ i ];
            //check required field exist or not in the body
            if( requrired && !isValid( data[i] ) ) { 
                requiredField.push(i);
                continue;
            };
            //type check
            if( type && ( typeof type() !== typeof data[i] ) ) {
                return res.status(400).send({ status: false, message: `${ i } is only in type of ${ typeof type() } accepted` })
            };
            //format check
            if( match && !match[0].test( data[i] ) ) {
                return res.status(400).send({ status: false, message: `${ i } is not valid format` })
            }
            //unique check
            if( unique ) {
                const checkU = await userModel.findOne({ [i]: data[i] });
                if ( checkU ) return res.status(400).send({ status: false, message: `${ data[i] } ${ i } is already exist in database` })
            }
            //verification complete
            verifiedField[ i ] = data[i];
        }

        if( requiredField.length ) {
            let len = requiredField.length
            return res.status(400)
            .send({ status: false, message: `[${requiredField}] this ${ len === 1 ? "is field" : "are fields" } required to create user` });
        }

        const createUserDoc = await userModel.create( verifiedField );
        return res.status(201).send({ status: true, message: "user creation successful!", Data: createUserDoc });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}



//----------------------------------------------------------------------



//=========================User Login=========================



//----------------------------------------------------------------------



//=========================User Update=========================



//----------------------------------------------------------------------



//=========================User Get=========================




//----------------------------------------------------------------------


//exports controllers
module.exports = {
    userCreate
}


