 import { pool } from "../helpers/db.js";

const removeFangroup = async (id) => {
  const query = 'DELETE FROM Fangroup WHERE Fangroup_id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result; 
};

const leaveFangroup = async (account_id, fangroup_id) => {
  const query = 'DELETE FROM fangroupmember WHERE account_id = $1 AND fangroup_id = $2 RETURNING *';
  const result = await pool.query(query, [account_id, fangroup_id]);
  return result;
}
export { removeFangroup, leaveFangroup };
