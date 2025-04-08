import React, { useState } from 'react';

import { projectStore } from '../store/projectStore';
import { useNavigate } from 'react-router-dom';

const NewProject = () => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('Javascript');
  const [error, setError] = useState(null);
 const navigate=useNavigate()
  const {newProject}=projectStore()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     await newProject(name,language)
      // setName("")
      // setLanguage("")
      navigate("/coding")
    } catch (err) {
      console.log(err);
      
      setError('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-96 border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Create New Project</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
          >
            <option value="Javascript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Go">Go</option>
          </select>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
