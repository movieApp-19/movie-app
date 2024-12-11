import { selectAllFangroups, insertFangroup, selectFangroupbyIDBackend } from "../models/fanPageModel.js";
import { APIError } from "../helpers/APIError.js"
import errors from "../helpers/errorStrings.js"

const getAllFangroups = async (req, res, next) => {
  try {
    const result = await selectAllFangroups();
    res.status(200).json(result.rows); 
  } catch (error) {
    next(error); 
  }
};

const addFangroup = async (req, res, next) => {
  const { fangroupName: name } = req.body;
  // const ownerId = res.locals.id;

  try {
    // Group name must be at least one character
    // Group must have an owner
    if (!name || name.length === 0)
        return next(new APIError(errors.INVALID_PARAMETERS, 400));

    // todo: Add user to group owner

    const result = await insertFangroup(name);
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

export { getAllFangroups, addFangroup, selectFangroupbyID };
