import Project from "../modles/project.js";


export const createProject=async (req,res)=>{
    const {projectName,projectLanguage}=req.body
    
    try {
        if(!projectLanguage||!projectName){
            return res.status(401).json({
                message:"fill all the detail"
            })
        }
        const createPro=await Project.create({
            projectLanguage,
            projectName,
            user:req.user._id 
        })
        return res.status(200).json({
            mssage:createPro
        })

    } catch (error) {
        return res.status(500).json({
            message:"somthing went wrong while creating the project"
        })
    }
}

export const codeSave=async(req,res)=>{
    const {code,projectId}=req.body
    try {
        const project=await Project.findOneAndUpdate({$and :[{_id:projectId},{user:req.user._id}]},{code})
        console.log(project);
        
        if(!project){
            return res.status(401).json({
                message:"project not avilable"
            })
        }
        return res.status(200).json({
            message:"code save successfully"
        })
       
    } catch (error) {
        console.log("code save error");
        return res.status(500).json({
            message:"code save error"
        })
        
    }
}
export const deleteProject=async(req,res)=>{
    const {id:projectId}=req.params
    try {
        const deletedProject=await Project.findByIdAndDelete(projectId,{new:true})
        if (!deletedProject) {
            return res.status(401).json({
                message:"project not found"
            })
        }
        return res.status(200).json({
            meaasge:"project delete",
            deletedProject
        })
    } catch (error) {
        return res.status(500).json({
            message:"delete project error"
        })
    }
}
export const getProject=async(req,res)=>{
    const user=req.user
    try {
        const projects=await Project.find({user:user._id})
        if(!projects){
            return res.status(404).json({
                meaasge:"you don't have projects"
            })
        }
        return res.status(200).json({
            projects
        })
    } catch (error) {
        return res.status(500).json({
            message:"get project error"
        })
    }
}