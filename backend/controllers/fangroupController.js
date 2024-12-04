import { listOfNotAcceptedMembers, askToJoin } from "../models/fangroupModel.js"

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

export { joinGroup }