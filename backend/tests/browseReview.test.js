import fs from "fs";
import path from "path";
import request from "supertest";
import app from "../index.js";
import { pool } from "../helpers/db.js";

let server;
let token;

beforeAll(async () => {
    server = app.listen(5000, () => {
        console.log('Test server is running on http://localhost:5000');
    });

    await request(server)
    .post('/user/register')
    .send({ username: "testuser782", email: 'testuser728@mail.com', password: 'Password12348' });

    
    
    await request(server)
    .post('/review/create')
    .send({ id: "1", stars: 2 , text: "test", user: "2", token: "aåpoisjgnmaäkolsfgm"

     });
});


describe("BROWSE REVIEWS", () => {
    it("should be able to browse reviews", async () => {
        const response = await request(server).get("/review/browse?id=1");

        expect(response.statusCode).toBe(200);
       // expect(response.body.message).toBe("[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]");
    });
});

