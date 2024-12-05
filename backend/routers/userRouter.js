import { Router } from "express";
import { postRegistration, postLogin, deleteUserAccount, postLogout } from "../controllers/userController.js";
import { auth } from "../helpers/auth.js";

const router = Router();

router.post("/register", postRegistration);
router.post("/login", postLogin);
router.delete("/delete-account", auth, deleteUserAccount)
router.post("/logout", auth, postLogout);

export { router };
