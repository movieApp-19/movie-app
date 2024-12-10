import { Router } from 'express'; 
import { deleteFangroup, viewRequestList, acceptJoin, rejectJoin } from '../controllers/fanGroupController.js';

const router = Router();

router.delete("/:id", deleteFangroup);
//
router.get("/listRequests/:id", viewRequestList)
router.put("/acceptJoin", acceptJoin)
router.delete("/rejectJoin/:fangroupid", rejectJoin) 

export { router };
