import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { removeFromUserFavourite, addUserFavourite, userFavourites, postRegistration, postLogin, deleteUserAccount } from "../controllers/userController.js";
const { sign } = jwt;

const router = Router();

router.post("/register", postRegistration);
router.post("/login", postLogin);
router.delete("/delete-account", deleteUserAccount)
// favourites
router.get("/:username/user-favourites", userFavourites)
router.post("/add-to-user-favourites", addUserFavourite)
router.post("/remove-from-user-favourites", removeFromUserFavourite)

export { router };
