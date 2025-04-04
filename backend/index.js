import express from "express"
import dotenv from "dotenv"
import auth from "./src/routers/auth_Routers.js";
import project_route from "./src/routers/project_Routers.js"
import  db  from "./src/dataBase/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();
const port=process.env.PORT
const app= express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
  }))


app.use("/api/auth",auth)
app.use("/api/project",project_route)


app.listen(port,()=>{
    console.log(`app running on ${port}`);
    db()
})