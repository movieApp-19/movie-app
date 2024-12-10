import { selectAllFangroups, insertFangroup, selectFangroupbyIDBackend, removeFangroup, listOfNotAcceptedMembers, askToJoin, acceptJoinRequest, rejectJoinRequest } from "../models/fanPageModel.js";

const getAllFangroups = async (req, res, next) => {
  try {
    const result = await selectAllFangroups();
    res.status(200).json(result.rows); 
  } catch (error) {
    next(error); 
  }
};

const addFangroup = async (req, res, next) => {
  const { fangroupName } = req.body; 
  if (!fangroupName) {
    return res.status(400).json({ error: "FangroupName is required" });
  }
  try {
    const result = await insertFangroup(fangroupName);
    res.status(201).json(result.rows[0]); 
  } catch (error) {
    next(error); 
  }
};

const selectFangroupbyID = async (req, res, next) => {
  const id = req.params.id; 
  try {
    const result = await selectFangroupbyIDBackend(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Fangroup not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching fangroup by ID:", error);
    next(error);
  }
};
//
const joinGroup = async(req,res,next) => {
  try {
      if (!req.body.accountId || req.body.accountId === 0)
        return next(new APIError("Invalid account id", 400))
      if (!req.body.fangroupId || req.body.fangroupId === 0)
        return next(new APIError("Invalid fangroup id", 400))
      const result = await askToJoin(req.body.accountId, req.body.fangroupId)
      return res.status(200).json(result.rows);
  } catch (error) {
      return next(error)
  }
}

const viewRequestList = async(req,res,next) => {
  // accountId, fangroupName
  try {
      //if (!req.params.username || req.params.username === 0)
      //    return next(new Error)
      const result = await listOfNotAcceptedMembers(req.params.fangroupName)
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

export { getAllFangroups, addFangroup, selectFangroupbyID, deleteFangroup, joinGroup, viewRequestList, acceptJoin, rejectJoin };
