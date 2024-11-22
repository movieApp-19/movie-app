import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { postRegistration } from "../controllers/userController.js";
const { sign } = jwt;

const router = Router();

router.post("/register", postRegistration);

export { router };