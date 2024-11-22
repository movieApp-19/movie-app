import pkg from 'pg';
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV;

dotenv.config();

const { Pool } = pkg;

const openDb= () => {
    const pool = new Pool ({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    })
    return pool;
}

/*app.get("/", (req, res) => {

	pool.query('select * from account', (error, result) => {
		if (error) {
			return res.status(500).json({error: error.message});
		}
		res.status(200).json(result.rows);
})
})
*/

const pool = openDb();


pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connection succeed:', res.rows);
    }
});

export { pool };