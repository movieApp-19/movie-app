import { pool } from "../helpers/db.js"; 

const selectAllFangroups = async () => {
  return await pool.query('SELECT * FROM Fangroup');
};

const insertFangroup = async (fangroupName) => {
  const query = 'INSERT INTO Fangroup (FangroupName) VALUES ($1) RETURNING *';
  const result = await pool.query(query, [fangroupName]);
  return result; 
};

const selectFangroupbyIDBackend = async (id) => {
  return await pool.query(
    `
    SELECT * FROM Fangroup WHERE fangroup_id = $1;
    `, [id]
)
};

export { selectAllFangroups, insertFangroup, selectFangroupbyIDBackend };
