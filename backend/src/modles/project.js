import mongoose, { Schema } from "mongoose";


const porjectSchema=new Schema({
    projectName:{
        type:String,
        required:true
    },
    projectLanguage:{
        type:String,
        required:true
    },
    code:{
        type:String
    },
    user:{
        type:String
    }
},{timestamps:true})


const Project=mongoose.model("Project",porjectSchema)
export default Project