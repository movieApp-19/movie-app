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

const checkIfOwner = async(accId, fangrId) => {
  return await pool.query(
  `
  select FangroupMember.isowner
  from FangroupMember
  where fangroupmember.account_id = $1 and fangroupmember.fangroup_id = $2;
  `, [accId, fangrId]
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

export { removeFangroup, leaveFangroup, listOfNotAcceptedMembers, acceptJoinRequest, rejectJoinRequest, checkIfOwner };
