import { Router } from 'express'; 
import { deleteFangroup, viewRequestList, acceptJoin, rejectJoin } from '../controllers/fanGroupController.js';
import { auth } from "../helpers/auth.js";

const router = Router();

router.delete("/:id", auth, deleteFangroup);
router.get("/listRequests/:id", viewRequestList)
router.post("/acceptJoin", acceptJoin)
router.delete("/rejectJoin/:id", rejectJoin) 

export { router };
