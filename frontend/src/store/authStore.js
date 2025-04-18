import {create} from "zustand"
import { axiosIn } from "../util/axios.js"
import toast from "react-hot-toast"

export const authStore=create((set,get)=>({
    authUser:null,
    isCheckAuth:true,

    checkAuth : async()=>{
        try {
            const res=await axiosIn.get("/auth/check")
            set({authUser:res.data})
        } catch (error) {
            console.log(error);
            
            set({authUser:null})
        }finally{
            set({isCheck:false})
        }
    },
    logout:async()=>{
        try {
            const res= await axiosIn.post("/auth/logout")
            localStorage.removeItem("token")
            set({authUser:null})
            get().checkAuth()
            toast.success("Logout")
        } catch (error) {
            console.log(error);
        }
    }
    
    
}))