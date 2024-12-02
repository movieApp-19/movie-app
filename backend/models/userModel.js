import { pool } from "../helpers/db.js";

const insertUser = async(username, email, hashedPassword) => {
    return await pool.query('insert into account (username, email, password) values ($1, $2, $3) returning *',
        [username, email, hashedPassword]);
}

const deleteUser = async(email) => {
	return await pool.query(
		"delete from account where email=$1", [email]
	)
}

const selectUserByEmail = async(email) => {
    return await pool.query('select * from account where email=$1', [email]);
}

const selectUserByUsername = async (username) => {
    return await pool.query(
        "select * from account where username=$1",
        [username]);
}

const selectSession = async (token) => {
    return await pool.query(
        "select * from session where token=$1",
        [token]);
}

const insertSession = async (username, token) => {
    return await pool.query(
        `insert into session(account_id, token)
         select account_id, $1 from account where username=$2`,
        [token, username]);
}

const deleteSession = async (token) => {
    return await pool.query(
        "delete from session where token=$1",
        [token]);
}

export {
    insertUser,
    selectUserByEmail,
    selectUserByUsername,
    deleteUser,
    selectSession,
    insertSession,
    deleteSession,
};
