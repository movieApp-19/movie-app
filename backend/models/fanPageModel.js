import { pool } from "../helpers/db.js"; 

const selectAllFangroups = async () => {
  return await pool.query('SELECT * FROM Fangroup');
};

const selectJoinedFangroups = async (userId) => {
  return await pool.query(
    `
    select fangroup.fangroup_id, fangroup.fangroupname
    from fangroup
    inner join fangroupmember on fangroupmember.fangroup_id = fangroup.fangroup_id
    where fangroupmember.approved = true and fangroupmember.account_id = $1;
    `, [userId]
  )
}

const selectNotJoinedFangroups = async (userId) => {
  return await pool.query(
    `
    select distinct fangroup.fangroup_id, fangroup.fangroupname 
    from fangroup 
    --inner join fangroupmember on fangroupmember.fangroup_id = fangroup.fangroup_id

    except

    select fangroup.fangroup_id, fangroup.fangroupname
    from fangroup
    inner join fangroupmember on fangroupmember.fangroup_id = fangroup.fangroup_id
    where fangroupmember.approved = true and fangroupmember.account_id = $1;
    `, [userId]
  )
}

const selectOwnedGroupds = async (userId) => {
  return await pool.query(
    `
    select fangroup.fangroup_id, fangroup.fangroupname
    from fangroup
    inner join fangroupmember on fangroupmember.fangroup_id = fangroup.fangroup_id
    where fangroupmember.isowner = true and fangroupmember.account_id = $1;
    `, [userId]
  )
}

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


const selectFangroupbyIDBackend = async (id) => {
  return await pool.query(`
    select g.*, m.account_id, a.username
    from fangroup as g
    inner join fangroupmember as m on g.fangroup_id=m.fangroup_id
    inner join account as a on m.account_id=a.account_id
    where g.fangroup_id=$1`,
    [id]);
};

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

const insertOwner = async (accountId, fangroupId) => {
  return await pool.query(
    "insert into fangroupmember (approved, isowner, account_id, fangroup_id) values (true, true, $1, $2) returning *",
    [accountId, fangroupId]);
}

export { selectAllFangroups, insertFangroup, selectFangroupbyIDBackend,
  askToJoin, selectJoinedFangroups, selectNotJoinedFangroups, selectOwnedGroupds, insertOwner };
