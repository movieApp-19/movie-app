import { Router } from 'express'; 
import { deleteFangroup, leaveFromFangroup } from '../controllers/fanGroupController.js';

const router = Router();

router.delete("/:id", deleteFangroup);
router.delete("/:userId/:id/leave", leaveFromFangroup);

export { router };
