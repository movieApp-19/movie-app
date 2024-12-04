import { Router } from "express";
import { joinGroup, viewRequestList, acceptJoin } from "../controllers/fangroupController.js";

const router = Router();

router.post("/paskaa/:fangroupName", joinGroup)
router.get("/list/:fangroupName", viewRequestList)
router.put("/acceptJoin", acceptJoin)

export { router };