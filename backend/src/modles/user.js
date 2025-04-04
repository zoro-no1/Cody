import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true 
    }
},{timestamps:true})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.refreshToken=function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
    },process.env.TOKEN,{expiresIn:"7d"})
}


const User = mongoose.model("user",userSchema)
export default User