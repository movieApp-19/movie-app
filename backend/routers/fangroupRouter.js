import { Router } from "express";
import { joinGroup } from "../controllers/fangroupController.js";

const router = Router();

router.post("/paskaa/:fangroupName", joinGroup)

export { router };