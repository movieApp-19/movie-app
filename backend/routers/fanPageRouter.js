import { Router } from "express";
import { getAllFangroups, addFangroup, deleteFangroup, selectFangroupbyID } from "../controllers/fanPageController.js";

const router = Router();

router.get("/", getAllFangroups);

router.post("/", addFangroup);

router.delete("/:id", deleteFangroup);

router.get("/:id", selectFangroupbyID);

export { router };
