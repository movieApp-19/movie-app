import { Router } from "express";
import { getAllFangroups, addFangroup, selectFangroupbyID, joinGroup, userJoinedFangroups, userNotJoinedFangroups, userownedFangroups } from "../controllers/fanPageController.js";
import { auth } from "../helpers/auth.js";

const router = Router();

router.get("/", getAllFangroups);
router.post("/", auth, addFangroup);
router.get("/:id", auth, selectFangroupbyID);
router.post("/requestJoin", auth, joinGroup)
router.post('/getJoined', userJoinedFangroups)
router.post('/getNotJoined', userNotJoinedFangroups)
router.post('/getowned', userownedFangroups)

export { router };
