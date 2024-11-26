import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { userFavourites, postRegistration, postLogin, deleteUserAccount } from "../controllers/userController.js";
const { sign } = jwt;

const router = Router();

router.post("/register", postRegistration);
router.post("/login", postLogin);
router.delete("/delete-account", deleteUserAccount)
router.post("/user-favourites", userFavourites)

export { router };
