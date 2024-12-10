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
  // accountId, fangroupName
  const { id } = req.params
  try {
      //if (!req.params.username || req.params.username === 0)
      //    return next(new Error)
      const result = await listOfNotAcceptedMembers(id)
      return res.status(200).json(result.rows);
  } catch (error) {
      return next(error)
  }
}

const acceptJoin = async(req,res,next) => {
  // accountId, fangroupName
  try {
      //if (!req.params.username || req.params.username === 0)
      //    return next(new Error)
      const result = await acceptJoinRequest(req.body.accountId, req.body.fangroupId)
      return res.status(200).json(result.rows);
  } catch (error) {
      return next(error)
  }
}

const rejectJoin = async(req,res,next) => {
  // accountId, fangroupName
  try {
      //if (!req.params.username || req.params.username === 0)
      //    return next(new Error)
      const result = await rejectJoinRequest(req.body.accountId, req.params.fangroupid)
      if (result.rowCount === 0)
        return next(new Error("nope", 400))
      return res.status(200).json({message: "removed"});
  } catch (error) {
      return next(error)
  }
}

export { deleteFangroup, viewRequestList, acceptJoin, rejectJoin };
