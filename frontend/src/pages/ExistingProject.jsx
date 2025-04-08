import React, { useState, useEffect } from 'react';
import { projectStore } from '../store/projectStore';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const ExistingProject = () => {
    const {projects,getProject,seletCurrentProject,deleteProject}=projectStore()

    useEffect(() => {
      getProject()
    }, [getProject])
   const deletes = async(id,name)=>{
    
    if (confirm(`wants to delete a project ${name}`)) {
      await deleteProject(id)
      getProject()
    }
   }
    

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-[80vh] text-white">
      <div className="flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8">Existing Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-1">
        {projects.map(project => (
    <div 
        key={project.id} 
        className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-200"
    >
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
            {project.projectName}
        </h2>
        <p className="text-gray-400 mb-1 italic">Language: {project.projectLanguage}</p>
        <p className="text-gray-400 mb-4">{project.description}</p>
        
        <div className="flex justify-between mt-4 space-x-4">
            <Link to="/coding">
                <button 
                    onClick={(e) => { seletCurrentProject(project) }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                    Open
                </button>
            </Link>
            
            <button 
                onClick={(e) => { deletes(project._id, project.projectName) }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
               <MdDelete/>
            </button>
        </div>
    </div>
  ))}

        </div>
      </div>
    </div>
  );
};

export default ExistingProject;
