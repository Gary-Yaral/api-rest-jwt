const mongoose  = require("mongoose")
const request = require("supertest")
const { app, server } = require("../../app")
const { User } = require("../models/user")
const { verifyHash, hashPassword } = require("../utils/password")
const { createToken, verifyToken } = require("../utils/token")

describe("User route validations", () => {

    let password = "1234"
    let users = [
        {
            name: "Andrés",
            username: "@andres_2022",
            email: "andres@gmail.com",
            password: hashPassword(password)
        }
    ]

    let insertedUsersTotal = users.length
    let token = createToken(users[0])
    let auth = {"Authorization": `Bearer ${token}`}
    let authNotValid = {"Authorization": `${token}`}

    beforeAll(async() => {
        await User.deleteMany({})
        users.forEach( async (user) => {
            await User.create({...user})
        })
    })

    afterAll(async() => {
        await mongoose.connection.close(true)
        server.close()
    })

    test("Should get all users", async() => {
        let result = await request(app)
        .get("/api/v1.0/users")
        .set(auth)
        .send()
        expect(result.statusCode).toBe(200)
        expect(result.body).toBeInstanceOf(Object)
        expect(result.headers["content-type"]).not.toBeUndefined()
        expect(result.headers["content-type"]).toContain("json")
        expect(result.body.data.length).toBe(insertedUsersTotal)
    })

    test("Should validate that password is correct", async() => {
        let result = await request(app)
        .get("/api/v1.0/users")
        .set(auth)
        .send()

        let user = result.body.data[0]
        if(user) {
            let userPassword = user.password
            expect(verifyHash(password, userPassword)).toBeTruthy()
        }
    })

    test("Should validate when the token is not valid", async() => {
        let result = await request(app)
        .get("/api/v1.0/users")
        .set(authNotValid)
        .send()
        expect(result.status).toBe(403)
    })

    test("Returns an 400 error because there are repeated data", async() => {
        let result = await request(app)
        .post("/api/v1.0/users")
        .set(auth)
        .send(users[0])
        expect(result.statusCode).toBe(400)

    })

    test("should return an error if data is missing properties", async() => {
        let user = {
            name: "Andrés",
            username: "@andres_2022",
            email: "andres@gmail.com"
        }
        
        let result = await request(app)
        .post("/api/v1.0/users")
        .set(auth)
        .send(user)
        
        expect(result.statusCode).toBe(400)
    })
    
    test("Receive all data and unique properties then returns a 201 code", async() => {
        let user = 
            {
            name: "Carlitos",
            username: "@carlitos_2022",
            email: "carlitos@gmail.com",
            password: hashPassword("mypassword")
        }

        let result = await request(app)
        .post("/api/v1.0/users")
        .set(auth)
        .send(user)

        expect(result.statusCode).toBe(201)
        expect(result.body.status).toBeTruthy()
    })

    test("Verifies that not can be modified without an id", async() => {
        let result = await request(app)
        .put(`/api/v1.0/users/`)
        .set(auth)
        .send()

        expect(result.statusCode).toBe(404)
    })

    test("should verify that user password is being updated", async() => {
        let usersFind = await User.find({})
        let user = {...users[0]}
        id = usersFind[0]._id.toString()
        user.password = hashPassword("holamundo")
        let result = await request(app)
        .put(`/api/v1.0/users/${id}`)
        .set(auth)
        .send(user)
        expect(result.statusCode).toBe(200)
    })

})