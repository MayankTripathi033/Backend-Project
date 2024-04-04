import { Router } from "express";
import { registeradmin, loginadmin } from "../controllers/user.controller.js";
const router = Router();

router.route("/register").post(registeradmin)
router.route("/login").post(loginadmin)
// router.route("")

export default router