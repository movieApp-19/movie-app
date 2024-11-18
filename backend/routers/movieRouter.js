import { Router } from "express";
import { movieResult } from "../controllers/movieController.js";

const router = Router();

router.post("/", movieResult);

export { router };
