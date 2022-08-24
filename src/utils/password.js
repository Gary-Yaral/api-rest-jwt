const bcrypt = require("bcrypt")

const hashPassword = (password) =>{
    let rounds = 10
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(rounds))
    return hash
}

const verifyHash = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = { hashPassword, verifyHash }