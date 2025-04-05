import express from "express"
import dotenv from "dotenv"
import auth from "./src/routers/auth_Routers.js";
import project_route from "./src/routers/project_Routers.js"
import  db  from "./src/dataBase/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from 'path'


dotenv.config();
const __dirname = path.resolve();
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


if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });

}


app.listen(port,()=>{
    console.log(`app running on ${port}`);
    db()
})