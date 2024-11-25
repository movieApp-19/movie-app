import { pool } from "../helpers/db.js";

const insertUser = async(username, email, hashedPassword) => {
    return await pool.query('insert into account (username, email, password) values ($1, $2, $3) returning *',
         [username, email, hashedPassword]);
}

const selectUserByEmail = async(email) => {
    return await pool.query('select * from account where email=$1', [email]);
}

const selectUserByUsername = async (username) => {
    return await pool.query(
        "select * from account where username=$1",
        [username]);
}

export { insertUser, selectUserByEmail, selectUserByUsername };
