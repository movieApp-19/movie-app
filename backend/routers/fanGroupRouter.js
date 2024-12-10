import { Router } from 'express'; 
import { deleteFangroup } from '../controllers/fanGroupController.js';

const router = Router();

router.delete("/:id", deleteFangroup);

export { router };
