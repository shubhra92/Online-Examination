const regex = {
    nameRegex: /^[a-zA-Z]+$/, 
    emailRegex: /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/, 
    phoneRegex: /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/, 
    passRegex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/, 
    pinRegex: /^\d{6}$/,
    numberRegex: /^\d+$/
}

function isValid (value) {
    if( value === undefined || value === null ) return false;
    if( typeof value === 'string' && !value.trim() ) return false;
    return true;
}

module.exports = {
    isValid,
    ...regex
}
