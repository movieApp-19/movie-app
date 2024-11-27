import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { postRegistration, postLogin, deleteUserAccount } from "../controllers/userController.js";
const { sign } = jwt;

const router = Router();

router.post("/register", postRegistration);
router.post("/login", postLogin);
router.delete("/delete-account", deleteUserAccount)

export { router };
