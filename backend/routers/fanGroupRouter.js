import { Router } from 'express'; 
import { deleteFangroup } from '../controllers/fanGroupController.js';
import { auth } from "../helpers/auth.js";

const router = Router();

router.delete("/:id", auth, deleteFangroup);

export { router };
