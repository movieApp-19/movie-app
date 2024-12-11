import { Router } from "express";
import { getAllFangroups, addFangroup, selectFangroupbyID, joinGroup } from "../controllers/fanPageController.js";
import { auth } from "../helpers/auth.js";

const router = Router();

router.get("/", getAllFangroups);
router.post("/", auth, addFangroup);
router.get("/:id", auth, selectFangroupbyID);
router.post("/requestJoin", joinGroup)

export { router };
