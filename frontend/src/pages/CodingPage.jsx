import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { projectStore } from '../store/projectStore';
import { MdJavascript } from 'react-icons/md';

const CodeEditor = () => {
  const { currentProject, getCodeRun, outputCode,saveProject,isLoading } = projectStore();
  // const [code, setCode] = useState(currentProject?.code || '');
  const lan = currentProject?.projectLanguage?.toLowerCase() || 'javascript';
const codeRef=useRef(currentProject?.code||"")

 const extension={
  java:"java",
  cpp:"cpp",
  javascript:"js",
  python:"py",
  go:"go"
 }
  
  const handleRun = async () => {
    try {
      await getCodeRun(codeRef.current, lan);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    console.log(codeRef.current);
    saveProject(codeRef.current,currentProject._id)
   
  };

  const handleImprot=(e)=>{
    const file=e.target.files[0]
    if (!file) {
      return
    }

    const reader=new FileReader();
    reader.readAsText(file)
    reader.onload=(value)=>{
      setCode(value.target.result)
    }

  }

  const handleDownload=()=>{
    const codeValue=codeRef.current
    // console.log(codeRef.current);
     const createblod=new Blob([codeValue],{type:"text/plain"})
    //  console.log(createblod);

     const url= URL.createObjectURL(createblod)

     const link=document.createElement("a")
     link.href=url
     link.download=`${currentProject.projectName}.${extension[lan]}`
     link.click()
     
    
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [codeRef.current]);



  return (
    <div className="min-h-[80vh] bg-gray-900 text-white p-4 overflow-y-auto flex flex-col">
    <div className="mb-6">
  <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-1 drop-shadow-md">
    {currentProject?.projectName}
  </h1>
  <h2 className="text-sm md:text-base text-gray-400 italic">
     {lan}
  </h2>
</div>

      <Editor
        height="60vh"
        theme="vs-dark"
        language={lan}
        value={codeRef.current}
        onChange={(value) => codeRef.current=value}
        className="rounded-lg border border-gray-700 w-full"
      />
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <button 
          onClick={handleRun} 
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Run Code
        </button>
        <button 
          onClick={handleSave} 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Code
        </button>
        <label 
         
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          <input type="file" accept='text/*' className='hidden'  onChange={handleImprot} /> import code
        </label>
        <button 
          onClick={handleDownload} 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download
        </button>
      </div>
      <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700 max-w-full overflow-x-auto w-full">
        <h2 className="text-xl mb-2">Output:</h2>
        <pre className="whitespace-pre-wrap break-words text-gray-300">{outputCode}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
