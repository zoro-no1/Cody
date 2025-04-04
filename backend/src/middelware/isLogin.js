import User from "../modles/user.js";
import jwt from "jsonwebtoken"

const isLogin =async (req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).clearCookie("token")
            .json({
                message:"user not login"
            })
        }
        const refreshToken= jwt.verify(token,process.env.TOKEN)
        const user =await User.findOne({_id:refreshToken._id}).select("_password")
        if(!user){
            return res.status(401)
            .json({
                message:"not login"
            })
        }
        req.user=refreshToken
        next()
    } catch (error) {
        console.log(error);
        
        res.status(401).clearCookie("token").json({message:"islogin error"})
    }
}
export default isLogin