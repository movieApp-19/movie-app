import { Router } from "express";
import { getAllFangroups, addFangroup, selectFangroupbyID, deleteFangroup, joinGroup, viewRequestList, acceptJoin, rejectJoin } from "../controllers/fanPageController.js";

const router = Router();

router.get("/", getAllFangroups);

router.post("/", addFangroup);

router.get("/:id", selectFangroupbyID);

router.post("/requestJoin", joinGroup)
router.get("/listRequests/:fangroupName", viewRequestList)
router.put("/acceptJoin", acceptJoin)
router.delete("/rejectJoin/:fangroupid", rejectJoin) 

export { router };
