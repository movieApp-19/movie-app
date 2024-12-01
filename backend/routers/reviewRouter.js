import { Router } from "express";
import { postReview, browseReviewController } from "../controllers/reviewController.js";

const router = Router();

router.post("/create", postReview);
router.get("/browse", browseReviewController)

export { router }
