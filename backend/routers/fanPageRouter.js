import { Router } from "express";
import { getAllFangroups, addFangroup, selectFangroupbyID, joinGroup } from "../controllers/fanPageController.js";

const router = Router();

router.get("/", getAllFangroups);

router.post("/", addFangroup);

router.get("/:id", selectFangroupbyID);

router.post("/requestJoin", joinGroup)

export { router };
