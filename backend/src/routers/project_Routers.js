import { Router } from "express";
import isLogin from "../middelware/isLogin.js";
import { codeSave, createProject, deleteProject, getProject } from "../controllers/project-controller.js";

const router=Router()

router.post("/create",isLogin,createProject)
router.post("/codeSave",isLogin,codeSave)
router.post("/getProject",isLogin,getProject)
router.get("/delete/:id",isLogin,deleteProject)

export default router