import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = (() => {
    const e = process.env;

    return new Pool({
        host: e.DB_HOST,
        port: e.DB_PORT,
        database:
            process.env.NODE_ENV === "development"
            ? process.env.DB_NAME
            : process.env.TEST_DB_NAME,
        user: e.DB_USER,
        password: e.DB_PASSWORD
    });
})();

export { pool };
