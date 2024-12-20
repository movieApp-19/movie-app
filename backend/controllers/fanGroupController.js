import { removeFangroup,leaveFangroup, listOfNotAcceptedMembers, acceptJoinRequest, rejectJoinRequest, checkIfOwner } from '../models/fanGroupModel.js';

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

const viewRequestList = async(req,res,next) => {
  const { id } = req.params
  try {
    if (!id || id.length === 0)
      return next(new APIError(errors.INVALID_PARAMETERS, 400))
    const result = await listOfNotAcceptedMembers(id)
    return res.status(200).json(result.rows);
  } catch (error) {
      return next(error)
  }
}

const acceptJoin = async(req,res,next) => {
  const { accountId, fangroupId } = req.body
  try {
    if (!accountId || accountId.length === 0)
      return next(new APIError(errors.INVALID_PARAMETERS, 400))
    if (!fangroupId || fangroupId.length === 0)
      return next(new APIError(errors.INVALID_PARAMETERS, 400))
    const result = await acceptJoinRequest(accountId, fangroupId)
    return res.status(200).json(result.rows);
  } catch (error) {
      return next(error)
  }
}

const checkIfUserIsOwner = async (req, res, next) => {
  const { accID, fangrId } = req.body;
  try {
    if (!accID || accID.length === 0) {
      return next(new APIError(errors.INVALID_PARAMETERS, 400));
    }
    if (!fangrId || fangrId.length === 0) {
      return next(new APIError(errors.INVALID_PARAMETERS, 400));
    }
    const result = await checkIfOwner(accID, fangrId);
    return res.status(200).json(result.rows);
  } catch (error) {
    return next(error);
  }
};

const rejectJoin = async(req,res,next) => {
  const { accountId } = req.body
  const { id } = req.params
  try {
    if (!accountId || accountId.length === 0)
      return next(new APIError(errors.INVALID_PARAMETERS, 400))
    if (!id || id.length === 0)
      return next(new APIError(errors.INVALID_PARAMETERS, 400))
    const result = await rejectJoinRequest(accountId, id)
    if (result.rowCount === 0)
      return next(new Error("nope", 400))
    return res.status(200).json({message: "removed"});
  } catch (error) {
      return next(error)
  }
}

export { deleteFangroup, viewRequestList, acceptJoin, rejectJoin, leaveFromFangroup, checkIfUserIsOwner };
