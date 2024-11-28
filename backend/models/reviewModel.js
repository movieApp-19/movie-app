import { pool } from "../helpers/db.js";

const insertReview = async (id, stars, text, user) => {
    return await pool.query(
        "insert into review (movie_id, stars, text, account_id) values ($1, $2, $3, $4) returning *",
        [id, stars, text, user]);
}

export { insertReview }
