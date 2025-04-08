import { create } from "zustand";
import { axiosIn } from "../util/axios";
import axios from "axios";
import toast from "react-hot-toast"

export const projectStore=create((set,get)=>({
    projects:[],
    currentProject:null,
    outputCode:null,
    isLoading:false,
    getProject:async()=>{
        try {
            const res =await axiosIn.post("/project/getProject")
            set({projects:res.data.projects})
        } catch (error) {
            console.log(error);
            toast.error("somthing went wrong")
        }
    },
    newProject:async(projectName,projectLanguage)=>{
        try {
            const res=await axiosIn.post("/project/create",{projectName,projectLanguage})
            set({currentProject:res.data.message})
            toast.success("Project Created")
        } catch (error) {
            console.log(error);
            toast.error("Somthing went Wrong While Creating A Project")
            
        }
    },
    deleteProject:async(id)=>{
        try {
            await axiosIn.get(`/project/delete/${id}`)
            toast.success("Project Delete")
        } catch (error) {
            console.log(error);
            toast.error("Somthing went Wrong While Deleting A Project")
            
        }
    },
    seletCurrentProject:async(prj)=>{
        try {
          set({currentProject:prj})
        } catch (error) {
            console.log(error);
        }
    },
    getCodeRun:async(code,lan)=>{
        
        if(!code||!lan){
            return set({output:"nothing"})
        }
        
        try {
            set({isLoading:true})
            const api=axios.create({
                baseURL:'https://emkc.org/api/v2/piston'
            })
            const res= await api.post("/execute",{
                "language": lan,
               "version": "*",
                "files": [
                  {
                    "content": code
                  } ],
            })
            set({outputCode:res.data.run.stdout || res.data.run.stderr})
        } catch (error) {
            console.log(error);
            
        }finally{
            set({isLoading:false})
        }
    },
    saveProject:async(code,projectId)=>{
        if (!code||!projectId) {
            return console.log("detail ");
            
        }
        try {
            const res=await axiosIn.post("/project/codeSave",{code,projectId})
            toast.success("Save")
        } catch (error) {
            console.log(error);
            toast.error("Not Save")
        }
    }
}))