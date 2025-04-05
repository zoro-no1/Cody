import { create } from "zustand";
import { axiosIn } from "../util/axios";
import axios from "axios";

export const projectStore=create((set,get)=>({
    projects:[],
    currentProject:null,
    outputCode:null,
    getProject:async()=>{
        try {
            const res =await axiosIn.post("/project/getProject")
            set({projects:res.data.projects})
        } catch (error) {
            console.log(error);
            
        }
    },
    newProject:async(projectName,projectLanguage)=>{
        try {
            const res=await axiosIn.post("/project/create",{projectName,projectLanguage})
           
            set({currentProject:res.data.message})
        } catch (error) {
            console.log(error);
            
        }
    },
    deleteProject:async(id)=>{
        try {
            await axiosIn.get(`/project/delete/${id}`)
        } catch (error) {
            console.log(error);
            
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
        console.log(code,lan);
        if(!code||!lan){
            return set({output:"nothing"})
        }
        
        try {
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
            console.log(res.data.run);
            
            set({outputCode:res.data.run.stdout || res.data.run.stderr})
        } catch (error) {
            console.log(error);
            
        }
    },
    saveProject:async(code,projectId)=>{
        if (!code||!projectId) {
            return console.log("detail ");
            
        }
        try {
            const res=await axiosIn.post("/project/codeSave",{code,projectId})
            
        } catch (error) {
            console.log(error);
            
        }
    }
}))