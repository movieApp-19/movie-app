import { pool } from "../helpers/db.js"; 

const selectAllFangroups = async () => {
  return await pool.query('SELECT * FROM Fangroup');
};

const insertFangroup = async (fangroupName) => {
  const query = 'INSERT INTO Fangroup (FangroupName) VALUES ($1) RETURNING *';
  const result = await pool.query(query, [fangroupName]);
  return result; 
};

const removeFromGroup = async (id) => {
  const query = 'DELETE FROM Fangroup WHERE Fangroup_id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result; 
};

export { selectAllFangroups, insertFangroup, removeFromGroup };
