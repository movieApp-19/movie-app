import { Router } from 'express'; 
import { deleteFangroup, leaveFromFangroup, viewRequestList, acceptJoin, rejectJoin, checkIfUserIsOwner  } from '../controllers/fanGroupController.js';
import { auth } from "../helpers/auth.js";

const router = Router();

router.delete("/:id", auth, deleteFangroup);
router.delete("/:userId/:id/leave", leaveFromFangroup);
router.get("/listRequests/:id", auth, viewRequestList)
router.post("/acceptJoin", auth, acceptJoin)
router.delete("/rejectJoin/:id", auth, rejectJoin) 
router.post("/checkifowner", auth, checkIfUserIsOwner)

export { router };
