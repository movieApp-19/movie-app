import { listOfNotAcceptedMembers, askToJoin, acceptJoinRequest, rejectJoinRequest } from "../models/fangroupModel.js"

const joinGroup = async(req,res,next) => {
  // accountId, fangroupName
  try {
      //if (!req.params.username || req.params.username === 0)
      //    return next(new Error)
      const result = await askToJoin(req.body.accountId, req.params.fangroupName)
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
      const result = await rejectJoinRequest(req.body.accountId, req.body.fangroupId)
      if (result.rowCount === 0)
        return next(new Error("nope", 400))
      return res.status(200).json({message: "removed"});
  } catch (error) {
      return next(error)
  }
}

export { joinGroup, viewRequestList, acceptJoin, rejectJoin }