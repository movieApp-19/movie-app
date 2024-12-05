import { Router } from "express";
import { getAllFangroups, addFangroup, deleteFangroup, joinGroup, viewRequestList, acceptJoin, rejectJoin } from "../controllers/fanPageController.js";

const router = Router();

router.get("/", getAllFangroups);

router.post("/", addFangroup);

router.delete("/:id", deleteFangroup);

// antti
router.post("/requestJoin", joinGroup)
router.get("/listRequests/:fangroupName", viewRequestList)
router.put("/acceptJoin", acceptJoin)
router.delete("/rejectJoin", rejectJoin) //fangroups/recejectJoin

export { router };
