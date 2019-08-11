const bcrypt = require('bcrypt')


function generatePass(pass){

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pass, salt)

    return hash
}

function checkPassword(pass,hash){

    return bcrypt.compareSync(pass, hash)

}

module.exports = {generatePass, checkPassword}