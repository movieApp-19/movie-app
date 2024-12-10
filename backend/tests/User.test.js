import fs from "fs";
import path from "path";
import request from "supertest"
import jwt from "jsonwebtoken";
import app from "../index.js"
import { pool } from "../helpers/db.js"

//user1
const USERNAME = "testuser";
const EMAIL    = "testuser@mail.com";
const PASSWORD = "Password123";

// We run the db.sql file everytime we use test. This clears the test database.
const initializeTestDb = () => {
	const sql = fs.readFileSync(path.resolve(__dirname, "../db.sql"), "utf8");
	pool.query(sql);
};

describe('Auth API', () => {
    let server, token;

    beforeAll(async () => {
        server = app.listen(4000, () => {
            // console.log('Test server is running on http://localhost:4000');
            initializeTestDb()
        });

        // Rekisteröi käyttäjä kirjautumistestiä varten
        await request(server)
            .post('/user/register')
            .send({ username: USERNAME, email: EMAIL, password: PASSWORD });
    });

    // Sulje palvelin ja tietokantayhteys testien jälkeen
    afterAll(async () => {
          await pool.end();
          server.close();
    });

    describe("POST /user/login", () => {
        it("Should be succesful. Returns token", async () => {
            const response = await request(server)
                .post("/user/login")
                .send({ username: USERNAME, password: PASSWORD });

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.username).toBe(USERNAME);
            expect(response.body.email).toBe(EMAIL);
            expect(response.body.token).toBeDefined(); // Tallenna token suojattuja reittejä varten
        });

        it("Should fail. Error should be INVALID_CREDENTIALS", async () => {
            const response = await request(server)
                .post("/user/login")
                .send({ username: USERNAME, password: "WRONGPASSWORD!" });

            expect(response.statusCode).toBe(401);
            expect(response.body.error).toBe("Invalid credentials");
        });

        it("Should fail. Missing username", async () => {
            const response = await request(server)
                .post("/user/login")
                .send({ username: null, password: PASSWORD });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe("Invalid username");
        });

        it("Should fail. Missing password", async () => {
            const response = await request(server)
                .post("/user/login")
                .send({ username: USERNAME, password: null });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe("Invalid password");
        });
    });

    describe("POST /user/register", () => {
        const TMP_USERNAME = "tmp";
        const TMP_EMAIL = "tmp@example.com";
        const TMP_PASSWORD = "tmpTMP123";

        it("Should successfully post registration", async () => {
            const res = await request(server)
                .post("/user/register")
                .send({ username: TMP_USERNAME, email: TMP_EMAIL, password: TMP_PASSWORD });
            
            expect(res.statusCode).toBe(201);
            expect(res.body.username).toBe(TMP_USERNAME);
            expect(res.body.email).toBe(TMP_EMAIL);
        });

        it("Should fail without username", async () => {
            const res = await request(server)
                .post("/user/register")
                .send({ email: TMP_EMAIL, password: TMP_PASSWORD });

            expect(res.statusCode).toBe(400);
        });

        it("Should fail without email", async () => {
            const res = await request(server)
                .post("/user/register")
                .send({ username: TMP_USERNAME, password: TMP_PASSWORD });

            expect(res.statusCode).toBe(400);
        });

        it("Should fail without password", async () => {
            const res = await request(server)
                .post("/user/register")
                .send({ username: TMP_USERNAME, email: TMP_EMAIL });

            expect(res.statusCode).toBe(400);
        });
    });

    describe("POST /user/logout", () => {
        it("Should successfully post logout", async () => {
            const preRes = await request(server)
                .post("/user/login")
                .send({ username: USERNAME, password: PASSWORD });

            expect(preRes.statusCode).toBe(200);

            const res = await request(server)
                .post("/user/logout")
                .set({ authorization: preRes.body.token });

                expect(res.statusCode).toBe(200);
        });

        it("Should fail without token in header", async () => {
            const res = await request(server)
            .post("/user/logout");

            expect(res.statusCode).toBe(401);
        });

        it("Should fail with expired token", async () => {
            const token = jwt.sign({ username: USERNAME, iat: 1 }, process.env.JWT_SECRET_KEY, { expiresIn: 900 });
            const res = await request(server)
                .post("/user/logout")
                .set({ authorization: token });

            expect(res.statusCode).toBe(403);
        });
    });

    describe("Review tests", () => {

        it ("Should create a review", async () => {
            const preRes = await request(server)
                .post("/user/login")
                .send({ username: USERNAME, password: PASSWORD });

            expect(preRes.statusCode).toBe(200);
            token = preRes.body.token;

            const response = await request(server)
                .post("/review/create")
                .send({ id: "1", stars: 4, text: "test4", user: "1", token: token });

            expect(response.statusCode).toBe(200);
        })

        it ("should browse reviews of a specific movie", async() => {
            const response = await request(server).get("/review/browse?id=1");
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("reviews");
        })
      
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
            expect(response.body.error).toBe('invalid input syntax for type integer: "invalid"');
        });
      
        it ("should handle missing review", async() => {
            const response = await request(server).get("/review/browse?id=2");
          //  expect(response.body).toHaveProperty("error");
            expect(response.statusCode).toBe(404);
           // expect(response.body.reviews).toHaveLength(0);
        })
    })

    describe("DELETE /user/delete-account", () => {
        it("Should not delete account. Empty email", async () => {
            const preRes = await request(server)
                .post("/user/login")
                .send({ username: USERNAME, password: PASSWORD });

            expect(preRes.statusCode).toBe(200);
            token = preRes.body.token;

            const response = await request(server)
                .delete("/user/delete-account")
                .set({ authorization: token })
                .send({ email: null })

            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe("Invalid email")
        });

        it ("Should fail without token", async () => {
            const response = await request(server)
                .delete("/user/delete-account")
                .send({ email: EMAIL })

            expect(response.statusCode).toBe(401)
        });

        it("Should delete the account", async () => {
            const response = await request(server)
                .delete("/user/delete-account")
                .set({ authorization: token })
                .send({ email: EMAIL })

            expect(response.statusCode).toBe(201)
            expect(response.body.message).toBe("User successfully deleted")
        });

        it("Should fail. Email not in database", async() => {
            const response = await request(server)
                .delete("/user/delete-account")
                .set({ authorization: token })
                .send({ email: EMAIL })

            expect(response.statusCode).toBe(404)
            expect(response.body.error).toBe("Invalid Email. Email not in database")
        });
    });
});