import { Router } from "express";
import { postReview } from "../controllers/reviewController.js";

const router = Router();

router.post("/create", postReview);

export { router }
