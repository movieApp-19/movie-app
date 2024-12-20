import { pool } from "../helpers/db.js";

const insertReview = async (id, stars, text, user) => {
    return await pool.query(
        "insert into review (movie_id, stars, text, account_id) values ($1, $2, $3, $4) returning *",
        [id, stars, text, user]);
}

const browseReview = async (id) => {
    return await pool.query(
        `select review.stars, review.text, review.movie_id, review.date, account.email
         from review join account on review.account_id = account.account_id 
         where movie_id = $1 `,
         [id]
        );
}

export { insertReview, browseReview }
