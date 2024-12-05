import { pool } from "../helpers/db.js"; 

const selectAllFangroups = async () => {
  return await pool.query('SELECT * FROM Fangroup');
};

const insertFangroup = async (fangroupName) => {
  const query = 'INSERT INTO Fangroup (FangroupName) VALUES ($1) RETURNING *';
  const result = await pool.query(query, [fangroupName]);
  return result; 
};

const removeFangroup = async (id) => {
  const query = 'DELETE FROM Fangroup WHERE Fangroup_id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result; 
};

const listOfNotAcceptedMembers = async(fangroupName) => {
  const fangroupId = await pool.query(
  `
  select Fangroup_id from Fangroup where FangroupName = $1
  `, [fangroupName]
  )

  const trimmedFangroupId = fangroupId.rows[0].fangroup_id;

  return await pool.query(
    `
    select * from FangroupMember where Fangroup_id = $1 and Approved = false
    `, [trimmedFangroupId]
  )
}

const askToJoin = async(accountId, fangroupId) => {
  return await pool.query(
    `
    insert into FangroupMember (Approved, IsOwner, Account_id, Fangroup_id) 
    select $1, $2, $3, $4
    where not exists
      (
        select Account_id, Fangroup_id from FangroupMember where Account_id=$3 and Fangroup_id=$4
      )
    `, [false, false, accountId, fangroupId]
  )
}

const acceptJoinRequest = async(accountId, fangroupId) => {
  return await pool.query(
  `
  update FangroupMember
  set Approved = true
  where Account_id = $1 and Fangroup_id = $2
  `, [accountId, fangroupId]
  )
}

const rejectJoinRequest = async(accountId, fangroupId) => {
  return await pool.query(
  `
  delete from FangroupMember
  where Account_id = $1 and Fangroup_id = $2 and Approved = false
  `, [accountId, fangroupId]
  )
}

export { selectAllFangroups, insertFangroup, removeFangroup, listOfNotAcceptedMembers, askToJoin, acceptJoinRequest, rejectJoinRequest };
