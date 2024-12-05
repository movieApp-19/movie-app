import { Router } from "express";
import { joinGroup, viewRequestList, acceptJoin, rejectJoin } from "../controllers/fangroupController.js";

const router = Router();

router.post("/requestJoin", joinGroup)
router.get("/list/:fangroupName", viewRequestList)
router.put("/acceptJoin", acceptJoin)
router.delete("/recejectJoin", rejectJoin)

export { router };