import { pool } from "../helpers/db.js";

const removeFangroup = async (id) => {
  const query = 'DELETE FROM Fangroup WHERE Fangroup_id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result; 
};
export { removeFangroup };
