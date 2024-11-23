import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = (() => {
    const e = process.env;

    return new Pool({
        host: e.DB_HOST,
        port: e.DB_PORT,
        database: e.DB_NAME,
        user: e.DB_USER,
        password: e.DB_PASSWORD
    });
})();

pool.query("select now()", (err, res) => {
    if (err)
        console.error("Database connection failed:", err);
    else
        console.log("Database connection succeeded:", res.rows);
});

export { pool };
