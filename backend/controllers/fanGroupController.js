import { removeFangroup, listOfNotAcceptedMembers, acceptJoinRequest, rejectJoinRequest } from '../models/fanGroupModel.js';

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

const viewRequestList = async(req,res,next) => {
  const { id } = req.params
  try {
    if (!id)
      return next(new APIError("Invalid group id", 400))
    const result = await listOfNotAcceptedMembers(id)
    return res.status(200).json(result.rows);
  } catch (error) {
      return next(error)
  }
}

const acceptJoin = async(req,res,next) => {
  const { accountId, fangroupId } = req.body
  try {
    if (!accountId)
      return next(new APIError("Invalid account id", 400))
    if (!fangroupId)
      return next(new APIError("Invalid group id", 400))
    const result = await acceptJoinRequest(accountId, fangroupId)
    return res.status(200).json(result.rows);
  } catch (error) {
      return next(error)
  }
}

const rejectJoin = async(req,res,next) => {
  const { accountId } = req.body
  const { id } = req.params
  try {
    if (!accountId)
      return next(new APIError("Invalid account id", 400))
    if (!id)
      return next(new APIError("Invalid group id", 400))
    const result = await rejectJoinRequest(accountId, id)
    if (result.rowCount === 0)
      return next(new Error("nope", 400))
    return res.status(200).json({message: "removed"});
  } catch (error) {
      return next(error)
  }
}

export { deleteFangroup, viewRequestList, acceptJoin, rejectJoin };
