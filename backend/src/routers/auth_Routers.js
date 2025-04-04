import { Router } from "express";
import { checkUser, login, logout, signin } from "../controllers/auth-controller.js";
import isLogin from "../middelware/isLogin.js"
const router=Router()

router.post("/signin",signin)
router.post("/login",login)
router.post("/logout",isLogin,logout)
router.get("/check",isLogin,checkUser)

export default router