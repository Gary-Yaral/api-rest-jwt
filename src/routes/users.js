const router = require('express').Router()
const { getUser, createUser, updateUser } = require('../controllers/users')
const { validateToken } = require('../middlewares/validateToken')

router.get("/", validateToken, getUser)
router.post("/", validateToken, createUser)
router.put("/:id", validateToken, updateUser)
router.delete("/:id", validateToken, createUser)

module.exports = { router }