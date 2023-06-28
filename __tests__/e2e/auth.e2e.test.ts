// @ts-ignore
import request from 'supertest'
import app from "../../src/app";


const auth = 'Authorization'
const basic = 'Basic YWRtaW46cXdlcnR5'

describe('post', () => {

    beforeAll(async () => {
        // await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it('should create user and auth', async () => {
        await request(app).delete('/testing/all-data').expect(204)

        const createUser = await request(app)
            .post("/users")
            .set(auth, basic)
            .send({
                login: "login222",
                password: "password222",
                email: "simsbury65@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            "createdAt": expect.any(String),
            "email": "simsbury65@gmail.com",
            "id": expect.any(String),
            "login": "login222"
        })

        const token = await request(app)
            .post("/auth/login")
            .send({
                loginOrEmail: "simsbury65@gmail.com",
                password: "password222"
            })
            .expect(200)

        expect(token.body.accessToken).toEqual(expect.any(String))

    },10000)

})

describe('registration', () => {

    beforeAll(async () => {
        // await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it('should send email and finish registration', async () => {
        await request(app).delete('/testing/all-data').expect(204)

        const createUser = await request(app)
            .post("/auth/registration")
            .send({
                login: "login222",
                password: "password222",
                email: "simsbury65@gmail.com"
            })
            .expect(204)



    },10000)
})





