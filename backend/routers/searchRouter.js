import { Router } from "express";
import { searchResults } from "../controllers/searchController.js";

const router = Router();

router.post("/", searchResults);

export { router };
