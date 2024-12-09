import { Router } from "express";
import { getAllFangroups, addFangroup, selectFangroupbyID } from "../controllers/fanPageController.js";

const router = Router();

router.get("/", getAllFangroups);

router.post("/", addFangroup);

router.get("/:id", selectFangroupbyID);

export { router };
