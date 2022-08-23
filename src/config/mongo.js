const mongoose = require("mongoose")
const URI_PROD = process.env.DB_URI
const URI_TEST = process.env.DB_URI_TEST
const URI_TEST_DEV = process.env.DB_URI_DEV
const NODE_ENV = process.env.NODE_ENV.replace(" ","")

const URI = {
    production: URI_PROD,
    development: URI_TEST_DEV,
    test: URI_TEST
}

const mongoConnect = () => {
    mongoose.connect(URI[NODE_ENV], () => {
        console.log("__CONNECTED__")
    })
}

module.exports = { mongoConnect }