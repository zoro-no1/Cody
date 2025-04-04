import mongoose from "mongoose";
const db= async()=>{
     const uri=process.env.DBURI
try {
     await mongoose.connect(uri)
     console.log("db Connected");
     
} catch (error) {
    console.log("db error");
    
}}

export default db