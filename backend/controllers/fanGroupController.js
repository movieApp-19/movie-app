import { removeFangroup, leaveFangroup } from '../models/fanGroupModel.js';

const deleteFangroup = async (req, res, next) => {
  const { id } = req.params; 
  try {
    const result = await removeFangroup(id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Fangroup not found" }); 
    }
    res.status(200).json({ message: "Fangroup deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const leaveFromFangroup = async (req, res, next) => {
  const { id } = req.params;    //fangroup id
  const { account_id } = req.body;
  try{
    const result = await leaveFangroup(account_id, id);
    if (result.rowCount === 0) {
      console.error("ACC: " + account_id);
      return res.status(404).json({ error: "Account not found" });
    }
    return res.status(200).json({ message: "Left fangroup successfully."})
  } catch (error) {
    console.error("Error in leaving group", error)
    next(error);
  }
};

export { deleteFangroup, leaveFromFangroup };
