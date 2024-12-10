import { selectAllFangroups, insertFangroup, selectFangroupbyIDBackend } from "../models/fanPageModel.js";

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

export { getAllFangroups, addFangroup, selectFangroupbyID };
