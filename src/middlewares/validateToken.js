const { verifyToken } = require("../utils/token")

const validateToken = (req, res, next) => {
    let auth = req.headers["authorization"]
    if (!auth) return res.status(403).json({error: "Not authorization"})
    let bearer = auth.split(" ")
    if(bearer[0].toLowerCase() !== "bearer") {
        return res.status(403).json({
            error: "Bearer not found"
        })
    }

    let token = bearer[1]
    if(token === undefined || token === "") {
        return res.status(403).json({
            error: "Token no was sent"
        }) 
    }

    if(!verifyToken(token)){
        return res.status(403).json({
            error: "Token is not valid"
        }) 
    }

    next()

}

module.exports = { validateToken }