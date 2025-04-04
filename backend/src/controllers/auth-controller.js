import User from "../modles/user.js"

export const signin=async (req,res)=>{
    const {username,email,password}=req.body
    try {

        if(!username||!email||!password){
            return res.status(404).json({
                message:"detail required"
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
            message:"user created"
        })
        
    } catch (error) {
        console.log(error);
        
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
        message:"login"
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