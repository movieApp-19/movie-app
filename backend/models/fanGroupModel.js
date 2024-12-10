import { pool } from "../helpers/db.js";

const removeFangroup = async (id) => {
  const query = 'DELETE FROM Fangroup WHERE Fangroup_id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result; 
};

const listOfNotAcceptedMembers = async(id) => {
  return await pool.query(
    `
    select FangroupMember.Account_id, Account.Username
    from FangroupMember 
    inner join Account on Account.Account_id=FangroupMember.Account_id
    where Fangroup_id = $1 and Approved = false;
    `, [id]
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

const rejectJoinRequest = async(accountId, id) => {
  return await pool.query(
  `
  delete from FangroupMember
  where Account_id = $1 and Fangroup_id = $2 and Approved = false
  `, [accountId, id]
  )
}

export { removeFangroup, listOfNotAcceptedMembers, acceptJoinRequest, rejectJoinRequest };
