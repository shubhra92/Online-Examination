//required node module


//required model
const { answerModel } = require('../../models');

//required validation function | regex
const { resMssage, isValid } = require('../../validation');



//=============================Create Answer================================
const createAnswer = async ( req, res ) => {
    const resMsg = resMssage.bind(res)
    try {
        const questionId = req.params.quesId;
        const userId = req.params.userId;
        const data = req.body

        if ( !Array.isArray( data ) ) return resMsg( 400, 'request body must be array of object' );
        if ( !data.length ) return  resMsg( 400, 'over all 4 answer needed, and minimum one answer has to be correct' );
        if ( data.length !== 4 ) return resMsg(400, 'length should be 4')

        const verifiedAns = []

        let bool = 0
        for ( let i in data ){
            //check empty or not
            const requiredField = [ 'answer', 'isCorrect' ].filter(x => !isValid( data[i][x] ) )
            if ( requiredField.length ) return resMsg( 400, `${ requiredField } missing field${ requiredField.length>1?"s":"" } in ${i} index` );
            const { answer, isCorrect } = data[i];
            //check data type
            if ( typeof answer !== 'string' ) return resMsg( 400, `${i} index's answer must be in string` );
            if ( typeof isCorrect !== 'boolean' ) return resMsg( 400, `${i} index's answer must be in boolean` );
            if (isCorrect) bool++
            //verification complete
            verifiedAns.push({ answer, isCorrect, questionId, userId })
        }

        if( bool > 2 ) return resMsg( 400, `correct answer count can not be more then 2` );

        const ans = await answerModel.insertMany( verifiedAns );
        return resMsg( 201, `answer create successful`, { ansData: ans } );

    } catch (error) {
       return  resMsg( 500, error.message );
    }
}



//--------------------------------------------------------------------------------------




//export
module.exports = {
    createAnswer
}