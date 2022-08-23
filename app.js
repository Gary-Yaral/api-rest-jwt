require("dotenv").config()
const express = require("express")
const app = express()
const { mongoConnect } = require("./src/config/mongo")
const { router } = require("./src/routes")

app.use(express.json())
app.use("/api/v1.0", router)

mongoConnect()

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})

module.exports = { app, server}


