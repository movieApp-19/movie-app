import fs from "fs";
import path from "path";
import request from "supertest"
import app from "../index.js"
import { pool }  from "../helpers/db.js"

// We run the db.sql file everytime we use test. This clears the test database.
const initializeTestDb = () => {
	const sql = fs.readFileSync(path.resolve(__dirname, "../db.sql"), "utf8");
	pool.query(sql);
};

describe('Auth API', () => {
  let server;
  let token;

  beforeAll(async () => {
    server = app.listen(4000, () => {
        console.log('Test server is running on http://localhost:4000');
        initializeTestDb()
    });

    // Rekisteröi käyttäjä kirjautumistestiä varten
    await request(server)
        .post('/user/register')
        .send({ username: "testuser", email: 'testuser@mail.com', password: 'Password123' });
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
            .send({ username: "testuser", password: "Password123" });

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.username).toBe("testuser");
        expect(response.body.email).toBe("testuser@mail.com");
        expect(response.body.token).toBeDefined(); // Tallenna token suojattuja reittejä varten
        token = response.body.token;
        console.log(token)
    });

    it("Should fail. Error should be INVALID_CREDENTIALS", async () => {
        const response = await request(server)
            .post("/user/login")
            .send({ username: "testuser", password: "WRONGPASSWORD!" });

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Invalid credentials");
    });
  })

  describe("DELETE /user/delete-account", () => {
    it("Should delete the account", async () => {
        const response = await request(server)
            .delete("/user/delete-account")
            .send({ email: "testuser@mail.com"})
        
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe("User successfully deleted")
    })

    it("Should fail. Email not in database", async() =>{
        const response = await request(server)
            .delete("/user/delete-account")
            .send({ email: "testuser@mail.com"})

        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe("Invalid Email. Email not in database")
    })

    it("Should not delete account. Empty email", async () => {
        const response = await request(server)
            .delete("/user/delete-account")
            .send({ email: null})
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe("Invalid email")
    })
  })
})