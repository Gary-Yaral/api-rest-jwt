const mongoose  = require("mongoose")
const { server } = require("../../app")
const { verifyParams } = require("../utils/params")

describe("Verify params", () => {
    let validParams = {
        "id": 1234
    }

    let notValidParam = {
        "id": " "
    }

    let notValidParams = {
        "note": 1234,
        "name": "Jean"
    }

    let props = ["id"]

    afterAll(async() => {
        await mongoose.connection.close(true)
        server.close()
    })

    test('Should verify if required params exists ', () => { 
        expect(verifyParams(notValidParams, props)).toBeFalsy()
        expect(verifyParams(notValidParam, props)).toBeFalsy()
        expect(verifyParams(validParams, props)).toBeTruthy()
    })

})