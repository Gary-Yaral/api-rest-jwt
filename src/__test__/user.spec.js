const mongoose  = require("mongoose")
const request = require("supertest")
const { app, server } = require("../../app")
const { User } = require("../models/user")

describe("First test", () => {
    let result;
    let users = [
            {
            name: "Andrés",
            username: "@andres_2022",
            email: "andres@gmail.com",
            password: "1234"
        }
    ]

    let insertedUsersTotal = users.length

    beforeAll(async() => {
        await User.deleteMany({})
        users.forEach(async (user) => {
            await User.create({...user})
        })
    })

    afterAll(async() => {
        await mongoose.connection.close(true)
        server.close()
    })

    test("Should get all users", async() => {
        let result = await request(app).get("/api/v1.0/users").send()
        expect(result.statusCode).toBe(200)
        expect(result.body).toBeInstanceOf(Object)
        expect(result.headers["content-type"]).not.toBeUndefined()
        expect(result.headers["content-type"]).toContain("json")
        expect(result.body.data.length).toBe(insertedUsersTotal)
    })

    test("Returns an 400 error because there are repeated data", async() => {
        let user = {
            name: "Andrés",
            username: "@andres_2022",
            email: "andres@gmail.com",
            password: "mypassword"
        }

        let result = await request(app).post("/api/v1.0/users").send(user)
        expect(result.statusCode).toBe(400)

    })

    test("should return an error if data is missing properties", async() => {
        let user = {
            name: "Andrés",
            username: "@andres_2022",
            email: "andres@gmail.com"
        }
        
        let result = await request(app).post("/api/v1.0/users").send(user)
        
        expect(result.statusCode).toBe(400)
    })
    
    test("Receive all data and unique properties then returns a 201 code", async() => {
        let user = 
            {
            name: "Carlitos",
            username: "@carlitos_2022",
            email: "carlitos@gmail.com",
            password: "mypassword"
        }

        let result = await request(app).post("/api/v1.0/users").send(user)

        expect(result.statusCode).toBe(201)
        expect(result.body.status).toBeTruthy()
    })
})