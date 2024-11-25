import request from "supertest"
import app from "../index.js"
import { pool }  from "../helpers/db.js"

describe('Auth API', () => {
  let server;
  let token;

  beforeAll(async () => {
    server = app.listen(4000, () => {
        console.log('Test server is running on http://localhost:4000');
    });

    // Siivoa tietokanta ennen testejä
    await pool.query('DELETE FROM account WHERE email LIKE $1', ['testuser%']);

    // Rekisteröi käyttäjä kirjautumistestiä varten
    await request(server)
        .post('/user/register')
        .send({ username: "testuser", email: 'testuser4@example.com', password: 'Password123' });
  });

  // Sulje palvelin ja tietokantayhteys testien jälkeen
  afterAll(async () => {
      await pool.query('DELETE FROM account WHERE email LIKE $1', ['testuser%']);
      await pool.end();
      server.close();
  });

  describe('POST /user/login', () => {
    it('should return success message and token on valid credentials', async () => {
        const response = await request(server)
            .post('/user/login')
            .send({ username: 'testuser', password: 'Password123' });

        expect(response.statusCode).toBe(200);
        //user.account_id, user.username, user.email, token
        expect(response.body.username).toBe('testuser');
        expect(response.body.token).toBeDefined(); // Tallenna token suojattuja reittejä varten
        token = response.body.token;
    });
  })
  /*
  describe('POST /user/register', () => {
    it('should register the user and store it in the database', async () => {
      // Send the registration request
      const response = await request(app)
        .post('/user/register')
        .send({ username: 'p', email: 'p@mail', password: 'Password123' });
  
      // Assert the response status and body
      expect(response.statusCode).toBe(201);
      expect(response.body.username).toBe('p');
      expect(response.body.email).toBe('p@mail');
  
      // Query the database to check if the user was created
      const result = await selectUserByEmail('p@mail');
      expect(result.rowCount).toBeGreaterThan(0); // Ensure user exists in DB
      expect(result.rows[0].email).toBe('p@mail'); // Verify email matches
    });
  });
  
  describe('POST /user/login', () => {
    it('should return success message and token on valid credentials', async () => {
      const response = await request(server)
      .post('/user/login')
      .send({ username: "p", password: "Password123" });
      
      console.log(response.body)
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Login successful!');
      expect(response.body.token).toBeDefined(); // Tallenna token suojattuja reittejä varten
      token = response.body.token;
      }) 
      });
      
      /*
      describe("DELETE /user/delete-account", ()=>{
    it("TESTI", async()=>{
      const response = await request(app)
        .delete("/user/delete-account")
        .send({email: 'p@mail'})
        console.log(response.data)
        expect(response.statusCode).toBe(201)
    })
  })
  */
})