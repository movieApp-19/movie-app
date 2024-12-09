import request from "supertest";
import app from "../index.js";
import { pool } from "../helpers/db.js";

let server;
let token;

describe("Review Browsing API tests", () => {

    beforeAll(async () => {
        server = app.listen(5000, () => {
            console.log('Test server is running on http://localhost:5000');
        });

    // Creating unique user in order to create a review

    const email = `testuser${Date.now()}@mail.com`;

         const registerResponse =  await request(server)
        .post('/user/register')
        .send({ username: "testuser", email, password: "Password123"});

        await request(server)
        .post('/review/create')
        .send({ id: "1", stars: 4 , text: "test4", user: "1", token: "aåpoisjgnmaäkolsfgm"});
    })

    it ("should browse reviews of a specific movie", async() => {
        const response = await request(server).get("/review/browse?id=1");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("reviews");
    })
/*
    it("should return an empty list when there are no reviews", async () => {
        const response = await request(server).get("/review/browse?id=2");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("reviews");
        expect(response.body.reviews).toHaveLength(0);
    });

    */
    

    it ("should handle missing id", async() => {
        const response = await request(server).get("/review/browse");
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Invalid parameter(s).");
    })

    it("should handle invalid id format", async () => {
        const response = await request(server).get("/review/browse?id=invalid");
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("invalid input syntax for type integer: \"invalid\"");
    });
    

    it ("should handle missing review", async() => {
        const response = await request(server).get("/review/browse?id=2");
      //  expect(response.body).toHaveProperty("error");
        expect(response.statusCode).toBe(404);
       // expect(response.body.reviews).toHaveLength(0);
    })

    afterAll(async () => {
        await pool.end();
        server.close();
    })
});