import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { postRegistration, postLogin } from "../controllers/userController.js";
const { sign } = jwt;

import { deleteUserAccount } from "../controllers/accountController.js";

const router = Router();

router.post("/register", postRegistration);
router.post("/login", postLogin);
router.delete("/delete-account", deleteUserAccount)

export { router };
