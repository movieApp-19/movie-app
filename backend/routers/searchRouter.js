import { Router } from "express";
import { searchResults } from "../controllers/searchController.js";

const router = Router();

router.get("/", searchResults);

export { router };
