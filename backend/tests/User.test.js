import fs from "fs";
import path from "path";
import request from "supertest"
import app from "../index.js"
import { pool }  from "../helpers/db.js"

// We run the db.sql file everytime we use test. This resets the test database.
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

    // Siivoa tietokanta ennen testejä
    await pool.query('DELETE FROM account WHERE email LIKE $1', ['testuser%']);

    // Rekisteröi käyttäjä kirjautumistestiä varten
    await request(server)
        .post('/user/register')
        .send({ username: "testuser", email: 'testuser@mail.com', password: 'Password123' });
  });

  // Sulje palvelin ja tietokantayhteys testien jälkeen
  afterAll(async () => {
      await pool.query('DELETE FROM account WHERE email LIKE $1', ['testuser%']);
      await pool.end();
      server.close();
  });

  describe("POST /user/login", () => {
    it("Should be succesful. Returns token", async () => {
        const response = await request(server)
            .post("/user/login")
            .send({ username: "testuser", password: "Password123" });

        expect(response.statusCode).toBe(200);
        //user.account_id, user.username, user.email, token
        expect(response.body.id).toBe(1);
        expect(response.body.username).toBe("testuser");
        expect(response.body.email).toBe("testuser@mail.com");
        expect(response.body.token).toBeDefined(); // Tallenna token suojattuja reittejä varten
        token = response.body.token;
    });

    it("Should be fail. Error should be INVALID_CREDENTIALS", async () => {
        const response = await request(server)
            .post("/user/login")
            .send({ username: "testuser", password: "WRONGPASSWORD!" });

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Invalid credentials");

    });
  })
})