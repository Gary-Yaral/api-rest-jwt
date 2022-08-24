const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const NODE_ENV = process.env.NODE_ENV.replace(" ","")
const SECRET_TEST = process.env.SECRET_TEST

const SECRET_TOKEN = {
    production: SECRET,
    development: SECRET_TEST,
    test: SECRET_TEST
}

const createToken = (data) => {
    return jwt.sign(data, SECRET_TOKEN[NODE_ENV])
}

const verifyToken = (token) => {
    return jwt.verify(token, SECRET_TOKEN[NODE_ENV])
}

module.exports = {
    verifyToken,
    createToken
}