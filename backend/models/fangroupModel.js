import { pool } from "../helpers/db.js";

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

const askToJoin = async(accountId, fangroupName) => {
  const fangroupId = await pool.query(
  `
  select Fangroup_id from Fangroup where FangroupName = $1
  `, [fangroupName]
  )

  const trimmedFangroupId = fangroupId.rows[0].fangroup_id;

  return await pool.query(
    `
    insert into FangroupMember (Approved, IsOwner, Account_id, Fangroup_id) 
    select $1, $2, $3, $4
    where not exists
      (
        select Account_id, Fangroup_id from FangroupMember where Account_id=$3 and Fangroup_id=$4
      )
    `, [false, false, accountId, trimmedFangroupId]
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

/*
const addFangroupMember = async(approved, isOwner, accountId, fangroupId) => {
  
  Approved boolean default false,
  IsOwner boolean default false,
  Account_id INT not null,
  Fangroup_id int not null,
  
  return await pool.query(
    `
    insert into FangroupMember (Approved, IsOwner, Account_id, Fangroup_id) 
    values ($1, $2, $3, $4)
    `, [approved, isOwner, accountId, fangroupId]
  )
}
*/

export { listOfNotAcceptedMembers, askToJoin, acceptJoinRequest, rejectJoinRequest }