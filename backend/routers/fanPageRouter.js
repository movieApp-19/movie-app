import { Router } from "express";
import { getAllFangroups, addFangroup,deleteFangroup, deleteFromFangroup } from "../controllers/fanPageController.js";

const router = Router();

router.get("/", getAllFangroups);

router.post("/", addFangroup);

router.delete("/:id", deleteFangroup);

export { router };
