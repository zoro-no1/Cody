import User from "../modles/user.js"
import {z} from "zod"

export const signin=async (req,res)=>{
    const {username,email,password}=req.body
    try {
        const resBody=z.object({
            username:z.string().min(3).max(20),
            email:z.string().min(5).max(100).email(),
            password:z.string().min(6).max(30)
        })
        const result=resBody.safeParse(req.body)

        if(!result.success){
            return res.status(404).json({
                message:"detail required",
                error:result.error,
                
            })
        }
        const exist =await User.findOne({email})

        
        if(exist){
            return res.status(404).json({
                message:"user alrady exist"
            })
        }
        const user=await User.create({
            username,
            email,
            password
        })
        if(!user){
            res.status(500).json({
                message:"somthing  wrong while creating the user"
            })
        }
        const token =await user.refreshToken()

        res.status(200).cookie("token",token)
        .json({
            message:"user created",
            token:token
        })
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const login = async (req,res)=>{
    const {email,password}=req.body
    try {
        if(!email||!password){
            return res.status(404).json({
                message:"all detail needed"
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"user no found"
            })
        }
        const correctPasseord= await user.isPasswordCorrect(password)
        if(!correctPasseord){
            return res.status(404).json({
                message:"password is incorrect"
            })
        }
       const token=await user.refreshToken()

       res.status(200).cookie("token",token,).json({
        message:"login",
        token:token
       })

    } catch (error) {
        console.log("login problem");
        
    }
}
export const logout= async (req,res)=>{
       return res.status(200)
       .clearCookie("token")
       .json({
        message:"logout"
       })
}
export const checkUser = async (req,res)=>{
    try {
        const user =req.user
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({message:"Check user error"})
    }
}