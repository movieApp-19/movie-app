import { pool } from "../helpers/db";

const removeUserFromGroup = async(accountId) => {
    return await pool.query("delete from fangroupmember where account_id = $1", [accountId]);

}

export  {removeUserFromGroup };

