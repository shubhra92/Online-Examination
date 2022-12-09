//required node modules
const jwt = require('jsonwebtoken');
const { genSalt, hash, compare } = require('bcrypt');
require('dotenv').config();

//required models
const { userModel } = require('../../models')
const clone = userModel.schema.obj

//required validation function|regex
const { isValid, resMssage, passRegex } = require('../../validation');
const regex = { password: passRegex }

//secrect key for jwt token
const secrectKey = process.env.JWT_SECRECT_KEY;




//=========================User Create=========================

const userCreate = async ( req, res ) => {
    const resMsg = resMssage.bind(res);

    try {
        const data = req.body;
        if( !Object.keys( data ).length ) { 
            return resMsg( 400, 'requrest body is empty, input some value to create user')
        };

        const verifiedField = {};
        const requiredField = [];
        const ignoreFields = [ 'isDeleted', 'deletedAt', 'user_type' ]

        for ( let i in clone ) {
            //skip ignore fields
            if( ignoreFields.includes( i ) ) continue;
            //validation fields distracture
            const { type, requrired, unique, match } = clone[ i ];
            //check required field exist or not in the body
            if( requrired && !isValid( data[i] ) ) { 
                requiredField.push(i);
                continue;
            };
            //type check
            if( type && ( typeof type() !== typeof data[i] ) ) {
                return resMsg( 400, `${ i } is only in type of ${ typeof type() } accepted` );
            };
            //format check
            if( ( match || regex[i] ) && !( regex[i] || match[0] ).test( data[i] ) ) {
                return resMsg( 400, `${ i } is not valid format` )
            }
            //unique check
            if( unique ) {
                const checkU = await userModel.findOne({ [i]: data[i] });
                if ( checkU ) return resMsg(400, `${ data[i] } ${ i } is already exist in database` );
            }
            //verification complete
            verifiedField[ i ] = data[i];
        }

        if( requiredField.length ) {
            let len = requiredField.length
            return resMsg( 400, `${requiredField} this ${ len === 1 ? "is field" : "are fields" } required to create user` );
        }

        //create salt
        const saltRound = 10;
        const salt = await genSalt( saltRound );
        //hashing the password
        verifiedField.password = await hash( verifiedField.password, salt );

        //crete the docement in database
        const createUserDoc = await userModel.create( verifiedField );

        return resMsg(201,  "user creation successful!", { Data:createUserDoc } )

    } catch (error) {
        return resMsg(500, error.message )
    }
}



//-------------------------------------------------------------------------------------------------------



//=========================User Login=========================

const loginUser = async ( req, res ) => {
    const resMsg = resMssage.bind(res);
    try {
        const data = req.body
        if( !Object.keys( data ).length ) { 
            return resMsg( 400, 'requrest body is empty, enter email and password for login')
        };

        const requiredField = [];

        for ( let i of  ["email", "password"]) {

            const { type, requrired, match } = clone[ i ];
            //check required field exist or not in the body
            if( requrired && !isValid( data[i] ) ) { 
                requiredField.push(i);
                continue;
            };
            //type check
            if( type && ( typeof type() !== typeof data[i] ) ) {
                return resMsg( 400, `${ i } is only in type of ${ typeof type() } accepted` );
            };
            //format check
            if( ( match || regex[i] ) && !( regex[i] || match[0] ).test( data[i] ) ) {
                return resMsg( 400, `${ i } is not valid format` )
            }
        }

        if( requiredField.length ) {
            let len = requiredField.length
            return resMsg( 400, `${requiredField} this ${ len === 1 ? "is field" : "are fields" } required to login user` );
        }

        const { email, password } = data;

        //search for user with email
        const userDoc = await userModel.findOne({ email, isDeleted: false });
        if( !userDoc ) return resMsg(400, "email or password is not correct ");

        //password check
        const bool = await compare( password, userDoc.password );
        if( !bool ) return resMsg(400, "email or password is not correct ");

        //create token
        const TOKEN = jwt.sign(
            //payload
            { 
                userId: userDoc._id,
                user_type: userDoc.user_type
            },
            //secrect key
            secrectKey,
            //expire time
            { expiresIn: '1h' } );



        return resMsg(200, "user login successful!", { TOKEN } );

        
    } catch (error) {
        return resMsg(500, error.message )
    }
}


//----------------------------------------------------------------------



//=========================User Update=========================



//----------------------------------------------------------------------



//=========================User Get=========================




//----------------------------------------------------------------------


//exports controllers
module.exports = {
    userCreate,
    loginUser
}


