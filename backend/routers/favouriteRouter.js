import { Router } from "express";
import { userFavourites, addUserFavourite, removeFromUserFavourite } from "../controllers/favouriteController.js";

const router = Router();

router.get("/:username", userFavourites)
router.post("/add-to-user-favourites", addUserFavourite)
router.post("/remove-from-user-favourites", removeFromUserFavourite)

export { router };