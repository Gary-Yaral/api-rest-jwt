const { User } = require("../models/user")
const { verifyParams } = require("../utils/params")

const getUser = async(req, res) => {
    try{
        let result = await User.find({})
        return res.json({
            status: true,
            data: result
        })
    }
    catch(error){ 
        return res.status(400).json(error)
    }
}

const createUser = async(req, res) => {
    try{
        
        let user = req.body
        let result = await User.create(user)
        return res.status(201).json({
            status: true,
            data: result
        })
    }
    catch(error){ 
        return res.status(400).json(error)
    }
}

const updateUser = async(req, res) => {
    try{
        if(!verifyParams(req.params, ["id"])) {
            return res.status(400).json({error: "Bad request"})
        }

       /*  console.log(req.params.id)
        console.log(req.body) */
        let user = await User.updateOne({_id: req.params.id }, { $set: req.body })
        .select("-password")
        return res.status(200).json(user)
    }
    catch(error){ 
        return res.status(400).json(error)
    }
}

module.exports = { 
    getUser, 
    createUser, 
    updateUser
 }