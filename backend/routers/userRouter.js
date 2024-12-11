import { Router } from "express";
import { postRegistration, postLogin, deleteUserAccount, postLogout, postRefresh } from "../controllers/userController.js";
import { auth } from "../helpers/auth.js";

const router = Router();

router.post("/register", postRegistration);
router.post("/login", postLogin);
router.delete("/delete-account", auth, deleteUserAccount)
router.post("/logout", auth, postLogout);
router.post("/refresh", auth, postRefresh);

export { router };
