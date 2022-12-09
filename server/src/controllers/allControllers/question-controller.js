//required node module

//required models
const { questionModel, answerModel } = require('../../models');

//required validation fucntion|regex
const { resMssage, isValid, isType } = require('../../validation')

//clone question schema
const clone = questionModel.schema.paths



//==================================Create Question=============================

const createQuestion = async ( req, res ) => {
    const resMsg = resMssage.bind(res);
    try {
        const userId = req.userId
        const data = req.body;
        if ( !Object.keys( data ).length ) { 
            return resMsg( 400, 'requrest body is empty, enter question')
        };

        const requiredField = [];
        const verifiedField = { userId }

        for ( let i in clone ){
            //ignore field
            if ( [ 'isDeleted', 'deletedAt', '_id', 'createdAt', "__v", "updatedAt", 'userId' ].includes(i) ) continue;
            //distracture validation part
            const { options: { required, match }, instance } = clone[ i ];
            
            //required check
            if ( required && !isValid( data[i] ) ) {
                requiredField.push(i);
                continue;
            }
            //check key exist in th body
            const isKeyExist = data.hasOwnProperty(i)
            if( isKeyExist ) {

            //type check
            if ( instance && !isType ( data[i], instance ) ) {
                return resMsg( 400, `${i} not in valid formate`);
            }
            //regex check
            if ( match && !match[0].test( data[i] ) ) {
                return resMsg( 400, `${i} not in valid formate`);
            }
            //verification complete
            verifiedField[i] = data[i]

            }
        }

        if( requiredField.length ) {
            let len = requiredField.length
            return resMsg( 400, `${requiredField} this ${ len === 1 ? "is field" : "are fields" } required to create question` );
        }

        const questionData = await questionModel.create(verifiedField);

        return resMsg(201, "question creation successful!", { Question: questionData } )



    } catch (error) {
        return resMsg( 500, error.message )
    }
}



//-------------------------------------------------------------------------------------------



//================================Get Question===================================

const getQuestion = async ( req, res ) => {
    const resMsg = resMssage.bind(res);
    try {
        let _10Questions = await questionModel.find({isDeleted:false}).limit(10).lean()
        if ( !_10Questions.length ) return resMsg( 400, 'there are no question found!');

        const allQuesId = []
        _10Questions.forEach( x => allQuesId.push( x._id.toString() ) )


        const allAns = await answerModel.find({ questionId: { $in: allQuesId}})

        _10Questions = _10Questions.map( x => {
            x.options = allAns.filter( y => x._id.toString() == y.questionId.toString() )
            return x
        })

        return resMsg( 200, 'answer all question', { Questions: _10Questions } )
        
    } catch (error) {
        return resMsg( 500, error.message );
    }
}
//export
module.exports = {
    createQuestion,
    getQuestion
}